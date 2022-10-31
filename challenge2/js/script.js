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
const buttonrest = document.getElementById('rest');
const buttonequal = document.getElementById('equal');
//let element = getComputedStyle(document.documentElement);

let postionslider = [19, 36, 0];
let count = 0;
let numbers = '';
let singOperator = '';

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

function operationnumber(number) {
  let rex = /^([-]{0,2}[0-9])([0-9]{0,}[-+*/]?)[0-9]+$/;
  let data = new String(number.innerHTML);
  let charter = 0;
  numbers += data;

  if (!numbers.match(rex) && numbers.indexOf('=') != -1) {
    console.log(numbers);
  }

  if (numbers.indexOf('del') != -1) {
    numbers = numbers.replace('del', '');
    numbers = numbers.substring(0, numbers.length - 1);
  }

  if (numbers.indexOf('rest') != -1 || numbers === '') {
    numbers = 0;
  }

  display.innerHTML = numbers;
  /*
  display.innerHTML = numbers;
  /*
  if (!data.match(rex)) {
    swal({
      title: 'ADVERTENCIA',
      text: 'debes de ingresar un número antes de realizar la operación.',
      icon: 'warning',
      button: 'Aceptar',
    });
  }

  if (data.match(rex)) {
    console.log(numbers);
  }
  */
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => operationnumber(element));
});
