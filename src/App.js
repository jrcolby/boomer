import logo from './logo.svg';
import './App.css';
import * as Tone from "tone";
import { AmplitudeEnvelope } from 'tone';

// -- membraneSynth -> filter -> distortion
// click ------------>


const membraneKick = new Tone.MembraneSynth({
  "octaves" : 8,
  "envelope":{
    "attack": 0,
    "decay": 0.3,
    "sustain": 0,
    "release": 0.1
  },
  "pitchDecay": 0.1,
  "oscillator":{
    "type":  "sine"
  }
});

const hiPass = new Tone.Filter({
  "type": "highpass",
  "frequency": 20,
  "rolloff" : -24
});

const loPass = new Tone.Filter({
  "type" : "lowpass",
  "frequency": 2000,
  "rolloff": -12
});

const distort = new Tone.Distortion(2);

const clickSampler = new Tone.Sampler();


membraneKick.chain(hiPass, distort, loPass, Tone.Destination);

//select click sample to blend kick in with

//distortion amount
// compression amount
function playSynth(){
  //kickSynth.triggerAttackRelease(); // freq, note duration, time schedule to wait
//kickOscillator.start();
membraneKick.triggerAttackRelease(60);
}

function App() {
  return (
    <div className="App">
      <button id='playKick' onClick={playSynth}>Play Kick</button>
    </div>
  );
}

export default App;
