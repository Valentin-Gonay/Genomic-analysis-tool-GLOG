function getInputValue() {
    // Selecting the input element and get its value
    let inputVal = document.getElementById("seq").value;
    return(inputVal);
  }
  
  function editValue(value){
      const return_val = "The value is : " + (value);
      return(return_val);
      // return value
  }
  
  function test(){
      console.log("hello world");
  }
  
  function displayValue(value){
      val = getInputValue();
      val = editValue(val);
      // Displaying the value
      console.log(val);
  }