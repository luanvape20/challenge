const body = document.getElementById('body');
const buttonDtarkSlider = document.getElementById('DtarkSlider');
const display = document.getElementById('display');
const board = document.getElementById('board');
const buttonboard = Array.from(document.getElementsByTagName('button'));
const buttondel = document.getElementById('del');
const buttonsum = document.getElementById('sum');
const buttonminus = document.getElementById('minus');
const buttondot = document.getElementById('dot');
const buttonsplit = document.getElementById('split');
const buttonmultiply = document.getElementById('multiply');
const buttonequal = document.getElementById('equal');
//let element = getComputedStyle(document.documentElement);

let postionslider = [19, 36, 0];
let count = 0;
let numbers = '';
let singOperator = '';
let size = 0;

const color = [
  'hsl(30, 25%, 89%)',
  'hsl(268,75.0%,9.4%)',
  'hsl(222, 26%, 31%)',
];

const backgroundElement = [
  display,
  buttonDtarkSlider,
  board,
  buttondel,
  buttonequal,
];
/**
 *This function is responsible for moving the slider to change the colors
 */
function moveslider() {
  buttonDtarkSlider.style.transform = `translateX(${postionslider[count]}px)`;
  changeBackgroundColor(count);
  count++;

  if (count === 3) {
    changeBackgroundColor(count);
    count = 0;
  }
}

function getCount() {
  let result = '';
  result = backgroundElement.map((element) => {
    return getComputedStyle(element, 'background:').backgroundColor;
  });

  return result;
}

function changeBackgroundColor(count) {
  console.log(getCount());
  body.style.background = color[count];
  //display.style.background = color[];
}

function validationNumber(number) {
  let data = new String(number.innerHTML);
  let character = '';
  numbers += data;

  if (numbers.indexOf('del') != -1) {
    numbers = numbers.replace('del', '0');
    character = numbers.substring(1, numbers.indexOf('0'));
    character = character.length === 0 ? '0' : character;
    numbers = character;
    console.log(numbers, character);
  }

  if (numbers.indexOf('rest') != -1) {
    display.innerHTML = '';
    numbers = '0';
  }

  operatioNumber(numbers);
  //display.innerHTML = numbers;
}

function operatioNumber(number) {
  let rex = /^([-]{0,2}\d*)([-+*/]{1})(\d*[=])+$/;
  if (numbers.match(rex)) {
  } else if (!numbers.match(rex) && numbers.indexOf('=') != -1) {
    console.log(numbers);
    swal({
      title: 'ADVERTENCIA',
      text: 'debes de ingresar un n??mero antes de realizar la operaci??n.',
      icon: 'warning',
      button: 'Aceptar',
    });
  }
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => validationNumber(element));
});
