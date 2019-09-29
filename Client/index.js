"use strict";
alert("hola2");

async function myFunction(){
    let address = document.getElementById("add").value;
    let msg = document.getElementById("msg").value;
    let patt = /^T/;
    let patt1 = /\W/;
    let patt2 = /\w{40,}/;
    // TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J
    // http://localhost:3000/faucet?add=TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J&msg=Soy%20la%20Puta%20ley
    if (patt.test(address) && patt2.test(address)){
        if(patt1.test(address)){
            alert("Invalid address");
        }else{
            alert("Direccion valida");
        }
    }else{
        alert("Invalid address")
    }
    msg = encodeURIComponent(msg.trim());
    let uri = `http://localhost:3000/faucet?add=${address}&msg=${msg}`;
    alert(uri);

    fetch(uri)
    .then(response => response.json())
    .then(jsonObj => alert(jsonObj.recipient));



}