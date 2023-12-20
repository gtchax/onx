/* -----------------
 Date - 20 Dec 2023

  Utility functions
    1. remove removeStyleLess - removes styleless property in objects recursively
    2. removeStyleProperties - removes style properties  in an array recursively
  
*/

function removeStyleLess(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      removeStyleLess(obj[prop]);
    } else if (prop === "styleLess" || prop === "style") {
      delete obj[prop];
    }
  }
  return obj;
}

function removeStyleProperties(obj) {
  for (const key in obj) {
    if (key === "style") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeStyleProperties(obj[key]);
    }
  }
  return obj;
}

const init = function () {
  document.addEventListener("paste", function (event) {
    event.preventDefault();

    let pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    ).setData('');
    const jsonObject = JSON.parse(pastedText);
    const removeInObject = removeStyleLess(jsonObject);
    const updatedText = removeStyleProperties(removeInObject);
    event.target.value = updatedText;
  });
};
init();
