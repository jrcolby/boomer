import * as Tone from 'tone'
import woodblock from '../wavs/woodblock.mp3'
import clave from '../wavs/clave.mp3'
import click from '../wavs/click.mp3'
import hihat from '../wavs/hihat.mp3'

// AudioContext contains actual Tone instruments and effects, as well as 
// functions to play them as well as setters for their parameters

const kickSynth = new Tone.MembraneSynth()
//kickSynth.debug = true;

const clickSampler = new Tone.Sampler({
	urls: {
		C4: woodblock,
		C5: clave,
		D5: click,
		E5: hihat,
	},
});

clickSampler.set({
	release: 0.01,
});

//effects chain:
const clickVol = new Tone.Volume();
const limiter = new Tone.Limiter();
const master = new Tone.Channel(0, 0);
const distort = new Tone.Distortion()
const loPass = new Tone.AutoFilter({
	frequency: 0,
	filter: {
		type: "lowpass",
	}
})
const hiPass = new Tone.Filter({
	type: "highpass",
	frequency: 20,
	rolloff: -24,
});

// make a MediaRecorder to connect chain to as well
const actx = Tone.context;
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream, {
	'type': 'audio/wav',
});

// chain up 
kickSynth.chain(distort, master);
clickSampler.chain(clickVol, master);
master.chain(hiPass, loPass, limiter, Tone.Destination);
master.connect(dest);
console.log(kickSynth)

// function to play the actual kick!!
export const playKick = (sample, frequency) => {
	console.log("playKick: with param freq ", frequency)
	clickSampler.triggerAttackRelease(sample, 0.21);
	kickSynth.triggerAttackRelease(frequency, "8n");
	console.log(kickSynth.oscillator.type)
};


export const updateKickChain = (kickParams) => {
	console.log("updateKickChain with freq ", kickParams.frequency)
	// set kick synth and fx to new parameters
	kickSynth.octaves = kickParams.octaves
	kickSynth.envelope.attack = kickParams.attack
	kickSynth.envelope.decay = kickParams.decay
	kickSynth.envelope.sustain = kickParams.sustain
	kickSynth.pitchDecay = kickParams.pitchDecay
	kickSynth.oscillator.type = kickParams.waveform
	loPass.baseFrequency = kickParams.filterFreq
	distort.disortion = kickParams.distortLevel
	clickVol.volume.value = kickParams.clickVol
};

export const downloadKick = (isRecording, setIsRecording, sample, frequency) => {
	console.log(isRecording)
	if (isRecording === true) return;
	setIsRecording(true)
	console.log(isRecording)

	const chunks = [];
	// start the recorder
	recorder.start();
	// play the kick
	playKick(sample, frequency);

	// wait for kick to play and stop the recording
	setTimeout(() => {
		recorder.stop();
		setIsRecording(false)
	}, 1000);

	recorder.ondataavailable = evt => chunks.push(evt.data);
	recorder.onstop = evt => {
		console.log("recorder stopped");
		let blob = new Blob(chunks, { 'type': 'audio/wav' });
		const audioURL = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.style.color = 'green';
		link.style.cssText = "font-size: 20px; color: green;"
		link.href = audioURL;
		link.download = 'KICK';
		link.click()
	}
};

