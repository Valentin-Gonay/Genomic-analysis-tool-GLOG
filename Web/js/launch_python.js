

async function launch_test_py_node(){
  const result = await fetch("http://localhost:8080/launch_py", {
    method:"POST",
   });
  const test = await result.json();
}

async function launch_init(){
  const result = await fetch("http://localhost:8080/init_py", {
    method:"POST",
   });
  const test = await result.json();
  if (!test.dataToSend){
    displayerror()
    throw new Error("Blast not find, server may not correctly instaled")
  }
}


async function write_py_node(main){
  const result = await fetch("http://localhost:8080/write_py", {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      title: main.current_user.current_project.inputsequence.ID,
      data: main.current_user.current_project.inputsequence.Sequence
    })
   });

  const test = await result.json();

}

