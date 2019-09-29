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
  let invalid = false;
  let first = true;
  let randomAmount = Math.floor((Math.random() * 20) + 1);
  console.log("Array length",ArrayAddress.length);
  if(ArrayAddress.length != 0){
    ArrayAddress.forEach((currentValue, index, array)=>{
      if(currentValue.add == address){
        first = true;
        let Now = Date.now();
        console.log("Now timestampt ", Now, " Transaction Timestamp ", currentValue.time, " must pass at least ", currentValue.time + 300000);
        if(Now < currentValue.time + 300000){
          let objerror = {errorTime: "Can't make another transaction has to pass an hour"};
          console.log('Invalidate for time',objerror);
          invalid = true;
          // res.send(JSON.stringify(objerror));
          // res.end();
        }else{
          console.log('Borrando');
          ArrayAddress.splice(index,1);
        }
      }else{
        let objAdd = {add: address, time: Date.now()};
        ArrayAddress.push(objAdd);
      }
    });
  }else{
    console.log("First element in array"); 
    let objAdd = {add: address, time: Date.now()};
    ArrayAddress.push(objAdd);
    first = false;
  }

  if(invalid){
    let objerror = {errorTime: "Can't make another transaction has to pass 5 min"};
    res.send(JSON.stringify(objerror));
  }else{
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
        if(first){
          let objAdd = {add: address, time: Date.now()};
          ArrayAddress.push(objAdd);
        }
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
  }
});

app.listen(process.env.port, function () {
  console.log('Server app listening');
});
