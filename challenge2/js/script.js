const body = document.getElementById('body');
const buttonDtarkSlider = document.getElementById('DtarkSlider');
const display = document.getElementById('display');
const board = document.getElementById('board');
const buttonboard = Array.from(document.getElementsByTagName('button'));
const buttondel = document.getElementById('del');
const buttonsplit = document.getElementById('split');
const buttonequal = document.getElementById('equal');


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
    count = 0;
  }
}

function getCount() {
  let backgroundColors;
  backgroundColors = backgroundElement.map(element => {
    //display, buttonequal, buttonDtarkSlider, board, buttondel
    /**
     *  if count === 0
     *  if count === 1
     *  if count === 2
     *  if count === 3
     *
     *
     **/

    return getComputedStyle(element).backgroundColor;
  });

  //.getPropertyValue('--clr-Lightgrayishorange');

  return backgroundColors;
}

function changeBackgroundColor(count) {
  console.log(getCount());
  body.style.background = color[count];
  //display.style.background = color[];
}


function validationNumber(number) {
  let data = number.innerHTML.toString();
  numbers = numbers.concat(data).replace('•', ',');

  if (numbers.includes('del')) {
    numbers = numbers.replace('del', '').slice(0, -1);
  }

  if (numbers.includes('rest')) {
    numbers = '';
  }

  operatioNumber();
  display.innerHTML = numbers.length === 0 ? '0' : numbers;
}


/**
 * Performs arithmetic operations based on the input string.
 */
function operatioNumber() {
  if (numbers.includes('=')) {
    try {
      // Replace 'x' with '*' for multiplication
      numbers = numbers.replace(/x/g, '*').replace('=', '');

      // Evaluate the mathematical expression
      let result = eval(numbers);
      numbers = result.toString();
      display.innerHTML = numbers

    } catch (e) {
      swal({
        title: 'ADVERTENCIA',
        text: 'Error en la expresión matemática.',
        icon: 'warning',
        button: 'Aceptar',
      });
    }
  }
}

buttonDtarkSlider.addEventListener('click', () => moveslider());
buttonboard.forEach((element) => {
  element.addEventListener('click', () => validationNumber(element));
});
