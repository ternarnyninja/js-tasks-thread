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

      const myResolve = (value) => {
        if (this.state === PromiseState.Pending) {
          this.state = PromiseState.Resolved;
          this.result = value;
          this.queueOnResolve.forEach(callback => callback(value));
        }
      }

      const myReject = (error) => {
        if (this.state === PromiseState.Pending) {
          this.state = PromiseState.Rejected;
          this.result = error;
          this.queueOnReject.forEach(callback => callback(error));
        }
      }

      try {

        callback(myResolve, myReject)
      
      } catch(err) {

        console.log(err);
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);
      }

	}

	// hmm...
    myThen = (thenOnResolve, thenOnReject) => {
      return new MyPromise((resolve, reject) => {
        if (this.state === PromiseState.Pending) {
          this.queueOnResolve.push(() => {
            try {
              const fulfilledFromPromise = thenOnResolve(this.result);
              if (fulfilledFromPromise instanceof MyPromise) {
                fulfilledFromPromise.myThen(resolve, reject);
              } else {
                resolve(fulfilledFromPromise);
              }
            } catch (err) {
              reject(err)
              console.log(err.name);
              console.log(err.message);
              console.log(err.stack);
              throw err;
            }
          });
          this.queueOnReject.push(() => {
            try {
              const rejectedFromPromise = thenOnReject(resolve, reject);
              if (rejectedFromPromise instanceof MyPromise) {
                rejectedFromPromise.myThen(resolve, reject);
              } else {
                reject(rejectedFromPromise);
              }
            } catch (err) {
                reject(err);
                console.log(err.name);
                console.log(err.message);
                console.log(err.stack);
              throw err;
            }
          });
        }

        if (this.state === PromiseState.Resolved) {
          try {
            const fulfilledFromPromise = thenOnResolve(this.result);
            if (fulfilledFromPromise instanceof MyPromise) {
              fulfilledFromPromise.myThen(resolve, reject);
            } else {
              resolve(fulfilledFromPromise);
            }
          } catch (err) {
              reject(err);
              console.log(err.name);
              console.log(err.message);
              console.log(err.stack);
              throw err;
          }
        }

        if (this.state === PromiseState.Rejected) {
          try {
            const rejectedFromPromise = thenOnReject(this.result);
            if (rejectedFromPromise instanceof MyPromise) {
              rejectedFromPromise.myThen(resolve, reject);
            } else {
              reject(rejectedFromPromise);
            }
          } catch (err) {
              reject(err);
              console.log(err.name);
              console.log(err.message);
              console.log(err.stack);
              throw err;
          }
        }
      });

    }

	catch = (catchCallback) => {
		return this.then(undefined, catchCallback || (x => x));
	}
}

// write to window to use it in test file
// window['MyPromise'] = MyPromise;

// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve("resolve first one"), 1000);
// });
// promise.myThen((res) => {
//     console.log(res);
//     return new MyPromise(resolve => {
//         setTimeout(() => resolve("resolved second one"), 1000);
//     });
// }).myThen(res => {
//     console.log(res);
// })

// new MyPromise(function(resolve, reject) {

//     setTimeout(() => resolve(1), 1000); // (*)
  
//   }).myThen(function(result) { // (**)
  
//     console.log(result); // 1
//     return result * 2;
  
//   }).myThen(function(result) { // (***)
  
//     console.log(result); // 2
//     return result * 2;
  
//   }).myThen(function(result) {
  
//     console.log(result); // 4
//     return result * 2;
  
//   });