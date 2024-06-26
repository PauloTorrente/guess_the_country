// Função para construir a página
function buildPage(myCurrentCountry) {
  const root = document.getElementById('root'); // Obtém a raiz do documento

  const myHeader = document.createElement('header'); // Cria um elemento header
  myHeader.id = 'myHeader'; // Define o id do header

  const myH1 = document.createElement('h1'); // Cria um elemento h1
  myH1.id = 'myH1'; // Define o id do h1
  myH1.innerText = 'Flag'; // Define o texto do h1
  myHeader.appendChild(myH1); // Adiciona o h1 ao header

  const myMain = document.createElement('main'); // Cria um elemento main
  myMain.id = 'myMain'; // Define o id do main

  const myFlag = document.createElement('img'); // Cria uma imagem
  myFlag.id = 'myFlag'; // Define o id da imagem
  myMain.appendChild(myFlag); // Adiciona a imagem ao main

  const myInput = document.createElement('input'); // Cria um input
  myInput.id = 'myInner'; // Define o id do input
  myInput.placeholder = 'Guess the capital...'; // Define o texto de placeholder do input
  myMain.appendChild(myInput); // Adiciona o input ao main

  // Adiciona um evento para acionar o botão quando a tecla Enter for pressionada
  myInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita o comportamento padrão do Enter
      guessFlag(myCurrentCountry); // Chama a função guessFlag ao pressionar Enter
    }
  });

  const myClueButton = document.createElement('button'); // Cria um botão
  myClueButton.id = 'myClueButton'; // Define o id do botão
  myClueButton.className = 'button'; // Define a classe do botão
  myClueButton.innerText = 'Give me a clue'; // Define o texto do botão
  myMain.appendChild(myClueButton); // Adiciona o botão ao main

  const myNextButton = document.createElement('button'); // Cria um botão
  myNextButton.id = 'myNextButton'; // Define o id do botão
  myNextButton.className = 'button'; // Define a classe do botão
  myNextButton.innerText = 'Next Flag'; // Define o texto do botão
  myMain.appendChild(myNextButton); // Adiciona o botão ao main

  root.appendChild(myHeader); // Adiciona o header à raiz
  root.appendChild(myMain); // Adiciona o main à raiz
}

// Função assíncrona para obter todas as capitais
async function getAllCapitals() {
  const url = 'https://restcountries.com/v3.1/subregion/south america'; // URL da API
  const response = await fetch(url); // Faz uma requisição à API
  const data = await response.json(); // Converte a resposta para JSON

  if (!Array.isArray(data)) {
    throw new Error('Dados recebidos não são um array'); // Lança um erro se os dados não forem um array
  }

  // Mapeia os dados para extrair as capitais
  const myCapitalsArray = data.flatMap(item => item.capital);
  return myCapitalsArray; // Retorna as capitais
}

// Função para gerar um número aleatório dentro de um intervalo
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Função assíncrona para obter o país por sua capital
async function getCountryByCapital(capitals) {
  const myCapitalsArray = await getAllCapitals(); // Obtém todas as capitais
  const myRandomNumber = getRandomNumber(0, capitals.length); // Gera um número aleatório

  // URL para obter o país por sua capital
  const url = `https://restcountries.com/v3.1/capital/${myCapitalsArray[myRandomNumber]}`;
  const response = await fetch(url); // Faz uma requisição à API
  const myCountry = await response.json(); // Converte a resposta para JSON

  if (!Array.isArray(myCountry)) {
    throw new Error('Resposta da API não é um array'); // Lança um erro se a resposta não for um array
  }

  return myCountry; // Retorna o país
}

// Função assíncrona para mostrar a bandeira de um país na página
async function front(myCurrentCountry) {
  // const myCurrentCountry = await getCountryByCapital(capitals); // Obtém o país
  const myImage = document.getElementById('myFlag'); // Obtém a imagem
  myImage.setAttribute('src', myCurrentCountry[0].flags.png); // Define a fonte da imagem
}

// Função assíncrona para adivinhar a capital de um país
async function guessFlag(myCurrentCountry) {
  // const myCurrentCountry = await getCountryByCapital(countries, min, max); // Obtém o país atual
  const myCapital = myCurrentCountry[0].capital[0]; // Obtém a capital do país

  const myInput = document.getElementById('myInner'); // Obtém o input

  // Se o valor do input for igual à capital em minúsculas
  if (myInput.value.trim().toLowerCase() === myCapital.toLowerCase()) {
    updateScoreAndProgress(true); // Atualiza a pontuação e o progresso como corretos
    alert('Você acertou!'); // Exibe uma mensagem de acerto
  } else {
    updateScoreAndProgress(false); // Atualiza a pontuação e o progresso como incorretos
    alert('Tente novamente'); // Exibe uma mensagem de erro
  }
  myInput.value = ''; // Limpa o input
}

// Função para atualizar a pontuação e o progresso
function updateScoreAndProgress(isCorrect) {
  const resultSpan = document.createElement('span'); // Cria um elemento span
  resultSpan.classList.add('result'); // Adiciona a classe 'result' ao span
  if (isCorrect) { // Se a resposta for correta
    resultSpan.classList.add('correct'); // Adiciona a classe 'correct' ao span
    resultSpan.innerText = '✓ Correcto!'; // Define o texto do span como '✓ Correcto!'
  } else {
    resultSpan.classList.add('incorrect'); // Adiciona a classe 'incorrect' ao span
    resultSpan.innerText = 'X Incorrecto!'; // Define o texto do span como 'X Incorrecto!'
  }
  document.getElementById('myMain').appendChild(resultSpan); // Adiciona o span ao main

  // Atualiza a pontuação e o progresso
  progress++; // Incrementa o progresso
  if (isCorrect) { // Se a resposta for correta
    score++; // Incrementa a pontuação
  }
}

// Função assíncrona para mostrar a próxima bandeira
async function nextFlag(myCurrentCountry) {
  // const myCurrentCountry = await getCountryByCapital(countries, min, max); // Obtém o país atual
  const myImage = document.getElementById('myFlag'); // Obtém a imagem
  myImage.setAttribute('src', myCurrentCountry[0].flags.png); // Define a fonte da imagem
}

// Função principal assíncrona para executar a página
async function runPage() {
  const capitals = await getAllCapitals('all'); // Obtém todas as capitais
  const myCurrentCountry = await getCountryByCapital(capitals); // Obtém o país
  console.log('pais', myCurrentCountry[0].name.common);
  console.log('capital', myCurrentCountry[0].capital[0]);

  buildPage(myCurrentCountry); // Constrói a página
  front(myCurrentCountry); // Mostra a primeira bandeira
}

let progress = 0; // Variável para armazenar o progresso do jogo
let score = 0; // Variável para armazenar a pontuação do jogo

runPage(); // Executa a página
