// Создать ф-цию генератор, которая создает последовательность Фибоначчи. 
// Первое число последовательности 0
// Следующие число последовательности 1 

// вызов next() должен проходить через следующее число в последовательности Фибоначчи,
// а next().value будет проходить и давать значение.

// Определим ф-цию генератор 
// Инициализировать переменные с начальными значениями
// Попробуем использовать цикл для вычислений

function *fibonacci() {
  let first = 0;
  let second = 1;
  while (true) {
    let current = first;
    first = second;
    second = second + current;
    let reset = yield current;

    if (reset) {
      first = 1;
      second = 2
    }
  }
}

// debugger;

let fib = fibonacci();

console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

