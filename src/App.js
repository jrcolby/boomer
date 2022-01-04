import * as Tone from "tone";
import React, { useState } from 'react'
import Button from "./components/Button"
import makeKickParams from "./functions/makeKickParams"
import makeKickChain from "./functions/makeKickChain"
import MakeKick from "./components/MakeKick"
import PlayKick from "./components/PlayKick"
import Record from "./components/Record"


// recorder should play kick and link it to recorder
// init audio chain may need to be it's own seperate function
// and the audio chain may need to live in a separate fileMakeKick
let initKickParams = makeKickParams()
let initKickChain = makeKickChain(initKickParams)
function App() {
	const [kickParams, setKickParams] = useState(initKickParams)
	const [kickChain, setKickChain] = useState(initKickChain)
	return (
		<div className="App">
			<MakeKick kickParams={kickParams} onKickChange={setKickParams} setKickChain={setKickChain} />
			<PlayKick kickChain={kickChain} />
			<Record kickChain={kickChain} />
		</div>
	);
}
//TODO: break out channel init into a function, as well as membrane kick object
//
// Download kick accepts kickchan, plays kick and starts/stop recorder
// would be easier with importable chain

// sampler = sampler.chain(channel, myLPFilter, myReverb) //audio chain
// return {
//     sampler,
//     channel
// };
export default App;


