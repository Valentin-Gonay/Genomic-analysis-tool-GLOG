const Udef = [new User('defaut')]
const main = new Main(Udef, Udef[0]);
launch_init()
main.loadbd();
const btninput = document.getElementById('getval');
const Loadinput = (e) => {
    if (test_input()){
        main.loadinput()
    write_py_node(main)
    launch_test_py_node()
    }
    
};
btninput.addEventListener('click', Loadinput,false)
