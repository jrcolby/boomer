import React, { useState } from 'react'
import makeKickParams from "./functions/makeKickParams"
import makeKickChain from "./functions/makeKickChain"
import Test from "./Test"
//import MakeKick from "./components/MakeKick"
// import PlayKick from "./components/PlayKick"
// import Record from "./components/Record"
import BigButtons from './BigButtons'
import './App.scss'

// header and logo
// three buttons
// footer info
//

let initKickParams = makeKickParams()
let initKickChain = makeKickChain(initKickParams)
function App() {
	const [kickParams, setKickParams] = useState(initKickParams)
	const [kickChain, setKickChain] = useState(initKickChain)

	return (
		<div className="container">
			<div className="header">BOOMER </div>
			<BigButtons />
			<div className="footer">
				<p> Jim Colby 2021 </p>
				<p><a href="https://github.com/jrcolby/boomer"> github </a></p>
			</div>
		</div>
	);
}
export default App;

			// <MakeKick kickParams={kickParams} onKickChange={setKickParams} setKickChain={setKickChain} />
			// <PlayKick kickChain={kickChain} />
			// <Record kickChain={kickChain} />
				// <MakeKick kickParams={kickParams} onKickChange={setKickParams} setKickChain={setKickChain} />
				// <PlayKick kickChain={kickChain} />
				// <Record kickChain={kickChain} />
			// <div className="header"> header </div>
			// <div className="controls" >
			// </div>
			// <div className="footer"> Footer </div>
//
// Download kick accepts kickchan, plays kick and starts/stop recorder
// would be easier with importable chain

// could save kck data in array of objects, put a size limit on it, dies on refresh
// sampler = sampler.chain(channel, myLPFilter, myReverb) //audio chain
// return {
//     sampler,
//     channel,
// recorder,
// kickSynth
// };
//https://coolors.co/2a2829-a27ce8-76f7bf-ffffff-297373
