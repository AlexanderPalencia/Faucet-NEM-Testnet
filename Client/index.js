"use strict";
alert("hola2");

async function myFunction(){
    let address = document.getElementById("add").value;
    let patt = /^T/;
    let patt1 = /\W/;
    let patt2 = /\w{40,}/;
    alert(patt2.test(address));
    // TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J
    if (patt.test(address) && patt2.test(address)){
        if(patt1.test(address)){
            alert("Invalid address");
        }else{
            alert("Direccion valida");
        }
    }else{
        alert("Invalid address")
    }
    let uri = "http://localhost:3000/";

    fetch(uri)
    .then(response => response.text())
    .then(commits => alert(commits));



}