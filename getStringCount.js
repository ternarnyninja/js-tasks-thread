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

let cache = new WeakMap();

function getStringCount(object) {
  let res = 0;
  const values = Object.values(object);
  if (!cache.has(object)) {
    cache.set(object, 0);
    for (let i = 0;i < values.length;i++) {
      if (typeof values[i] === "string") res += 1;
      if (typeof values[i] === "object" && values[i] !== null) {
        if (cache.has(values[i])) continue;
        res += getStringCount(values[i]);
      }
    }
    cache.set(object, res);
  }

  return cache.get(object);
}

// // debugger;

let obj = {
  first: "1",
  second: "2",
  third: false,
  fifth: null,
};

obj.obj = obj;

let result = getStringCount(obj);

console.log(result);
