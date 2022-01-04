import React from 'react'
import * as Tone from "tone";
import woodblock from '../wavs/woodblock.mp3'
import clave from '../wavs/clave.mp3'
import click from '../wavs/click.mp3'
import hihat from '../wavs/hihat.mp3'

// init sampler with different kick clicks, release time and click volume
let clickSampler = new Tone.Sampler({
	urls: {
		C4: woodblock,
		C5: clave,
		D5: click,
		E5: hihat,
	},
	onload: () => { console.log("loaded"); }
});

clickSampler.set({
	release: 0.01,
});
console.log("made a sampler")

// generate randomized filter for kick
function generateFilter(kickParams) {
	return new Tone.Filter({
		type: kickParams.filterType,
		frequency: kickParams.filterFreq,
		rolloff: kickParams.filterRolloff,
	});
}

// generate boomy part of kick with randomized membrane synth
function generateSynth(kickParams) {
	return new Tone.MembraneSynth({
		octaves: kickParams.octaves,
		envelope: {
			attack: kickParams.attack,
			decay: kickParams.decay,
			sustain: kickParams.sustain,
		},
		pitchDecay: kickParams.pitchDecay,
		oscillator: {
			type: kickParams.waveform,
		},
	});
}

// Create effects and channel and connect to output
let membraneKick = new Tone.MembraneSynth()
let clickVol = new Tone.Volume();
let limiter = new Tone.Limiter(0);
let master = new Tone.Channel(0, 0);
let distort = new Tone.Distortion()
let loPass = new Tone.AutoFilter({
	frequency: 0,
	filter: {
		type: "lowpass",
	}
})
let hiPass = new Tone.Filter({
	type: "highpass",
	frequency: 20,
	rolloff: -24,
});

// make a MediaRecorder to connect chain to as well
const actx = Tone.context;

membraneKick.chain(distort, master);
clickSampler.chain(clickVol, master);
master.chain(hiPass, loPass, limiter, Tone.Destination);

function makeKickChain(kickParams) {

	// set kick synth and fx to new parameters
	membraneKick.octaves = kickParams.octaves
	membraneKick.envelope.attack = kickParams.attack
	membraneKick.envelope.decay = kickParams.decay
	membraneKick.envelope.sustain = kickParams.sustain
	membraneKick.pitchDecay = kickParams.pitchDecay
	membraneKick.oscillator.type = kickParams.waveform

	loPass.baseFrequency = kickParams.filterFreq
	distort.disortion = kickParams.distortLevel
	clickVol.volume.value = kickParams.clickVol

	// chain up channels
	// return object that contains click sampler and membrane kick
	const chain = {
		synth: membraneKick,
		synthFreq: kickParams.frequency,
		sampler: clickSampler,
		sample: kickParams.clickSample,
		channel: master,
	};
	return chain
}

export default makeKickChain
