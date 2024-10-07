"use strict";

function Meditation(count) {
  this.count = count;
}

Meditation.prototype.start = function () {
  let countPointer = this.count;
  const timerId = setInterval(() => {
    if (countPointer > 0) {
      console.log(countPointer--);
    } else {
      console.log("Jay Guru Dev");
      clearInterval(timerId);
    }
  }, 1000);
}

const morning_meditation = new Meditation(5);
morning_meditation.start();
console.log(`Start meditation`);
