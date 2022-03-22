let iAmAlwaysZero = 0;
let iMustBecameThree = 0;

// last catch must be called and output correct data
//
// waiting 1000ms - just chill =)
new MyPromise(res => window.setTimeout(res, 1000))
	// loading react - expect resolve promise
	.myThen(() => {
		iMustBecameThree++;

		const scriptSrc = 'https://unpkg.com/react@17/umd/react.development.js';
		const script = document.createElement('script');
		script.src = scriptSrc;
		document.body.append(script);

		return new Promise((res, rej) => {
			script.onload = res;
			script.onerror = rej;
		});
	})
// 	// loading script with wrong url - expect to throw
	// .myThen(() => {
	// 	iMustBecameThree++;

	// 	const script = document.createElement('script');
	// 	script.src = 'жопа';
	// 	document.body.append(script);

	// 	return new Promise((res, rej) => {
	// 		script.onload = res;
	// 		script.onerror = rej;
	// 	});
	// })
	// expect this NOT to be called
	// .myThen(() => {
	// 	iMustBecameThree++;
	// 	iAmAlwaysZero = 1;
	// })
	// expect this to be called
	// .catch(() => {
	// 	iMustBecameThree++;

	// 	console.log('must be 0 =', iAmAlwaysZero);
	// 	console.log('must be 3 =', iMustBecameThree);
    // });