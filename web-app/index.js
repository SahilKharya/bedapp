
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
    // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));

    window.web3 = new Web3(ethereum);
    try {
      // ask user for permission
      await ethereum.enable();
      console.log(ethereum)

      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log('user rejected permission');
    }
  }
  // Old web3 provider
  else if (window.web3) {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }


  //Fetch Ethereum Price 
  var priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';
  fetch(priceURL).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    var eth_inr = data.ethereum.inr;
    document.getElementById("eth_inr").innerHTML =eth_inr;
  }).catch(err => {
    console.log(err);
    // Do something for an error here
  });
});
console.log(window.web3)
let contractAddress = "0x11De606817a302A0031B41eDc4Eb636930dBD204"



var contractAbi = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "hospitals", "outputs": [{ "name": "name", "type": "string" }, { "name": "city", "type": "string" }, { "name": "noOfBeds", "type": "uint256" }, { "name": "isPrivate", "type": "bool" }, { "name": "bedPrice", "type": "uint256" }, { "name": "bedAvailable", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "bookedBeds", "outputs": [{ "name": "bedId", "type": "uint256" }, { "name": "hospitalId", "type": "uint256" }, { "name": "name", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "hospitalId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "city", "type": "string" }, { "indexed": false, "name": "noOfBeds", "type": "uint256" }, { "indexed": false, "name": "isPrivate", "type": "bool" }], "name": "NewHospital", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "bedId", "type": "uint256" }], "name": "NewBedBooking", "type": "event" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_city", "type": "string" }, { "name": "_noOfBeds", "type": "uint256" }, { "name": "_isPrivate", "type": "bool" }, { "name": "_bedPrice", "type": "uint256" }], "name": "_addHospital", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_hospitalId", "type": "uint256" }], "name": "_bookOneBed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_hospitalId", "type": "uint256" }, { "name": "_bedId", "type": "uint256" }], "name": "_freeBed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]);

// let contract = web3.eth.contract(abi, contractAddress);
var contract = contractAbi.at(contractAddress);

// contractAddress and abi are setted after contract deploy
// var contractAddress = '0x11De606817a302A0031B41eDc4Eb636930dBD204';
// var abi2 = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );
//contract instance
// contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
  info = $("#newInfo").val();
  contract.methods.setInfo(info).send({ from: account }).then(function (tx) {
    console.log("Transaction: ", tx);
  });
  $("#newInfo").val('');
}

function getHospitalInfo() {
  // contract.hospitals[0].call({}, function (error, result) {
  //   if (!error)
  //     console.log(result);
  //   else
  //     console.log(error.code)
  // })
  hospitalID = document.getElementById('hospitalID').value;

  contract.hospitalInfo.call(hospitalID, function (err, result) {
    // if (!err) {
    //   alert(result)
    // }
    if (!err)
      console.log(result);
    else
      console.log(err.code)
  });
  // contract.MY_READ_ONLY_METHOD().call({}).then((res) => {
  //   console.log(res)
  // }).catch((e, r) => {
  //   console.log(JSON.stringify(e, Object.getOwnPropertyNames(e)))
  // })

}
function addHospitalInfo() {
  name = document.getElementById('name').value;
  city = document.getElementById('city').value;
  beds = document.getElementById('beds').value;
  gov = document.getElementById('gov').value;
  price = document.getElementById('price').value;

  contract._addHospital.sendTransaction(name, city, beds, gov, price, {
    from: account,
    gas: 100000
  }, function (error, result) {
    if (!error)
      console.log(result);
    else
      console.log(error.code)
  })
}

function bookBed() {
  bookBedID = document.getElementById('bookBedID').value;
  contract._addHospital.sendTransaction(bookBedID, {
    from: account,
    gas: 100000
  }, function (error, result) {
    if (!error)
      console.log(result);
    else
      console.log(error.code)
  })
}