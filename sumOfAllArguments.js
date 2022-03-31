// задача на чиле
// Написать ф-цию которая находит сумму всех р-татов своих аргументов

function test() {
  console.log(arguments);
  console.log(typeof arguments);
}

// arguments - object;
// есть [Symbol.iterator] 

// следовательно можно итерироваться циклом for..of

// объявим ф-цию sum 
// в ней нам нужна переменная в которой будет хранится результат
// проитерируемся по аргументам 

function sum() {
  let result = 0;
  for (let prop of arguments) {
    result += prop;
  }
  
  return result;
}

// debugger;

console.log(sum(1,2,3)); // 6
console.log(sum(1,3,5,8)); // 17
console.log(sum(1,10,15)); // 26
