const fs = require('fs');

const Web3 = require('web3');   // if error run: npm web3@0.20.6
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8502"));

var abiArray = JSON.parse(fs.readFileSync('./config/abi.json', 'utf-8'));
var contractAddress = "0x6edbe9a5389ee8e68be8ed310f8d683772320671";
var contract = web3.eth.contract(abiArray).at(contractAddress);

var events = contract.allEvents();
events.watch(function(error, event){
    if (error) {
        console.log("Error: " + error);
    } else {
        console.log(event);
        //console.log(event.event + ": " + JSON.stringify(event.args));
    }
});