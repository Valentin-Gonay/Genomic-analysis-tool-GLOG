const Udef = [new User('defaut')]
const main = new Main(Udef, Udef[0]);
launch_init()
main.loadbd();

const btninput = document.getElementById('getval')
const Loadinput = (e) => {
    if (test_input()){
        main.loadinput();
        write_py_node(main);
        launch_test_py_node();
    }
}
btninput.addEventListener('click', Loadinput,false)


document.getElementById('menu_graph').addEventListener('click',function() {
    createDropdownMenu(main);
  
    document.getElementById("input_window").style.display =  'none';
    document.getElementById("sequence_window").style.display =  'none';
    document.getElementById("graph_window").style.display =  'flex';
  
    document.getElementById("start_bot").className = "animation start-graph";
  });
