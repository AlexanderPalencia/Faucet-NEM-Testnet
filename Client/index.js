"use strict";
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
            msg = encodeURIComponent(msg.trim());
            let uri = `http://localhost:3000/faucet?add=${address}&msg=${msg}`;
            fetch(uri)
            .then(response => response.json())
            .then(jsonObj => {
                alert(JSON.stringify(jsonObj.error["data"].error));
                if(jsonObj.error){
                    let DOMError = document.getElementById("error");
                    let DOMErrorCode = document.getElementById("errorCode");
                    let DOMErrorMsg = document.getElementById("erroMsg");
                    DOMErrorCode.innerText = jsonObj.error["data"].error;
                    DOMErrorMsg.innerText = jsonObj.error["data"].message;
                    DOMError.hidden = false;
                    alert("error joven e ");
                }else{  
                    alert("Valid Transaction");
                    let DOMInfo = document.getElementById("info");
                    DOMInfo.innerText = "aqui perro";            
                    DOMInfo.hidden = false;
                }
            });
        }
    }else{
        alert("Invalid address")
    }
}