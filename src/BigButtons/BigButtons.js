import React, { useState } from 'react'
import BigButton from './BigButton'
import './styles.scss'

// useState for kick playing, passed back up to this component
// as well as function for changing state of playing

const BigButtons = () => {
	const [isRecording, setIsRecording] = useState(false)

	return (
		<div className="buttons-container">
			<BigButton label="Generate" use="make" isRecording={isRecording} setIsRecording={setIsRecording} />
			<BigButton label="Play" use="play" isRecording={isRecording} setIsRecording={setIsRecording} />
			<BigButton label="Download" use="download" isRecording={isRecording} setIsRecording={setIsRecording} />
		</div>
	)
}

export default BigButtons
