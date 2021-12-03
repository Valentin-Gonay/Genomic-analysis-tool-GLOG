

async function launch_test_py_node(){
  const result = await fetch("http://localhost:8080/launch_py", {
    method:"POST",
   });

  console.log(result);
  const test = await result.json();
  console.log(test);
}

async function launch_init(){
  const result = await fetch("http://localhost:8080/init_py", {
    method:"POST",
   });

  console.log(result);
  const test = await result.json();
  console.log(test);
}


async function write_py_node(main){
  const result = await fetch("http://localhost:8080/write_py", {
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      title: main.CurrentProject.inputsequence.ID,
      data: main.CurrentProject.inputsequence.Sequence
    })
   });
  console.log(main.CurrentProject.inputsequence.ID)
  console.log(main.CurrentProject.inputsequence.Sequence)
  console.log(result);
  const test = await result.json();
  console.log(test);
}

launch_init()