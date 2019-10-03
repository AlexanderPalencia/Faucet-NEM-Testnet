# Faucet-NEM-Testnet
Faucet web application for NEM testnet, local test and web deployment-hosting proyect.

## Built With
### Client
* HTML - The web framework used
* JavaScript
* Css3

### API
* [NodeJS](https://nodejs.org/) - JavaScript runtime environment
    * [Express](https://expressjs.com) - API
    * [Cors](https://github.com/expressjs/cors) - Cors
    * [NEM-SDK](https://github.com/QuantumMechanics/NEM-sdk) - Interact with NEM Blockchain
    * [dotenv](https://www.npmjs.com/package/dotenv) - Enviroment variables
    * For Deployment with firebase install SDK [firebase-admin](https://firebase.google.com/docs/admin/setup?hl=es-419) 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes this will use the API-Local folder and Client folder. See API-Firebase to deployment in firebase functions.

### Prerequisites
Have an account in NEM-Wallet.
For local purpose you will need to install NodeJS and NPM.
For Deploying-Hosting purpose you will need to have a firebase account with [blaze](https://firebase.google.com/pricing/?hl=es-419) plan.

### Installing

A step by step series of examples that tell you how to get a development env running locally for deployin and hostin in firebase function see [here](https://github.com/AlexanderPalencia/Faucet-NEM-Testnet/tree/master/API-Firebase).

First clone or fork this repository.
Second navigate to the folder
```
cd Faucet-NEM-Testnet
```
Install dependencies.
```
npm install
```
This will install the following dependecies:
* express
* cors
* nem-sdk
* dotenv
* firebase

Third create config.env file for more security and fill with your private key of the wallet and port like this:
```
PK=PrivateKeyWallet
port=#
```
Fourth navigate to API-Local and run index.js
```
cd API-Local
node index.js
```
fifth navigate to Client and open index.html in your browser.
```
cd Client
index.html
```
For Deploy-hosting in firebase see [here](https://github.com/AlexanderPalencia/Faucet-NEM-Testnet/tree/master/API-Firebase).

## Supported features and usability
* XEM can be ordered every 5 min (for testing you can change this easily).
* XEM are send randomly between 1 or 20 XEM every transaction.
* Both Application (Client and API) handle errors these can be seen in the client and in the console of your API.
* 
