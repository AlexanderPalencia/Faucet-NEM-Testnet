const functions = require('firebase-functions');
var admin = require("firebase-admin");
var serviceAccount = require("./faucet-api-nem-firebase-adminsdk-t1uyi-b59124aef4.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://faucet-api-nem.firebaseio.com"
});
var express = require('express');
require('dotenv').config({path: './config.env'});
var cors = require('cors')
let nem = require("nem-sdk").default;
var app = express();

app.use(cors());

//http://localhost:5000/faucet-api-nem/us-central1/app/faucet?add=TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J&msg=Soy%20la%20ley%20alexpalencia
// faucet?add=TBRN3RHVYI4JKOUD5BQAN5XQOYRK6PJTDCFL3R7J&msg=Soy%20la%20Puta%20ley
   

app.get('/faucet', function (req, res) {
    let address = req.query.add;
    let msg = req.query.msg;
    let randomAmount = Math.floor((Math.random() * 20) + 1);
    if(address == null || address == ""){
      console.log("Invalid adrres");
      res.send({
        "error":{
          "data":{
            "erro": "Invalid address",
            "message": "Empty address"
          }
        }
      });
    }else{
      console.log("direccion no vacia", address);
      admin.database().ref('Addrees/'+address).once('value').then((snapshot)=>{
          let dbValue = snapshot.val();
          console.log('Value in db ', dbValue);
          if(dbValue != null){
              console.log('Value found');
              let Now = Date.now();
              console.log("Now timestampt ", Now, " Transaction Timestamp ", dbValue.time, " must pass at least ", dbValue.time + 300000);
              if(Now < dbValue.time + 300000){
                  console.log('Invalidate for time');
                  let objerror = {errorTime: "Can't make another transaction has to pass 5 min"};
                  res.send(JSON.stringify(objerror));
              }else{
                  console.log('Update Timestamp');
                  let objAdd = {time: Date.now()};
                  admin.database().ref('Addrees/'+address).update(objAdd).then(()=>{
                      
                      // Transfer XEM
                      let endpoint  = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
                      let objCommon = nem.model.objects.create("common")("", process.env.PK);
                      // Params(addressRecipient, amount, Message)
                      let transferTransaction = nem.model.objects.create("transferTransaction")(address, randomAmount, msg);
                      let prepare = nem.model.transactions.prepare("transferTransaction")(objCommon, transferTransaction, nem.model.network.data.testnet.id);
                      
                      nem.com.requests.chain.time(endpoint).then((timeStamp) => {
                        const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
                        prepare.timeStamp = ts;
                        const due = 60;
                        prepare.deadline = ts + due * 60;
                        // sendParams(commonObj, prepareObj, endpointObj)
                        nem.model.transactions.send(objCommon, prepare, endpoint).then((resTran)=>{
                          console.log("Success transaction");
                          res.send(transferTransaction);
                        },(err)=>{
                            let errobj = {error: err};
                            console.log('ERROR ');
                            res.send(JSON.stringify(errobj));
                        });
                      }, (err)=>{
                        let errobj = {error: err};
                        console.log('ERROR timestampt');
                        res.send(JSON.stringify(errobj));
                      });  
                      
                  }).catch((err) =>{
                    res.send({
                      "error":{
                        "data":{
                          "erro": "update Error",
                          "message": "Firebase error"
                        }
                    }
                    });
                    
                  });
              }
          }else{
              admin.database().ref('Addrees/' + address).set({
                  time: Date.now()
              }).then(()=>{
                      
                  // Transfer XEM
                  let endpoint  = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
                  let objCommon = nem.model.objects.create("common")("", process.env.PK);
                  // Params(addressRecipient, amount, Message)
                  let transferTransaction = nem.model.objects.create("transferTransaction")(address, randomAmount, msg);
                  let prepare = nem.model.transactions.prepare("transferTransaction")(objCommon, transferTransaction, nem.model.network.data.testnet.id);
                  
                  nem.com.requests.chain.time(endpoint).then((timeStamp) => {
                    const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
                    prepare.timeStamp = ts;
                    const due = 60;
                    prepare.deadline = ts + due * 60;
                    // sendParams(commonObj, prepareObj, endpointObj)
                    nem.model.transactions.send(objCommon, prepare, endpoint).then((resTran)=>{
                      console.log("Success transaction");
                      res.send(transferTransaction);
                    },(err)=>{
                        let errobj = {error: err};
                        console.log('ERROR ');
                        res.send(JSON.stringify(errobj));
                    });
                  }, (err)=>{
                    let errobj = {error: err};
                    console.log('ERROR timestampt');
                    res.send(JSON.stringify(errobj));
                  }); 

              }).catch((err)=>{
                console.log('Insertion error', err);
                res.send({
                  "error":{
                    "data":{
                      "erro": "Insertion Error",
                      "message": "Firebase error"
                    }
                }
                });
              });
          }
      }).catch((err)=>{
          console.log("erro", err);
      });
    }
});

app.get('/ping', (req, res)=>{
    console.log("ping");
    res.send("Server is alive");
});

app.get('/dbread', (req, res)=>{
    admin.database().ref('Addrees/').once('value').then((snapshot)=>{
        console.log("Database all");
        res.send(snapshot.val());
    });
});

app.listen(process.env.port, function () {
    console.log('Server app listening on ', process.env.port);
  });
  
exports.app = functions.https.onRequest(app);
