async function launch_test_py_node(){
  const result = await fetch("http://localhost:8080/launch_py");

  console.log(result);
}