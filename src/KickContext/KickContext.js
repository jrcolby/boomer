import React, { useContext, useState } from 'react'
import { updateKickChain } from '../AudioContext'

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

// Utility classes for random generation
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


// Generates a whole new set of random kick params
function makeKickParams() {
	let params = {
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

// These are contexts that can be used globally to set and get kick params object
const KickContext = React.createContext()
const KickUpdateContext = React.createContext()


export function useKickParams() {
	return useContext(KickContext);
}

export function useKickUpdate() {
	return useContext(KickUpdateContext);
};

export function KickProvider({ children }) {

	const [kickParams, setKickParams] = useState(makeKickParams)

	function updateKick() {
		const newParams = makeKickParams()
		console.log("updateKick: newParams", newParams.frequency)
		//debugger
		setKickParams(newParams)
		console.log("updateKick: after using setKickParams hook kickParams freq is ", kickParams.frequency);
		updateKickChain(kickParams)
	}

	return (
		<KickContext.Provider value={kickParams}>
			<KickUpdateContext.Provider value={updateKick}>
				{children}
			</KickUpdateContext.Provider>
		</KickContext.Provider>
	)
}

