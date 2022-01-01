import "./App.css";
import * as Tone from "tone";

// Constants for possible values od randomized kick values, along with
// probability distribution
const oscillators = [
	{
		value: "triangle",
		chance: 0.45,
	},
	{
		value: "sine",
		chance: 0.45,
	},
	{
		value: "square",
		chance: 0.1,
	},
];

const clickTypes = [
	{
		value: "C4",
		chance: 0.25,
	},
	{
		value: "C5",
		chance: 0.25,
	},
	{
		value: "D5",
		chance: 0.25,
	},
	{
		value: "E5",
		chance: 0.25,
	},
];
const distortionLevel = [
	{
		value: 0,
		chance: 0.5,
	},
	{
		value: 0.1,
		chance: 0.2,
	},
	{
		value: 0.5,
		chance: 0.15,
	},
	{
		value: 1.3,
		chance: 0.15,
	},
];


/**
 * Make JSON object that contains all properties for synth,
 * sampler, and effects
 */
let kickParams = makeKickParams();

// make boomy part of kick with a membrane synth generated from kickParams
let membraneKick = generateSynth(kickParams);

// init sampler with different kick clicks, release time and click volume
let clickSampler = new Tone.Sampler({
	urls: {
		C4: "woodblock.mp3",
		C5: "clave.mp3",
		D5: "click.mp3",
		E5: "hihat.mp3"
	},
	onload: () => { console.log("loaded"); }
});

clickSampler.set({
	release: 0.01,
});

let clickVol = new Tone.Volume(0 - getRandomBounded(20, 60));

//  Init devices for effects chain
let loPass = generateFilter(kickParams);

let hiPass = new Tone.Filter({
	type: "highpass",
	frequency: 20,
	rolloff: -24,
});

let distort = new Tone.Distortion(kickParams.distortLevel);

// Routing for master channel to main out (Tone.Destination)
let limiter = new Tone.Limiter(0);
let master = new Tone.Channel(0, 0);
membraneKick.chain(distort, master);
clickSampler.chain(clickVol, master);
master.chain(hiPass, loPass, limiter, Tone.Destination);

function App() {
	function makeKick() {
		Tone.start();
		Tone.Transport.stop();
		kickParams = makeKickParams();
		console.log(kickParams);
		membraneKick = generateSynth(kickParams);
		loPass = generateFilter(kickParams);
		distort = new Tone.Distortion(kickParams.distortLevel);
		membraneKick.chain(distort, master);
		clickVol = new Tone.Volume(kickParams.clickVol);
		console.log(clickVol);
		clickSampler.chain(clickVol, master);
		playKick();
	}


	function playKick() {

		clickSampler.triggerAttackRelease(kickParams.clickSample, 0.001);
		membraneKick.triggerAttackRelease(kickParams.frequency, "4n");

	}

	return (
		<div className="App">
			<button id="playKick" onClick={playKick}>
				Play Kick
			</button>
			<button id="makeKick" onClick={makeKick}>
				Make Kick
			</button>
			<audio controls></audio>
		</div>
	);
}

export default App;

const audio = document.querySelector("audio");
console.log(audio);

function makeKickParams() {
	const params = {
		frequency: getRandomBounded(60, 100),
		octaves: getRandomBounded(1, 3),
		attack: 0,
		decay: getRandomBounded(0.15, 0.35),
		sustain: 0,
		pitchDecay: getRandomBounded(0, 0.3),
		waveform: getWeightedValue(oscillators),
		filterFreq: getRandomBounded(100, 5000),
		filterRolloff: -12,
		filterType: "lowpass",
		clickSample: getWeightedValue(clickTypes),
		clickVol: 0 - getRandomBounded(40, 60),
		distortLevel: getWeightedValue(distortionLevel),
	};
	return params;
}

function generateFilter(kickParams) {
	return new Tone.Filter({
		type: kickParams.filterType,
		frequency: kickParams.filterFreq,
		rolloff: kickParams.filterRolloff,
	});
}

function getWeightedValue(objects) {
	let randomNum = Math.random();

	for (var i = 0; i < objects.length; i++) {
		let obj = objects[i];
		if (randomNum < obj.chance) {
			return obj.value;
		}
		randomNum -= obj.chance;
	}
}

function getRandomBounded(min, max) {
	return Math.random() * (max - min) + min;
}

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
