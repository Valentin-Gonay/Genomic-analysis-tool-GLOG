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
loadresu(main).then(console.log('ok'))
btninput.addEventListener('click', Loadinput,false)


document.getElementById('menu_graph').addEventListener('click',function() {
    clean_child_list("bouton_deroulant");
    createDropdownMenu(main);
});

document.getElementById('menu_sequence').addEventListener('click',function(){
    clean_child_list("dropdown-alignment");
    creat_list_align(main);
});

async function loadresu(main){
   const align= await (main.creat_resultat())
   return align
}