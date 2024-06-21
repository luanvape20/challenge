const body = document.getElementById('body');
const buttonDtarkSlider = document.getElementById('DtarkSlider');
const display = document.getElementById('display');
const board = document.getElementById('board');
const buttonboard = Array.from(document.getElementsByTagName('button'));
const buttondel = document.getElementById('del');
const buttonsplit = document.getElementById('split');
const buttonequal = document.getElementById('equal');
const buttonrest = document.getElementById('rest');


let postionslider = [19, 36, 0];
let count = 0;
let numbers = '';


const color = [
  'hsl(30, 25%, 89%)',
  'hsl(268,75.0%,9.4%)',
  'hsl(222, 26%, 31%)',
];


const propertySets = {
  0: [
    '--clr-Verydarkdesaturated',
    '--clr-Red',
    '--clr-Verydarkdesaturated',
    '--clr-Verydarkdesaturatedbluebutton',
    '--clr-Red',
    '--clr-Verydarkdesaturatedbluebutton'
  ],
  1: [
    '--clr-white',
    '--clr-Orange',
    '--clr-whiteOpacitiy',
    '--clr-Purecyan',
    '--clr-Orange',
    '--clr-Purecyan'
  ],

  2: [
    '--clr-Verydarkviolet',
    '--clr-DarkModeratecyan',
    '--clr-Verydarkviolet',
    '--clr-Darkviolet',
    '--clr-DarkModeratecyan',
    '--clr-Darkviolet'
  ]
};


const backgroundElement = [
  display,
  buttonDtarkSlider,
  board,
  buttondel,
  buttonequal,
  buttonrest,
];

/**
 *This function is responsible for moving the slider to change the colors
 */
function moveslider() {
  buttonDtarkSlider.style.transform = `translateX(${postionslider[count]}px)`;
  changeBackgroundColor(count);
  count++;

  if (count === 3) {
    count = 0;
  }
}




function changeBackgroundColor(count) {
  let backgroundColors = "";
  let key = count == 0 ? 1 : count == 2 ? 0 : 2;
  const properties = propertySets[key] ;

  body.style.background = color[count];

  properties.forEach((property, index) => {
    backgroundColors = getComputedStyle(backgroundElement[count]).getPropertyValue(property);
    backgroundElement[index].style.setProperty("background", backgroundColors);
    backgroundElement[index].style.transition = '0.5s 2s ease-out';
  })
}


function validationNumber(number) {
  let data = number.innerHTML.toString();
  numbers = numbers.concat(data).replace('•', ',');

  if (numbers.includes('del')) {
    numbers = numbers.replace('del', '').slice(0, -1);
  }

  if (numbers.includes('reset')) {
    numbers = '';
  }

  operatioNumber();
  display.innerHTML = numbers.length === 0 ? '0' : numbers;
}

/**
 * Performs arithmetic operations based on the input string.
 */

function operatioNumber() {
  const regex = /^(-?\d*\,?\d+)([-+x/])(-?\d*\,?\d+)(([-+x/]-?\d*\.?\d+)*)(=)$/;
  const rex = /^(0*(\.\d+)?\/0+(\.0+)?=|\d+(\.\d+)?\/0+(\.0+)?=)$/;

  if (numbers.match(regex) && !numbers.match(rex)) {
    // Replace 'x' with '*' for multiplication
    numbers = numbers.replace(/x/g, '*').replace('=', '');

    // Evaluate the mathematical expression

    let result = eval(numbers);
    numbers = result.toString().replace('.', ',');
    display.innerHTML = numbers;


  } else if (numbers.includes('=')) {
    numbers = numbers.replace('=', '');
    Swal.fire({
      title: 'ADVERTENCIA',
      text: 'Error en la expresión matemática.',
      icon: 'warning',
      button: 'Aceptar',
      footer: '<a href="#">Más información...</a>'
    });
  }
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => validationNumber(element));
});
