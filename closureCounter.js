function counter() {
  let count = 1;
  // console.log(count);

  return function() {
    // console.log(count);
    return count++;
  }
}

// debugger;

let result = counter();
let result1 = counter();

console.log(result()); // 1
console.log(result()); // 2

console.log(result1()); // 1
console.log(result1()); // 2

