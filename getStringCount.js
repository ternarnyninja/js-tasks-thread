// [Map, рекурсия, кеш]
// Задача:
// 1. оптимизировать функцию getStringCount из задач на методы массивов,
// чтобы результат вычисления кешировался в WeakMap
// 2. разобраться/загуглить что такое циклическая ссылка в объекте,
// реализовать такой объект, разобраться почему без доработок getStringCount
// при наличии циклической ссылки в объекте получаем нежелательное поведение
// (переполнение стека вызовов), попробовать оптизимизровать решение чтобы захендлить 
// это каким-либо образом и написать комментарий над функцией, как она работает с циклическими ссылками
// 3. Опционаольно, желательно после 1 и 2:
// исследовать как хендлит циклические ссылки метод JSON.stringify на mdn

function getStringCount(object, acc = {result: 0}) {
  let cache = new WeakMap();
  const values = Object.values(object);
  for(let i = 0;i < values.length;i++) {
    if (typeof values[i] === "string") {
      acc.result += 1;
    } else if(typeof values[i] === "object" && values[i] !== null) {
      getStringCount(values[i], acc);
    }
  }
  return cache;
}

// debugger;

let obj = {
  first: "1",
  second: "2",
  third: false,
  fourth: ["anytime", 2, 3, 4],
  fifth: null,
};

let result = getStringCount(obj);

console.log(result);

console.log(result.has(obj));

obj = null;

console.log(result.has(obj));

// let obj = {
//   first: {
//       v1: "1", 
//       v2: {
//           second: "2"
//       },
//       v3: {
//           third: false,
//           v4: {
//               fourth: ["anytime", 2, 3, 4],
//           }

//       },
//       v5: {
//           fifth: null,
//       }
//   }
// }

// obj.first.obj = obj;

// let result = getStringCount(obj);