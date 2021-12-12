/*  
    12/12/2021

    Quentin CAPUZET
    Loïc PERON
    Valentin GONAY
    Gregory BORDIER
    Thomas BAUDEAU
    Elie BORDRON

    JS file for formating sequences alignments and display

    version 1.0.0 
    
*/


function creat_list_align(main){
    let alignments = main.current_user.current_project.resultat.alignments;
    let div = document.getElementById('dropdown-alignment');
    for (let alignment of alignments){
        let fct = 'display_align_html(main,\'' + alignment.sequence_2.ID.substring(1,24) +  '\')';
        let button = document.createElement('a');
        button.setAttribute('onclick', fct);
        button.textContent = alignment.sequence_Q.ID.substring(1,24) + ' - ' + alignment.sequence_2.ID.substring(1,24);
        div.appendChild(button);
    }
}

function display_align_html(main,id){
    //ajout au html
    let alignments = main.current_user.current_project.resultat.alignments;
    const alignement_window = document.getElementById('sequence_window_text'); 
    loadStart('Displaying alignment...');

    for(let alignment of alignments){
        if(alignment.sequence_2.ID.substring(1,24) == id){
            alignement_window.innerHTML= alignment.alignment_display.toString().replaceAll(',','<br>');
            document.getElementById('dropdown_align').innerHTML = alignment.sequence_Q.ID.substring(1,24) + ' - ' + alignment.sequence_2.ID.substring(1,24);
        }
    }
   

    loadEnd();
    loadEnd_witness();
}

function clean_child_list(id){
    let div = document.getElementById(id);
    while (div.firstChild){
        div.removeChild(div.lastChild);
    }
}