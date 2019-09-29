"use strict";
async function myFunction(){
    let address = document.getElementById("add").value;
    let msg = document.getElementById("msg").value;
    let patt = /^T/;
    let patt1 = /\W/;
    let patt2 = /\w{40,}/;
    let DOMError = document.getElementById("error");
    let DOMAddError = document.getElementById("addError");
    let DOMSucc = document.getElementById("succ");
    let DOMTimeError = document.getElementById("timeError");
    // TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J
    // http://localhost:3000/faucet?add=TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J&msg=Soy%20la%20Puta%20ley
    if (patt.test(address) && patt2.test(address)){
        if(patt1.test(address)){
            DOMSucc.hidden = true;
            DOMError.hidden = true;
            DOMTimeError.hidden = true;
            DOMAddError.hidden = false;
        }else{
            msg = encodeURIComponent(msg.trim());
            let uri = `http://localhost:3000/faucet?add=${address}&msg=${msg}`;
            fetch(uri)
            .then(response => response.json())
            .then(jsonObj => {
                alert(JSON.stringify(jsonObj));
                if(jsonObj.error){
                    DOMSucc.hidden = true;
                    DOMAddError.hidden = true;
                    DOMError.hidden = true;
                    DOMTimeError.hidden = true;
                    let DOMErrorCode = document.getElementById("errorCode");
                    let DOMErrorMsg = document.getElementById("erroMsg");
                    DOMErrorCode.innerText = jsonObj.error["data"].error;
                    DOMErrorMsg.innerText = jsonObj.error["data"].message;
                    DOMError.hidden = false;
                }else{
                    if(jsonObj.errorTime){
                        DOMSucc.hidden = true;
                        DOMAddError.hidden = true;
                        DOMError.hidden = true;
                        DOMTimeError.hidden = true;
                        let DOMTimeMsg = document.getElementById("timeMsg");
                        DOMTimeMsg.innerText = jsonObj.errorTime;
                        DOMTimeError.hidden = false;
                    }else{
                        DOMSucc.hidden = true;
                        DOMAddError.hidden = true;
                        DOMError.hidden = true;
                        DOMTimeError.hidden = true;   
                        let DOMAmount = document.getElementById("amount");
                        let DOMToAdd = document.getElementById("toadd");
                        DOMAmount.innerText = jsonObj.amount;
                        DOMToAdd.innerText = jsonObj.recipient;
                        DOMSucc.hidden = false;
                    }
                }
            });
        }
    }else{
        alert("Invalid address 2");
        DOMSucc.hidden = true;
        DOMError.hidden = true;
        DOMTimeError.hidden = true;
        DOMAddError.hidden = false;
    }
}