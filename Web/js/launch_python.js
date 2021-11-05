async function launch_test_py_node(){
  const result = await fetch("http://localhost:8080/launch_py", {
    method:"POST",
   });

  console.log(result);
  const test = await result.json();
  console.log(test);
}