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


app.get("/", (req, res) => res.sendFile(`${__dirname}/index_genomic.html`))
app.use(express.static(__dirname))


app.listen(8080, () => console.log("Web server is listening... on port 8080"));

start();

//-----------------------------------------------------------------------------------//
async function start(){
    await connect();
}






 
    









   




