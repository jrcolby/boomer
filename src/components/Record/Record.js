import React from 'react'
import Button from './Button'
import * as Tone from 'tone'
import playKick from "../functions/playKick"

const dest = Tone.context.createMediaStreamDestination();
const recorder = new Tone.Recorder(dest.stream);
let isRecording = false;

const Record = ({ kickChain }) => {
	let channel = kickChain.channel;
	let recorder = kickChain.recorder;
	console.log(kickChain.recorder);
	const chunks = [];

	const handleRecordKick = () => {
		if (isRecording === true) return;
		isRecording = true;
		// start the recorder
		recorder.start();
		// play the kick
		playKick(kickChain)

		// wait for kick to play and stop the recording
		setTimeout(() => {
			recorder.stop();
			isRecording = false;
		}, 1000);

		recorder.ondataavailable = evt => chunks.push(evt.data);
		recorder.onstop = evt => {
			console.log("recorder stopped");
			let blob = new Blob(chunks, { 'type': 'audio/wav' });
			const audioURL = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.style.color = 'green';
			link.style.cssText = "font-size: 20px; color: green;"
			link.href = audioURL;
			link.download = 'KICK';
			link.click()
		}
	}

	return (
		<Button handler={handleRecordKick} label="Download Kick" />
	)
}

export default Record
