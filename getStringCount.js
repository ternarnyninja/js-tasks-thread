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

let obj = {
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

obj.first.obj = obj;

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const stringJson = JSON.stringify(obj, getCircularReplacer());

const parseJson = () => {
  return JSON.parse(stringJson);
}

const objWithOutCircularReference = parseJson(parseJson());

const cache = new WeakMap();

const getStringCount = (obj) => {
  if (typeof obj === "string") return 1;
  if (!obj) return 0;
  if (!cache.has(obj)) {
    const result = Object.values(obj).reduce((acc, cur) => acc + getStringCount(cur), 0);
    cache.set(getStringCount, result);
  }
  return cache.get(getStringCount);
}

// debugger;

let res = getStringCount(objWithOutCircularReference);
console.log(res);
