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


   
let obj1 = {
  first: {
      v1: "1", 
      v2: {
          second: "2"
      },
      v3: {
          third: false,
          v4: {
              fourth: ["anytime", 2, 3, 4],
          }

      },
      v5: {
          fifth: null,
      }
  }
}

obj1.first.obj = obj1;

const obj = {
  first: '1',
  seconds: '2',
  third: false,
  fourth: ['anytime', 2, 3, 4],
  fifth: null
};

const arr = ['1', '2', ['3']];

// 1. 

function getStringCount(obj) {
  let cache = new WeakMap();
  if (typeof obj === "string") return 1;
  if (!obj) return 0;
  if (!cache.has(obj)) {
    const result = Object.values(obj).reduce((acc, cur) => acc + getStringCount(cur), 0);
    cache.set(getStringCount, result);
  }
  return cache.get(getStringCount);
}

// debugger;

// let result = getStringCount(obj);

// console.log(result);
