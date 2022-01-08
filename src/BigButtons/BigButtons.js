import React from 'react'
import BigButton from './BigButton'
import './styles.scss'

const BigButtons = () => {
	return (
		<div className="buttons-container">
			<BigButton label="Generate" />
			<BigButton label="Play" />
			<BigButton label="Record" />
		</div>
	)
}

export default BigButtons
