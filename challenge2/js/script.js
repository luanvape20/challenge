const body = document.getElementById('body');
const buttonDtarkSlider = document.getElementById('DtarkSlider');
const display = document.getElementById('display');
const board = document.getElementById('board');
const buttonboard = Array.from(document.getElementsByTagName('button'));
const buttondel = document.getElementById('del');
const buttonsplit = document.getElementById('split');
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
  let data = number.innerHTML.toString();
  numbers = numbers.concat(data);
  numbers = numbers.replace('•', ',');

  if (numbers.indexOf('del') != -1) {
    numbers = numbers.replace('del', '');
    numbers = numbers.substring(0, numbers.length - 1);
    numbers = numbers.length === 0 ? '0' : numbers;
    //console.log(numbers);
  }

  if (numbers.indexOf('rest') != -1) {
    display.innerHTML = '';
    numbers = '0';
  }

  operatioNumber();
  display.innerHTML = numbers;
}

function operatioNumber() {
  let rex = /^(-?\d+)([-+x/])(-?\d+)(([-+x/]-?\d+)*)(=)$/;
  let operation = [];
  let num1 = 0;
  let num2 = 0;
  let result = 0;

  if (numbers.match(rex)) {
    numbers = numbers.replace('=', '');

    operation = numbers.split("").filter((value) => /[+\-x/%]/.test(value));
    num1 = Number(numbers.split(operation[0])[0].match(/\d+/)[0]);

    if (operation.length > 1) {
      console.log("hola")
      num2 = Number(numbers.split(operation[0])[1].match(/\d+/)[0]);
      console.log(num2)
    }

    console.log(operation)
    console.log(num1)


  } else if (!numbers.match(rex) && numbers.indexOf('=') != -1) {
    numbers = numbers.replace('=', '');
    swal({
      title: 'ADVERTENCIA',
      text: 'debes de ingresar un número antes de realizar la operación.',
      icon: 'warning',
      button: 'Aceptar',
    });
  }
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => validationNumber(element));
});
