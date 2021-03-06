/*  
    12/12/2021

    Quentin CAPUZET
    Loïc PERON
    Valentin GONAY
    Gregory BORDIER
    Thomas BAUDEAU
    Elie BORDRON

    JS file for initialising main class

    version 1.0.0 
    
*/


const Udef = [new User('defaut')]
const main = new Main(Udef, Udef[0]);
launch_init()
main.loadbd();
const btninput = document.getElementById('getval')
const Loadinput = (e) => {
    let val = accept_imput()
    try{
    if (val[0]){
        loadStart("Loading inputs...");
        if(val[1]==2){
            main.loadinput();
            write_py_node(main);
            launch_test_py_node().then(loadresu(main)).then(loadEnd()).then(loadEnd_witness())
        }
        if(val[1]==1){
            main.add_empty_result()
            let project=main.current_user.current_project
            let resultat=project.resultat
            loadresufrominput(project,resultat).then(loadEnd()).then(loadEnd_witness())
        }
    }
    }
    catch(e){
        loadEnd();
        displayerror();
    }
}

btninput.addEventListener('click', Loadinput,false)


document.getElementById('menu_graph').addEventListener('click',function() {
    if (!main.current_user.current_project.resultat.alignments) {
        displayerror();
        return
    }
    else if (main.current_user.current_project.resultat.alignments.length ==0){
        displayerror();
        return
    }
    document.getElementById("input_window").style.display = 'none';
    document.getElementById("sequence_window").style.display = 'none';
    document.getElementById("graph_window").style.display = 'flex';
    document.getElementById("start_bot").className = "animation start-graph";
    clean_child_list("bouton_deroulant");
    createDropdownMenu(main);
});

document.getElementById('menu_sequence').addEventListener('click',function(){
    if(!main.current_user.current_project.resultat.alignments){
        displayerror();
        return
    }
    else if (main.current_user.current_project.resultat.alignments.length == 0) {
        displayerror();
        return
    }
    document.getElementById("input_window").style.display = 'none';
    document.getElementById("sequence_window").style.display = 'flex';
    document.getElementById("graph_window").style.display = 'none';
    document.getElementById("start_bot").className = "animation start-sequence";
    clean_child_list("dropdown-alignment");
    creat_list_align(main);
});

async function loadresu(main){
   const align= await (main.creat_resultat())
   return align
}

async function loadresufrominput(project,resultat){
    let text= await (get_resultat()).then(console.log())
    resultat.parser_res(text,resultat.alignments,project.inputsequence,project.sequences);
 }