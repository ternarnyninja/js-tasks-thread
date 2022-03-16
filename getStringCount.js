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

obj.first.obj = obj; // цикличная ссылка которая ссылается на одно из своих свойств

// Такой вариант пока вызывает сомнение
// Перебирать объект и добавлять ему свойство-флаг, а затем удалять его

function getValue(object) {
  const handledFlag = '_propHandled_';
  const properties = []; // ???

  function getProperty(object) {
    for(var prop in object) { // В случае с массивом не ок // лучше другой цикл
      if (object[prop] === null) return 0;
      if (typeof(object[prop]) === 'object') {
      if (!object[prop][handledFlag]) {
        Object.defineProperty(object[prop],handledFlag, {
          value: true,
          writable:false,
          configurable: true
        });
          getProperty(object[prop]);
        }
          delete object[prop][handledFlag]
        } else {
        properties.push(object[prop]);
      }
    }
  }
  getProperty(object);

  return properties;
}

// const arrProp = getValue(obj);

// На счет этого могу полагать, что ок

const cache = new Map();
const cacheWeakMap = new WeakMap();

function getStringCount(obj) {
  if(typeof obj === "string") return 1;
  if(!obj) return 0;
  if(!cache.has(obj)) {
      const result = Object.values(obj).reduce((acc, cur) => acc + getStringCount(cur), 0);
      
      cache.set(obj, result);
      cacheWeakMap.set(cache, result);
  }
  return cacheWeakMap.get(cache);
}

// const result1 = getStringCount(arrProp);
