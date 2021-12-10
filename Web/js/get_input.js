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

const pasteFileIntoTextArea = () => {
  let f = document.querySelector('#avatar').files[0];
  let reader = new FileReader();
  reader.onload = () => {
    let text = reader.result;
    pasteText(text);
  }
  reader.readAsText(f);
};


async function get_resultat() {
  let f = document.querySelector('#import_res_button').files[0];
  var text = await new Promise((resolve)=>{
    let reader = new FileReader();
    reader.onload = (e) => {resolve(reader.result);}
    reader.readAsText(f);
  })
  return text
};

const test_input=()=>{
	text = getTextFromInput();
	return text.indexOf('>')==0
}

function accept_imput(){
  var state = false
  var type =0
  if (document.querySelector('#import_res_button').files[0]){
    state=true
    type =1
  }
  if (test_input()){
    state=true
    type =2
  }
  return[state,type]
  
}

