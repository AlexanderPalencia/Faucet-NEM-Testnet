"use strict";
let tableTransac = "";
let tableTransacInit = "";
init();

async function myFunction(){
    let address = document.getElementById("add").value;
    let msg = document.getElementById("msg").value;
    let patt = /^T|^t/;
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
                        setTimeout(init, 180000)
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

function Accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  function init(){
      alert('Hola');
      tableTransac = "<tr></tr><th>ID</th><th>Hash</th><th>Height Block</th></tr<th>";
      let endPoint = `http://hugetestalice.nem.ninja:7890/account/transfers/all?address=TCNTQNAK3SW5A2JU3FO7BBN44TMJK3X77JODMDC3`;
      fetch(endPoint)
      .then(response => response.json())
      .then(jsonObj => {
        console.log('parcear', jsonObj);
        let transactions = jsonObj.data;
        for(var i = 0; i<=10; i++){
            let dataAct = transactions[i].meta;
            tableTransac += 
            `<tr>
                <td>${dataAct['id']}</td>
                <td>${dataAct['hash'].data}</td>
                <td>${dataAct['height']}</td>
            </tr>`;
        }
        document.getElementById("table").innerHTML = tableTransac + tableTransacInit;
        
        // var node = document.createElement("LI");
        // var textnode = document.createTextNode("Water232 safd asd fsa ");
        // node.appendChild(textnode);
        // document.getElementById("myList").appendChild(node);

    });

  }