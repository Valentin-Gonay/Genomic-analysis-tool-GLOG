/* 
Thomas Baudeau / Gregory Bordier / Valentin Gonay / JACQUES Patrick
loading.js : fonctions de chargement et blockage des bouttons
July 9 2021
Version 1.5.0
*/

function loadStart(function_name){
    //toggle loading bar
    document.querySelector('#download_symbol').style.display = 'block';
    //loading div projet.html
    if(document.querySelector('#loading_div') !== null){
        document.querySelector('#loading_div').style.display = 'block';
    }
    //display loading message
    document.getElementById('loading_message').innerHTML = function_name;
}
    
function loadEnd(){
    //hide loading bar
    document.querySelector('#download_symbol').style.display = 'none';
    //loading div projet.html
    if(document.querySelector('#loading_div') !== null){
        document.querySelector('#loading_div').style.display = 'none';
    }
    //hide loading message
    document.getElementById('loading_message').innerHTML = "";
}

function loadEnd_witness(){
    //display loading success
    document.querySelector('#end-loading_div').style.display = 'block';
    //hide loading success after 2000ms
    setTimeout(function(){
        document.querySelector('#end-loading_div').style.display = 'none';
    },2000)
}


function displayerror(){
    document.querySelector('#loading_div_error').style.display = 'block';
    setTimeout(function () {
        document.querySelector('#loading_div_error').style.display = 'none';
    }, 2000)
}


//---------------------------- fonction MORPHOTOOL PEUT ETRE A DEGAGER AVANT LA FIN ------------------------------
// Verification du chargement de la matrice
function dies_verification(check_bool){
    //si loading check = false, erreur apparait
    if(check_bool === 'false'){
        displayerror()
    }
}

function blocking_buttons(){
    $(':button').prop('disabled', true);
    $('input').prop('disabled', true);
}

function activating_buttons(){
    $(':button').prop('disabled', false);
    $('input').prop('disabled', false);
}