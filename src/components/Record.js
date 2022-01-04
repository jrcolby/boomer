import React from 'react'
import Button from './Button'
import * as Tone from 'tone'
import playKick from "../functions/playKick"

const dest = Tone.context.createMediaStreamDestination();
const recorder = new Tone.Recorder(dest.stream);
let isRecording = false;

const Record = ({ kickChain }) => {
	let channel = kickChain.channel;
	let d2 = new Tone.Reverb(
		{
			decay: 20,
			wet: 0.5,
		}
	)
	channel.connect(d2);
	channel.connect(dest);
	//Tone.Destination.connect(dest);
	const chunks = [];

	const handleRecordKick = () => {
		if (isRecording === true) return;
		isRecording = true;
		// start the recorder
		recorder.start();
		// play the kick
		playKick(kickChain)

		// wait for kick to play and stop the recording
		setTimeout(async () => {
			const recording = await recorder.stop();
			isRecording = false;
			console.log(recording)
			// download the recording by creating an anchor eleent and blob URL
		}, 1000);

		//recorder.ondataavailable => evt => chunks.push(evt.data);

	}

	return (
		<Button handler={handleRecordKick} label="Download Kick" />
	)
}

export default Record
//recDest: Tone.context.createMediaStreamDestination()
// recordStart() {
//     const recorder = new MediaRecorder(this.state.recDest.stream, {'type': 'audio/wav'});
//     this.setState({recorder: recorder});
//     this.setState({recording: true});
//     recorder.start();
//   }

//   recordStop() {
//     if(this.state.recorder != null) {
//       this.setState({recording: false})
//       this.state.recorder.stop();
//       this.setState({recorder: null});
//       const recChunks = [];
//       this.state.recorder.ondataavailable = evt => recChunks.push(evt.data);
//       this.state.recorder.onstop = evt => {
//         let blob = new Blob(recChunks, {'type': 'audio/wav'});
//         const audioURL = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.style.color = 'white';
//         link.style.cssText = "font-size: 20px; color: white;"
//         link.href = audioURL;
//         link.download = 'my_recording';
//         link.innerHTML = 'DOWNLOAD FILE';
//         document.body.appendChild(link);
//       };
//     }
