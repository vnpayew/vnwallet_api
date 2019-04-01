'use strict';

/*=============================================
=            Modules & Global Variables       =
=============================================*/

/**_Start_Require Global Modules */
const ethTx = require('ethereumjs-tx');
const log4js = require('log4js');
const ethUtils = require('ethereumjs-util');
const fs = require('fs');
const Web3 = require('web3');   // if error run: npm web3@0.20.6
/**_End_Require Global Modules */

/**_Start_Require Utils */
const common = require('../utils/common');
/**_End_Require Utils */

/**_Start_Require Models */
/**_End_Require Models */

/**_Start_Response*/
/**_End_Response*/

/**_Start_Global Variables*/
// const connection = require('../../config/connection');
/**_End_Global Variables*/

/*=====  End of Modules & Global Variables======*/

/*=================================
=            Functional Zone      =
=================================*/

/**
 * [Mint token]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.mint = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.mint');
  loggerError.addContext('apiname', 'VNDWallet.mint');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndWallet.mint.getData(toAddress, amount);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Mint success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Mint has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Burn token]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.burn = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let amount = request.payload.amount;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.burn');
  loggerError.addContext('apiname', 'VNDWallet.burn');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndWallet.burn.getData(amount);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Burn success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Burn has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Self burn token]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.selfBurn = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let amount = request.payload.amount;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.selfBurn');
  loggerError.addContext('apiname', 'VNDWallet.selfBurn');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndWallet.selfBurn.getData(amount);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Self burn success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Self burn has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Transfer ETH base from fromAddress to toAddress, signed by fromAddress]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.transferETH = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = global.vndWallet.amountETH;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.transferETH');
  loggerError.addContext('apiname', 'VNDWallet.transferETH');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: toAddress,
      value: global.web3.toHex(global.web3.toWei(amount, 'ether')),
      data: ''
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Transfer ETH success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Transfer ETH has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Transfer token from fromAddress to toAddress, signed by fromAddress]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.transfer = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.transfer');
  loggerError.addContext('apiname', 'VNDWallet.transfer');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = global.vndWallet.transfer.getData(toAddress, amount, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Transfer success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Transfer has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Refund token from fromAddress to toAddress, signed by masterkey]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.refund = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let fromAddress = request.payload.from_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.refund');
  loggerError.addContext('apiname', 'VNDWallet.refund');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(fromAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = global.vndWallet.refund.getData(fromAddress, toAddress, amount, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Refund success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Refund has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Transfer from address is child of signer address to toAddress, signed by signer address]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.transferFromChild = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let fromAddress = request.payload.from_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.transferFromChild');
  loggerError.addContext('apiname', 'VNDWallet.transferFromChild');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(fromAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = global.vndWallet.transferFromChild.getData(fromAddress, toAddress, amount, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Transfer from child address success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Transfer from child has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Request to pay]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.requestToPay = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let txnTrace = request.payload.txn_trace;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'Revert.requestToPay');
  loggerError.addContext('apiname', 'Revert.requestToPay');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = global.vndReqToPay.requestToPay.getData(toAddress, amount, txnTrace, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDReqToPay,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Request to pay success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Request to pay has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Process request to pay]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.processRequestToPay = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let txnTrace = request.payload.txn_trace;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'Revert.processRequestToPay');
  loggerError.addContext('apiname', 'Revert.processRequestToPay');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = global.vndWallet.transferToPay.getData(toAddress, amount, txnTrace, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Process request to pay success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.data = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Process request to pay has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

// Chua co nghiep vu
/**
 * [Revert]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.revert = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let transType = request.payload.trans_type;
  let transHash = request.payload.trans_hash;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'Revert.requestToPay');
  loggerError.addContext('apiname', 'Revert.requestToPay');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(global.vndReqToPay.url));
    const gasPrice = web3.toHex(web3.eth.gasPrice);
    const vndReqToPayAbi = JSON.parse(fs.readFileSync(global.vndReqToPay.abiFile, 'utf-8'));
    const vndReqToPay = web3.eth.contract(vndReqToPayAbi).at(global.vndReqToPay.address);

    const InputDataDecoder = require('ethereum-input-data-decoder');
    const decoder = new InputDataDecoder(global.vndWallet.abiFile);

    //kiem tra thong tin giao dich goc
    let transInfo = web3.eth.getTransaction(transHash);
    console.log(transInfo.from);
    console.log(transInfo.input);
    console.log('======================================');
    const result = decoder.decodeData(transInfo.input);
    console.log(result);
    console.log('======================================');
    console.log(result.inputs[0].toString(50)) // "5"
    console.log(result.inputs[1].toNumber()) // 55

    if (toAddress != '0x' + result.inputs[0].toString(50)){
      let res = {
        'resCode': '95',
        'resDesc': 'Wrong receiver address with root transaction'
      }
      reply(res);
    }

    if (amount != result.inputs[1].toNumber()){
      let res = {
        'resCode': '94',
        'resDesc': 'Wrong amount with root transaction'
      }
      reply(res);
    }

    let nonce = web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = vndReqToPay.initRevert.getData(toAddress, amount, transType, transHash, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: global.vndRevert.address,
      value: 0x00,
      data: data
    };

    // Transaction is created
    const tx = new ethTx(txParams);

    // Transaction is signed
    tx.sign(signerPrivateKey);
    const rawTx = '0x' + tx.serialize().toString('hex');

    web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        web3.eth.sendRawTransaction(rawTx, function (err, hash) {
          if (err) {
            console.log(err);
            loggerError.error('Revert has error: ' + err.message);

            let res = {
              'resCode': '500',
              'resDesc': 'Internal error'
            }
            reply(res);

          } else {
            console.log(hash);
            loggerInfo.info('Revert success. Hash of transaction: ', hash);

            let res = {
              'resCode': '200',
              'resDesc': 'Success'
            };

            res.data = {
              'transHash': hash
            };

            reply(res);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Revert has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Process revert by Masterkey]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.processRevert = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let fromAddress = request.payload.from_address;
  let toAddress = request.payload.to_address;
  let amount = request.payload.amount;
  let transType = request.payload.trans_type;
  let transHash = request.payload.trans_hash;
  let description = common.undefinedToEmptyString(request.payload.description);

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'Revert.processRequestToPay');
  loggerError.addContext('apiname', 'Revert.processRequestToPay');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toAddress)) {
      let res = {
        'resCode': '96',
        'resDesc': 'Invalid to address'
      }
      reply(res);
      return;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(global.vndWallet.url));
    const gasPrice = web3.toHex(web3.eth.gasPrice);
    const vndWalletAbi = JSON.parse(fs.readFileSync(global.vndWallet.abiFile, 'utf-8'));
    const vndWallet = web3.eth.contract(vndWalletAbi).at(global.vndWallet.address);

    let nonce = web3.eth.getTransactionCount(signerAddress, 'pending');

    let bytes = [];
    for (let i = 0; i < description.length; i++) {
      bytes.push(description.charCodeAt(i).toString(2));
    }

    let data = vndWallet.transferRevert.getData(fromAddress, toAddress, amount, transType, transHash, bytes);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: global.vndWallet.address,
      value: 0x00,
      data: data
    };

    // Transaction is created
    const tx = new ethTx(txParams);

    // Transaction is signed
    tx.sign(signerPrivateKey);
    const rawTx = '0x' + tx.serialize().toString('hex');

    web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        web3.eth.sendRawTransaction(rawTx, function (err, hash) {
          if (err) {
            console.log(err);
            loggerError.error('Process request to pay has error: ' + err.message);

            let res = {
              'resCode': '500',
              'resDesc': 'Internal error'
            }
            reply(res);

          } else {
            console.log(hash);
            loggerInfo.info('Process request to pay success. Hash of transaction: ', hash);

            let res = {
              'resCode': '200',
              'resDesc': 'Success'
            };

            res.data = {
              'transHash': hash
            };

            reply(res);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Process request to pay has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/*=====  End of Functional Zone  ======*/