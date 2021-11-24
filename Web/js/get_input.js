function getText() {
  // Selecting the input element and get its value
  let inputVal = document.getElementById("seq").value;
  return(inputVal);
}

function displayValue(value){
      val = getText();
      console.log("val: ", val);
}




const pasteText = (txt) => document.querySelector('#seq').innerHTML = txt;


const pasteFileIntoTextArea = (event) => {
  console.log("hello");
  let f = document.querySelector('#avatar').files[0];

  // Read File
  let reader = new FileReader();
  reader.onload = (e) => {
    let text = reader.result;
    pasteText(text);
    let extension = f.name.split('.').pop();
    let model;
  }
  reader.readAsText(f);
};
