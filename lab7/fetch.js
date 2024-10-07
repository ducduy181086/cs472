"use strict";

async function printData() {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    if (response.ok) {
      const data = await response.json();
      console.log(data.recipes.map(m => m.name));
    }
  }
  catch (e) {
    console.error(e);
  }
}

(async () => {
  await printData();
})()
