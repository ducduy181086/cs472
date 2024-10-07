"use strict";

const isPrime = function (n) {
  return new Promise((resolve, reject) => {
    for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
      if (n % i === 0) {
        reject({ prime: false });
        return;
      }
    }
    resolve({ prime: n > 1 });
  });
}

console.log('start');
isPrime(7)
 .then(console.log)
 .catch(console.error);
console.log('end');

console.log('start 9');
(async () => {
  try {
    const result = await isPrime(9);
    console.log(result);
  }
  catch (e) {
    console.error(e);
  }
})();
console.log('end 9');
