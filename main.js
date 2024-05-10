function buildPage() {
  const root = document.getElementById('root');

  const myHeader = document.createElement('header');
  myHeader.id = "myHeader";

  const myH1 = document.createElement('h1');
  myH1.id = "myH1";
  myH1.innerText = 'guessFlag';
  myHeader.appendChild(myH1);

  const myMain = document.createElement('main');
  myMain.id = "myMain";

  const myFlag = document.createElement('img');
  myFlag.id = "myFlag";
  myMain.appendChild(myFlag);

  const myInner = document.createElement('input');
  myInner.id = "myInner";
  myMain.appendChild(myInner);

  const myClueButton = document.createElement('div');
  myClueButton.id = "myClueButton";
  myClueButton.setAttribute('class', 'button');
  myClueButton.innerText = 'Give me a clue';
  myMain.appendChild(myClueButton);

  const myNextButton = document.createElement('div');
  myNextButton.id = "myNextButton";
  myNextButton.setAttribute('class', 'button');
  myNextButton.innerText = 'Next Flag';
  myMain.appendChild(myNextButton);

  root.appendChild(myHeader);
  root.appendChild(myMain);
}

async function getAllCapitals(whatIWant) {
  const url = https://restcountries.com/v3.1/${whatIWant};
  const responseAsPromise = await fetch(url);
  const data = await responseAsPromise.json();

  function mapCallback(item) {
    return item.capital;
  }
  const myCapitalsArray = (data.map(mapCallback).flat());
  return myCapitalsArray;
}

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min));
  return randomNumber;
}

async function getCountryByCapital(countries, min, max) {
  const myRandomArray = await getAllCapitals(countries);
  const myRandomNumber = getRandomNumber(min, max);

  console.log('el array con todos los paises: ', myRandomArray);
  console.log('mi numero random: ', myRandomNumber);

  const url = https://restcountries.com/v3.1/capital/${myRandomArray[myRandomNumber]};
  const myCountryResponse = await fetch(url);
  const myCountry = await myCountryResponse.json();

  console.log('myCountry', myCountry);
  return myCountry;
}

async function front(countries, min, max) {
  const myCurrentCountrie = await getCountryByCapital(countries, min, max);
  const myImage = document.getElementById('myFlag');
  myImage.setAttribute('src', myCurrentCountrie[0].flags.png);
}

async function guessFlag(countries, min, max) {
  const myCurrentCountrie = await getCountryByCapital(countries, min, max);

  const myCapital = myCurrentCountrie.capital;
  const fitstClue = myCurrentCountrie.population;
  const secondClue = myCurrentCountrie.region;
  const thirdClue = myCurrentCountrie.languages;

  const myInput = document.getElementById('myInner');

  myInput.addEventListener("enter", function () {
    // Cuando el evento de cambio se dispare, este código se ejecutará
    const inputValue = myInput.value;
    if (inputValue === myCapital) {
      alert('Has ganado');
    } else {
      alert('Sigue intentandolo');
    }
  });
}



async function nextFlag(countries, min, max) {
  const button = document.getElementById
  //por aqui ir escribiendo cosas de eventos y tal

  const myCurrentCountrie = await getCountryByCapital(countries, min, max);
  const myImage = document.getElementById('myFlag');
  myImage.setAttribute('src', myCurrentCountrie[0].flags.png);
}



async function runPage() {
  buildPage();
  const capitals = await getAllCapitals('all');

  await front('all', 0, capitals.length);
}

runPage();