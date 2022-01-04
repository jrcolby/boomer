

function playKick(kickChain) {
	let membraneKick = kickChain.synth
	let clickSampler = kickChain.sampler
	console.log("boom")
	clickSampler.triggerAttackRelease(kickChain.sample, 0.001);
	membraneKick.triggerAttackRelease(kickChain.synthFreq, "8n");
}

export default playKick
