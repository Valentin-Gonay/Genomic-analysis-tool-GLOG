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


const app =  express ();
app.use(express.json())


app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
app.use(express.static(__dirname))

let run_py = new Promise(function(success,nosuccess){
    const {spawn} = require('child_process');
    const python = spawn('python', [`${__dirname}/Python/make_bdblast.py`]);
    
    python.stdout.on('data', function (data) {
        success(data);
    });

    python.stderr.on('data', (data) => {
        nosuccess(data);
    });
});

app.get("/launch_py", async (req, res) => {
    
    res.write("test_coucou_bg")

    run_py.then(function(fromRun_py){
        console.log(fromRun_py.toString());
        res.send(fromRun_py);
    });
});

app.listen(8080, () => console.log("Web server is listening... on port 8080"));

//-----------------------------------------------------------------------------------//



 
    









   




