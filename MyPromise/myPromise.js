const PromiseState = {
	Pending: 'PENDING',
	Resolved: 'RESOLVED',
	Rejected: 'REJECTED',
}

class MyPromise {
	constructor(callback) {
	  this.state = PromiseState.Pending;
    this.result = undefined;
    this.queueOnResolve = [];
    this.queueOnReject = [];

    const resolve = (value) => {
      if (this.state === PromiseState.Pending) {
        this.state = PromiseState.Resolved;
        this.result = value;
        console.log(this.queueOnResolve);
        this.queueOnResolve.forEach(callback => callback(value));
      }
    }

    const reject = (error) => {
      if (this.state === PromiseState.Pending) {
        this.state = PromiseState.Rejected;
        this.result = error;
        this.queueOnReject.forEach(callback => callback(error));
      }
    }

    try {
      callback(resolve, reject);
    } catch(err) {
      console.log(err);
    }

  }

	// hmm...
  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled ===  "function" ? onFulfilled : value => value;
    onRejected = typeof onFulfilled ===  "function" ? onRejected : error => {throw error};
    return new MyPromise((resolve, reject) => {
      if (this.state === PromiseState.Pending) {
          this.queueOnResolve.push(() => {
            try {
              const newResult = onFulfilled(this.result);
              if(newResult instanceof MyPromise) {
                newResult.then(resolve, reject)
              } else {
              resolve(newResult);
              }
            } catch(err) {
              reject(err);
            }
          });
          this.queueOnResolve.push(() => {
            try {
              const newResult = onRejected(this.result);
              if(newResult instanceof MyPromise) {
                newResult.then(resolve, reject)
              } else {
              reject(newResult);
              }
            } catch(err) {
              reject(err);
            }
          });
      }

      if (this.state === PromiseState.Resolved) {
        try {
          const newResult = onFulfilled(this.result);
          if(newResult instanceof MyPromise) {
            newResult.then(resolve, reject)
          } else {
          resolve(newResult);
          }
        } catch(err) {
          reject(err);
        }
      }

      if (this.state === PromiseState.Rejected) {
        try {
          const newResult = onRejected(this.result);
          if(newResult instanceof MyPromise) {
            newResult.then(resolve, reject)
          } else {
          reject(newResult);
          }
        } catch(err) {
          reject(err);
        }
      }
    })

  }
    
	catch = (onRejected) => {
		return this.then(undefined, onRejected);
	}
}

// write to window to use it in test file
window['MyPromise'] = MyPromise;

// const promise = new MyPromise((resolve,reject) => {
//   setTimeout(() => resolve("zopa"), 1000);
// });

// promise.then(result => console.log(result));
// promise.then(result => console.log(result));
// promise.then(result => console.log(result));
// promise.then(result => console.log(result));

// const promise1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve("zopa"), 1000);
// });

// setTimeout(() => {
//   promise1.then(result => console.log(result));
//   promise1.then(result => console.log(result));
//   promise1.then(result => console.log(result));
//   promise1.then(result => console.log(result));
// }, 2000);

// const promise2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve("zopa"), 1000);
// }).then((result) => {
//   return result + "zopa";
// }).then((result) => {
//   return result + "zopa";
// }).then((result) => {
//   return result + "zopa";
// }).then((result) => {
//   console.log(result);
// })

// const promise3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve("zopa"), 1000);
// }).then((result) => {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => resolve(result + "zopa"), 2000);
//   });
// }).then((result) => {
//   console.log(result);
// })