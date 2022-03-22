// const PromiseState = {
// 	Pending: 'PENDING',
// 	Resolved: 'RESOLVED',
// 	Rejected: 'REJECTED',
// }

// class MyPromise {
// 	constructor(callback) {
// 		this.state = PromiseState.Pending;
//     this.result = undefined;
//     this.queueOnResolve = [];
//     this.queueOnReject = [];

//     const myResolve = (value) => {
//       if (this.state === PromiseState.Pending) {
//         this.state = PromiseState.Resolved;
//         this.result = value;
//         this.queueOnResolve.forEach(callback => callback(value));
//         }
//       }

//     const myReject = (error) => {
//       if (this.state === PromiseState.Pending) {
//         this.state = PromiseState.Rejected;
//         this.result = error;
//         this.queueOnReject.forEach(callback => callback(error));
//       }
//     }

//       try {
//         callback(myResolve, myReject)
//       } catch(e) {
//         console.log(e);
//       }
// 	}

// 	// hmm...
// 	myThen = (thenOnResolve, thenOnReject) => {
//       return new MyPromise((resolve, reject) => {
//         if (this.state === PromiseState.Pending) {
//           if (thenOnResolve) {
//             this.queueOnResolve.push(() => {
//               try {
//                 const newResult = thenOnResolve(this.result);
//                 resolve(newResult);
//               } catch(err) {
//                 console.log(err);
//                 reject(err);
//               }
//             });
//           }

//           // if (thenOnReject) {
//           //   this.queueOnReject.push(() => {
//           //     try {
//           //       const newResult = thenOnReject(this.result);
//           //       resolve
//           //     }              
//           //   })
//           // }

//           return;
//         }

//         if (thenOnResolve && this.state === PromiseState.Resolved) {
//           const newResult = thenOnResolve(this.result);
//           resolve(newResult);
//         }

//       })
//     }

// 	// catch = (catchCallback) => {
// 	// 	return this.then(undefined, catchCallback || (x => x));
// 	// }
// }

// write to window to use it in test file
// window['MyPromise'] = MyPromise;

// const promise = new MyPromise((resolve, reject) => {
//   resolve(1);
// });

// promise.then(res => console.log(res)).then(lol => console.log(lol));
