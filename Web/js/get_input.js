function getTextFromInput() {
  // Selecting the input element and get its value
  let inputVal = document.getElementById("seq").value;
  return(inputVal);
}

function updateSequences(){
	//extracts sequences from fasta, then returns them as
	text = getTextFromInput();
	// function(text){
			let txt=text.split('>').filter(e=>e)
			txt=txt.map(e=>{
					e='>'+e;
					return [e.substring(0, e.indexOf('\n')), e.substring(e.indexOf('\n'),e.length)]
			})
			let sequence=txt.map((e)=>{
				var seq = e[1].trim();
				var ID = e[0];
				return new Sequence(seq,ID)
			})
			return sequence[0];
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
