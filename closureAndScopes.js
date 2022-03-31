// Создать ф-цию, которая возвращает массив ф-ций
// Которые должны возвращать свой индекс в массиве. 

// Определили, что ф-ции хранятся в массиве. 
// Создадим ф-цию в которую будем передавать какое-то число - это кол-во запушеных ф-ций
// следовательно будем юзать цикл
// логично, что нужно пушить в массив наши ф-ции

// изменить let на var и посмотреть на поведение;

function getIndexFromArray(num) {
  let callback = [];
  
  for(let i = 0;i < num;i++) {
    
    callback.push(function() {
      return i;
    })
  }
  return callback;
}

// debugger;

let result = getIndexFromArray(5);

console.log(result);

console.log(result[0]());
console.log(result[1]());