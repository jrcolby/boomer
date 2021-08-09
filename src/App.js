import "./App.css";
import * as Tone from "tone";

const oscillators = [
  {
    value: "triangle",
    chance: 0.45,
  },
  {
    value: "sine",
    chance: 0.45,
  },
  {
    value: "square",
    chance: 0.1,
  },
];

const clickTypes = [
  {
    value: "C4",
    chance: 0.5,
  },
  {
    value: "C5",
    chance: 0.5,
  },
];

const distortionLevel = [
  {
    value: 0,
    chance: 0.35,
  },
  {
    value: 0.1,
    chance: 0.3,
  },
  {
    value: 0.5,
    chance: 0.2,
  },
  {
    value: 1.3,
    chance: 0.15,
  },
];

const bitcrushLevel = [
  {
    value: 0,
    chance: 0.6,
  },
  {
    value: 12,
    chance: 0.3,
  },
  {
    value: 8,
    chance: 0.3,
  },
];

/**
 * Make JSON object that contains all properties for synth,
 * sampler, and effects
 */
let kickParams = makeKickParams();
let membraneKick = generateSynth(kickParams);
console.log(kickParams);

let clickSampler = new Tone.Sampler({
  urls: {
    C4: "/woodblock.mp3",
    C5: "/clave.mp3",
  },
});

let clickVol = new Tone.Volume(0 - getRandomBounded(20, 60));

//  Init devices for effects chain
let loPass = generateFilter(kickParams);

let hiPass = new Tone.Filter({
  type: "highpass",
  frequency: 20,
  rolloff: -24,
});

let distort = new Tone.Distortion(kickParams.distortLevel);
let crusher = new Tone.BitCrusher(kickParams.bitcrushLevel);
let limiter = new Tone.Limiter(0);
let master = new Tone.Channel(0, 0);
membraneKick.chain(distort, master);
clickSampler.chain(clickVol, master);
master.chain(hiPass, loPass, limiter, Tone.Destination);

function App() {
  // Creating loop to sync sampler and membrane synth
  let loop = new Tone.Loop(loopStep, "4n");

  function loopStep(time) {
    clickSampler.triggerAttackRelease(kickParams.clickSample, 0.001, time);
    console.log("GO");
    membraneKick.triggerAttackRelease(kickParams.frequency, "4n", time);
  }

  function makeKick() {
    Tone.Transport.stop();
    kickParams = makeKickParams();
    membraneKick = generateSynth(kickParams);
    loPass = generateFilter(kickParams);
    distort = new Tone.Distortion(kickParams.distortLevel);
    crusher = new Tone.BitCrusher(kickParams.bitcrushLevel);
    membraneKick.chain(distort, master);
    clickSampler.chain(clickVol, master);

    // make a single loop step that plays once.
  }

  function playKick() {
    Tone.Transport.start();
    loop.start();
  }

  return (
    <div className="App">
      <button id="playKick" onClick={playKick}>
        Play Kick
      </button>
      <button id="makeKick" onClick={makeKick}>
        Make Kick
      </button>
    </div>
  );
}

export default App;

function makeKickParams() {
  const params = {
    frequency: getRandomBounded(60, 100),
    octaves: getRandomBounded(1, 5),
    attack: 0,
    decay: getRandomBounded(0, 0.5),
    sustain: 0,
    pitchDecay: getRandomBounded(0, 0.3),
    waveform: getWeightedValue(oscillators),
    filterFreq: getRandomBounded(100, 5000),
    filterRolloff: -12,
    filterType: "lowpass",
    clickSample: getWeightedValue(clickTypes),
    clickVol: getRandomBounded(12, 60),
    distortLevel: getWeightedValue(distortionLevel),
    crusherLevel: getWeightedValue(bitcrushLevel),
  };
  return params;
}

function generateFilter(kickParams) {
  return new Tone.Filter({
    type: kickParams.filterType,
    frequency: kickParams.filterFreq,
    rolloff: kickParams.filterRolloff,
  });
}

function getWeightedValue(objects) {
  let randomNum = Math.random();

  for (var i = 0; i < objects.length; i++) {
    let obj = objects[i];
    if (randomNum < obj.chance) {
      return obj.value;
    }
    randomNum -= obj.chance;
  }
}

function getRandomBounded(min, max) {
  return Math.random() * (max - min) + min;
}

function generateSynth(kickParams) {
  return new Tone.MembraneSynth({
    octaves: kickParams.octaves,
    envelope: {
      attack: kickParams.attack,
      decay: kickParams.decay,
      sustain: kickParams.sustain,
    },
    pitchDecay: kickParams.pitchDecay,
    oscillator: {
      type: kickParams.waveform,
    },
  });
}
