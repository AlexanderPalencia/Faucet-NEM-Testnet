var express = require('express');
require('dotenv').config({path: '../config.env'});
var cors = require('cors')
let nem = require("nem-sdk").default;
var app = express();

app.use(cors());

app.get('/', function (req, res) {
  console.log("access to health end-point");
  res.send('API Alex, put a valid end-point');
});

let ArrayAddress = [];
app.get('/faucet', function (req, res) {
  // Queriy Params
  let address = req.query.add;
  let msg = req.query.msg;
  let randomAmount = Math.floor((Math.random() * 20) + 1);
  console.log("Tamano ",ArrayAddress.length);
  if(ArrayAddress.length != 0){
    ArrayAddress.forEach((currentValue, index, array)=>{
      console.log("mierda", index);
      if(currentValue.add == address){
        let Now = Date.now();
        if(Now < currentValue.time + 60000){
          let objerror = {error: "Can't make another transaction has to pass an hour"};
          console.log('Invalidate for time',objerror);
          res.send(JSON.stringify(objerror));
        }else{
          ArrayAddress.splice(index-1,1);
        }
      }else{
        let objAdd = {add: address, time: Date.now()};
        ArrayAddress.push(objAdd);
      }
    });
  }else{
    console.log("Inicio"); 
    let objAdd = {add: address, time: Date.now()};
    ArrayAddress.push(objAdd);
  }

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
    console.log("New TimeStampt",ts);
    // sendParams(commonObj, prepareObj, endpointObj)
    nem.model.transactions.send(objCommon, prepare, endpoint).then((resTran)=>{
      console.log("Success transaction");
      res.send(transferTransaction);
    },(err)=>{
        let errobj = {error: err};
        console.log('ERROR ',errobj);
        res.send(JSON.stringify(errobj));
    });
  }, (err)=>{
    let errobj = {error: err};
    console.log('ERROR ',errobj);
    res.send(JSON.stringify(errobj));
  });
});

app.listen(process.env.port, function () {
  console.log('Example app listening on port 3000!');
});
