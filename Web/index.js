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


const app =  express ();
app.use(express.json())


app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.use(express.static(__dirname))

app.listen(8080, () => console.log("Web server is listening... on port 8080"));


app.post("/launch_py", async (req, res) => {
    var dataToSend;
  
    const python = spawn('python', [`${__dirname}/Python/make_bdblast.py`]);
  
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
  
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        
        // send data to browser
        let response = {
            "dataToSend" : dataToSend,
            "test":"coucou_bg_des_iles",
            "test_2":"test_num_2"
        }
        
        res.status(200).send(JSON.stringify(response));
    
    });

})


//-----------------------------------------------------------------------------------//



 
    









   




