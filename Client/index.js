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
        let DOMAddError = document.getElementById("addError");
        if(patt1.test(address)){
            alert("Invalid address");
            DOMAddError.hidden = false;
        }else{
            msg = encodeURIComponent(msg.trim());
            let uri = `http://localhost:3000/faucet?add=${address}&msg=${msg}`;
            fetch(uri)
            .then(response => response.json())
            .then(jsonObj => {
                let DOMError = document.getElementById("error");
                let DOMSucc = document.getElementById("succ");
                let DOMTimeError = document.getElementById("timeError");
                alert(JSON.stringify(jsonObj));
                if(jsonObj.error){
                    DOMSucc.hidden = true;
                    DOMAddError.hidden = true;
                    let DOMErrorCode = document.getElementById("errorCode");
                    let DOMErrorMsg = document.getElementById("erroMsg");
                    DOMErrorCode.innerText = jsonObj.error["data"].error;
                    DOMErrorMsg.innerText = jsonObj.error["data"].message;
                    DOMError.hidden = false;
                }else{
                    DOMError.hidden = true;
                    DOMAddError.hidden = true;
                    let DOMAmount = document.getElementById("amount");
                    let DOMToAdd = document.getElementById("toadd");
                    DOMAmount.innerText = jsonObj.amount;
                    DOMToAdd.innerText = jsonObj.recipient;
                    DOMSucc.hidden = false;
                    if(jsonObj.errorTime){
                        DOMSucc.hidden = true;
                        DOMAddError.hidden = true;
                        DOMError.hidden = true;
                        let DOMTimeMsg = document.getElementById("timeMsg");
                        DOMTimeMsg.innerText = jsonObj.errorTime;
                        DOMTimeError.hidden = false;
                    }else{
                        DOMSucc.hidden = true;
                        DOMAddError.hidden = true;
                        DOMError.hidden = true;
                        DOMTimeError.hidden = true;
                    }
                }
            });
        }
    }else{
        alert("Invalid address");
        let DOMAddError = document.getElementById("addError");
        DOMAddError.hidden = false;
    }
}