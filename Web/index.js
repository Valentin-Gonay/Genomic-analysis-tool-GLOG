// 25/10/2021

//  Quentin CAPUZET
//  Loïc PERON
//  Valentin GONAY
//  Gregory BORDIER
//  Thomas BAUDEAU
//  Elie BORDRON

//  version 0.1.0


const fs = require('fs');
const express = require("express");
const {spawn} = require('child_process');
const os =require('os')
const favicon = require('serve-favicon')


const app =  express ();

app.use(express.json())


app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.use(express.static(__dirname))
app.use(favicon(`${__dirname}/favicon.ico`));
app.listen(8080, () => console.log("Web server is listening... on port 8080"));

let current_os=os.type()
let current_python='python'
let PATH = ''
let shell = 'True'
pythontype()

app.post("/launch_py", async (req, res) => {
    var dataToSend;
  
    const python = spawn(current_python, [`${__dirname}/Python/blast_command.py`,'blastn',PATH, shell]);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });
    
    python.stderr.on('data', function(data) {
        console.error(data.toString());
    });


    python.on('error', function(error) {
        console.log("Error: bad command", error);
    });
  
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log()
        
        // send data to browser
        let response = {
            "dataToSend" : dataToSend,
            "test":"coucou_bg_des_iles",
            "test_2":"test_num_2"
        }
        res.status(200).send(JSON.stringify(response));
    
    });

})

app.post("/init_py", async (req, res) => {
    var dataToSend;
  
    const python = spawn(current_python, [`${__dirname}/Python/blast_command.py`,'init']);
  
    python.stdout.on('data', function (data) {
        console.log('try blast command....');
        dataToSend = data.toString();
    });

    python.stderr.on('data', function(data) {
        console.error(data.toString());
    });

  
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        
        // send data to browser
        let response = {
            "dataToSend" : dataToSend,
            "test":"coucou_bg_des_iles 2",
            "test_2":"test_num_3"
        }
        
        PATH = dataToSend
        res.status(200).send(JSON.stringify(response));
    
    });

})
//-----------------------------------------------------------------------------------//

function pythontype(){
    if(current_os ==="Linux"){
        current_python=current_python+"3"
        shell = 'False'
        return
    }
    else{
        return
    }
}


    
app.post("/write_py", async (req, res) => {
    var dataToSend;
  
    const python = spawn(current_python, [`${__dirname}/Python/blast_command.py`,'input',req.body.title, req.body.data]);
  
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
  
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        
        // send data to browser
        let response = {
            "dataToSend" : 'ok',
            "test":"lol",
        }
        
        res.status(200).send(JSON.stringify(response));
    
    });

})








   




