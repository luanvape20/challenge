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
  //let rex = /[0-9]+$/;
  //let rex = /^[-{2,}\d]/;
  let rex = new RegExp('^([-]{0,2}[0-9])([0-9]{0,}[-+*/]?)[0-9]+');
  let data = number.innerHTML;
  let num = 0;

  if (!data.match(rex) && numbers === '') {
    swal({
      title: 'ADVERTENCIA',
      text: 'debes de ingresar un número antes de realizar la operación.',
      icon: 'warning',
      button: 'Aceptar',
    });
  }

  if (data.match(rex)) {
    numbers += data;
    console.log(numbers);
  }
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => operationnumber(element));
});
