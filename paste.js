function removeStyleLess(obj) {
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      removeStyleLess(obj[prop]);
    } else if (prop === "styleLess" || prop === "style" || prop === "styles") {
      delete obj[prop];
    }
  }
  return obj;
}

function removeStyleProperties(obj) {
  for (const key in obj) {
    if (key === "style" || key === "styles") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeStyleProperties(obj[key]);
    }
  }
  return obj;
}

const onx = function () {
  document.addEventListener("paste", function (event) {
    event.preventDefault();
    let pastedText = (event.clipboardData || window.clipboardData)
      .getData("text")
   
    const jsonObject = JSON.parse(pastedText);
    const removeInObject = removeStyleLess(jsonObject);
    const updatedText = removeStyleProperties(removeInObject);
    event.target.value = JSON.stringify(updatedText);
  });
};
onx();
