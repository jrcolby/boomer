import React from 'react'
import './styles.scss'
import { useKickParams, useKickUpdate } from '../KickContext'
import { downloadKick, playKick } from '../AudioContext'

const BigButton = ({ label, use, isRecording, setIsRecording }) => {
	// import the current kick params from kickparams context
	const kickParams = useKickParams()
	// import the updateKick function from updateKick context
	const updateKick = useKickUpdate()

	const clickHandler = () => {
		if (use === "make" & isRecording === false) {
			//debugger
			console.log("in handler, before update frequency is", kickParams.frequency, " and decay is ", kickParams.decay)
			updateKick()
			console.log("in handler, after update frequency is", kickParams.frequency, " and decay is ", kickParams.decay)
			playKick(kickParams.clickSample, kickParams.frequency)

		} else if (use === "download") {
			downloadKick(isRecording, setIsRecording, kickParams.clickSample, kickParams.frequency)
		}
		else if (use === "play" && isRecording === false) {
			console.log("in play component with frequency", kickParams.frequency)
			playKick(kickParams.clickSample, kickParams.frequency)
		}
	}

	return (
		<button className="big-button" onClick={clickHandler}> {label} </button>
	)
}

export default BigButton
