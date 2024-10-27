import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import reproductionArray from './utills/reproductionArray';
import getRandomIntInRange from './utills/getRandomIntInRange';

import sound1 from './sounds/bitvaEkstrasensov.mp3';
import sound2 from './sounds/ktoMillioner.mp3';
import sound3 from './sounds/cherepashki.mp3';
import sound4 from './sounds/chtoGdeKogda.mp3';
import sound5 from './sounds/komedyKlub.mp3';
import sound6 from './sounds/okna.mp3';
import sound7 from './sounds/pila.mp3';
import sound8 from './sounds/pokemon.mp3';
import sound9 from './sounds/poleChudes.mp3';
import sound10 from './sounds/pustGorovyat.mp3';
import sound11 from './sounds/pyureshka.mp3';
import sound12 from './sounds/twitchDonat.mp3';

import './App.css';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
const sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10, sound11, sound12 ];
const prizes = [
  {
    id: 'a44c728d-8a0e-48ca-a963-3d5ce6dd41b0',
    image: 'https://i.ibb.co/xfS2ZtF/Cam-Scanner-26-10-2024-21-34-1.jpg',
    text: 'Руслан Ш.',
  },
  {
    id: '7d24b681-82d9-4fc0-b034-c82f9db11a59',
    image: 'https://i.ibb.co/GvysNyy/IMG-3754.jpg',
    text: 'Анна Т.',
  },
  {
    id: '9da9a287-952f-41bd-8c7a-b488938d7c7a',
    image: 'https://i.ibb.co/wNVspYy/2024-10-27-18-18-01.jpg',
    text: 'Анна М.',
  },
  {
    id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794',
    image: 'https://i.ibb.co/2NgPH2S/2024-10-27-18-20-02.jpg',
    text: 'Наталья С.',
  },
  {
    id: '23c551bf-8425-4ffd-b7c2-77c87844f89d',
    image: 'https://i.ibb.co/K9BGDhB/IMG-3753.jpg',
    text: 'Даниил К.',
  },
  {
    id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43',
    image: 'https://i.ibb.co/Dbs2YrT/istockphoto-1300845620-612x612.jpg',
    text: 'Андрей П.',
  },
  {
    id: 'fb121804-e4f6-4fce-bdd6-1e3189172f37',
    image: 'https://i.ibb.co/7vNsPY3/IMG-3752.jpg',
    text: 'Анна О.',
  },
  {
    id: '26ee933e-0858-481d-afe8-b30d3829242a',
    image: 'https://i.ibb.co/Dbs2YrT/istockphoto-1300845620-612x612.jpg',
    text: 'Сергей П.',
  },
];

const getDesignOptions = (settings) => {
  const result = {};
  const keys = Object.keys(settings);

  keys.forEach((key) => {
    const { forDesign, value } = settings[key];

    if (!forDesign) {
      return;
    }

    result[key] = value;
  });

  return result;
};

// eslint-disable-next-line valid-typeof
const isArrayOf = (type, array) => array.every((item) => typeof item === type);

const getOptionsAsString = (settings, design) => {
  let string = '';
  const keys = Object.keys(settings);

  keys.forEach((key) => {
    const { options, value, forDesign } = settings[key];

    if (!forDesign) {
      return;
    }

    if (typeof forDesign !== 'boolean' && forDesign !== design) {
      return;
    }

    if (options[0] === value) {
      return;
    }

    string += `${key}: ${value},\n`;
  });

  return string;
};

const API = {
  getPrizeIndex: async (prizeList) => {
    const randomPrizeIndex = getRandomIntInRange(0, prizes.length - 1);
    const randomPrizeIndexOffset = prizes.length * 10;

    const finalPrizeIndex = (randomPrizeIndex + randomPrizeIndexOffset) % prizeList.length;
    return finalPrizeIndex;
  },
};

const getRandomSound = () => sounds[Math.floor(Math.random() * sounds.length)];


