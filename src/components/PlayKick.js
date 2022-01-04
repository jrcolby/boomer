import React from 'react'
import playKick from "../functions/playKick"
import Button from './Button'

const PlayKick = ({ kickChain }) => {
	const playCurrentKick = () => {
		playKick(kickChain)
	}
	return (
		<Button handler={playCurrentKick} label="Play Kick" />
	)
}

export default PlayKick
