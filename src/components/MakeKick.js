import React from 'react'
import Button from './Button'
import makeKickParams from "../functions/makeKickParams"
import makeKickChain from "../functions/makeKickChain"
import playKick from "../functions/playKick"
const MakeKick = ({ kickParams, onKickChange, setKickChain }) => {

	const handleNewKick = () => {
		//let newParams = makeKickParams()
		onKickChange(makeKickParams())
		let newChain = makeKickChain(kickParams)
		setKickChain(newChain)
		playKick(newChain)
	}
	return (
		<Button handler={handleNewKick} label="Make Kick " />
	)
}

export default MakeKick