const App = () => {
  const [settings, setSettings] = useState({
    type: {
      name: 'Type',
      options: ['horizontal', 'vertical'],
      value: 'horizontal',
    },
    design: {
      name: 'Design',
      options: ['Regular'],
      value: 'Regular',
    },
    prizesWithText: {
      name: 'С именами',
      options: [false, true],
      value: false,
    },
    withoutAnimation: {
      name: 'Without animation',
      options: [false, true],
      value: false,
    },
    hideCenterDelimiter: {
      name: 'Hide center delimiter',
      options: [false, true],
      value: false,
      forDesign: 'Regular',
    },
    // hideTopArrow: {
    //   name: 'Hide top arrow',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    // hideSideArrows: {
    //   name: 'Hide side arrows',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    // replaceBottomArrowWithTopArrow: {
    //   name: 'Replace bottom arrow with top arrow',
    //   options: [false, true],
    //   value: false,
    //   forDesign: 'GracefulLines',
    // },
    soundWhileSpinning: {
      name: 'Звук',
      options: [false, true],
      value: false,
    },
    stopInCenter: {
      name: 'Stop in the prize item center',
      options: [false, true],
      value: false,
    },
    spinningTime: {
      name: 'Spinning time',
      options: ['3', '7', '10', '15', '20'],
      value: '1',
    },
  });

  const [prizeList, setPrizeList] = useState([]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);

  useEffect(() => {
    const reproducedArray = [
      ...prizes,
      ...reproductionArray(prizes, prizes.length * 3),
      ...prizes,
      ...reproductionArray(prizes, prizes.length),
    ];

    const list = [...reproducedArray].map((item) => ({
      ...item,
      id: `${item.id}--${nanoid()}`,
    }));

    setPrizeList(list);
  }, []);

  useEffect(() => {
    if (!prizeIndex || start) {
      return;
    }

    setStart(true);
  }, [prizeIndex, start]);

  useEffect(() => {
    if (!spinning || !prizeList.length) {
      return;
    }
  
    const prepare = async () => {
      const newPrizeIndex = await API.getPrizeIndex(prizeList); // ensure prizeList is passed in as a parameter
      setPrizeIndex(newPrizeIndex);
      setStart(false);
    };
  
    prepare();
  }, [spinning, prizeList]);

  const handleSettingsChange = (e) => {
    const { dataset, value, checked } = e.target;
    const { param } = dataset;

    const newValue = checked !== undefined ? checked : value;

    const newParam = { ...settings[param] };
    newParam.value = newValue;

    setSettings((prevState) => ({ ...prevState, [param]: newParam }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = () => {
    setPrizeIndex(null);  // Reset prizeIndex first for clarity
    setSpinning(true);    // Set spinning to true to initiate a new spin
    setStart(false);      // Reset start so it’s ready for the new spin
  
    // Small delay to ensure states are set before setting `start` to true
    setTimeout(() => {
      setStart(true);
    }, 50);
  };

  const handlePrizeDefined = () => {
    // Toast.fire({ icon: 'success', title: '🥳 Prize defined 🥳', timer: 1500 });

    setSpinning(false);
  };

  const type = settings.type.value;
  const design = settings.design.value;
  const soundWhileSpinning = settings.soundWhileSpinning.value;
  const stopInCenter = settings.stopInCenter.value;
  const withoutAnimation = settings.withoutAnimation.value;
  const prizesWithText = settings.prizesWithText.value;
  const hideCenterDelimiter = settings.hideCenterDelimiter.value;
  const spinningTime = +settings.spinningTime.value;

  const designOptions = getDesignOptions(settings);

  const settingsElement = (
    <div className="settings">
      <ul className="settings-list">
        {Object.keys(settings).map((key) => {
          let element;

          const { name, options, value, forDesign } = settings[key];

          if (
            forDesign &&
            typeof forDesign !== 'boolean' &&
            forDesign !== design
          ) {
            return element;
          }

          if (isArrayOf('boolean', options)) {
            element = (
              <input
                data-param={key}
                type="checkbox"
                checked={value}
                onChange={handleSettingsChange}
              />
            );
          }

          if (isArrayOf('string', options)) {
            element = (
              <select
                data-param={key}
                value={value}
                onChange={handleSettingsChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          }

          return (
            <li key={key} className="settings-list-item">
              <p>{name}</p>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const designOptionsString = getOptionsAsString(settings, design);
  const options = Object.entries({
    stopInCenter,
    withoutAnimation,
  });
  const availableOptions = options.filter((item) => Boolean(item[1]));

  const optionsString = availableOptions
    .map(([key, value]) => `${key}: ${value}, `)
    .join('');

  const codeElement = (
    <pre className="pre-element">
      <code className="pre-element-code">
        {`
        const prizeList = ${JSON.stringify(prizeList, null, 2)};

        <RoulettePro
          ${type !== settings.type.options[0] ? `type="${type}"` : ''}
          start={${Boolean(start)}}
          prizes={prizeList}
          prizeIndex={${prizeIndex}}
          spinningTime={${spinningTime}}
          ${/* ${isDefaultDesign ? '' : `design="${design}"`} */ ''}
          ${
            designOptionsString
              ? `designOptions={{${designOptionsString}}}`
              : ''
          }
          ${soundWhileSpinning ? `soundWhileSpinning="${sounds}"` : ''}
          ${optionsString !== '' ? `options={{ ${optionsString} }}` : ''}
          ${
            prizesWithText === true
              ? 'defaultDesignOptions={{ prizesWithText: true }}'
              : ''
          }
        />
      `}
      </code>
    </pre>
  );

  return (
    <div>
      <div className={`roulette ${type}`}>
        <RoulettePro
          type={type}
          prizes={prizeList}
          // design={design}
          designOptions={designOptions}
          start={start}
          prizeIndex={prizeIndex}
          onPrizeDefined={handlePrizeDefined}
          spinningTime={spinningTime}
          classes={{
            wrapper: 'roulette-pro-wrapper-additional-styles',
          }}
          soundWhileSpinning={soundWhileSpinning ? getRandomSound() : null}
          options={{ stopInCenter, withoutAnimation }}
          defaultDesignOptions={{ prizesWithText, hideCenterDelimiter }}
        />
      </div>
      <div
        className={`roulette-actions ${
          // settings.replaceBottomArrowWithTopArrow.value ? 'down' : ''
          ''
        }`}
      >
        <div className="gray-block">
          <div className="button-wrapper">
            <button onClick={handleStart} className="spin-button" type="button">
              Spin
            </button>
          </div>
        </div>
      </div>

      {settingsElement}
      {codeElement}
    </div>
  );
};

export default App;
