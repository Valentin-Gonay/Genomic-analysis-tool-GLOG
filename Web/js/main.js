const Udef = [new User('defaut')]
const main = new Main(Udef, Udef[0]);
launch_init()
main.loadbd();
const btninput = document.getElementById('getval')
const Loadinput = (e) => {
    let val = accept_imput()
    try{
    if (val[0]){
        console.log('ok')
        if(val[1]==2){
            console.log('ok2')
            main.loadinput();
            write_py_node(main);
            launch_test_py_node();
            loadresu(main).then(console.log('Parsing complet'))
        }
        if(val[1]==1){
            console.log('ok1')
            
            main.add_empty_result()
            let project=main.current_user.current_project
            let resultat=project.resultat
            loadresufrominput(project,resultat).then(console.log('Parsing complet'))
            
           
        }
    }
    }
    catch(e){
        console.log('afficher un message d"erreur',e)
    }
    finally{
        console.log('...')
    }
}

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

async function loadresufrominput(project,resultat){
    let text= await (get_resultat()).then(console.log('ok'))
    resultat.parser_res(text,resultat.alignments,project.inputsequence,project.sequences)
 }