function getTextFromInput() {
  // Selecting the input element and get its value
  let inputVal = document.getElementById("seq").value;
  return(inputVal);
}

function updateSequences(){
	//extracts sequences from fasta, then returns them as
	let	text = getTextFromInput();
	// function(text){
		let txt=text.split('>').filter(e=>e)
		txt=txt.map(e=>{
			e='>'+e;
			return [e.substring(0, e.indexOf('\n')), e.substring(e.indexOf('\n'),e.length)]
		})
			var seq = txt[0][1];
			var ID = txt[0][0];
			return new Sequence(seq,ID)
	// }

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

const test_input=()=>{
	text = getTextFromInput();
	return text.indexOf('>')==0
}
