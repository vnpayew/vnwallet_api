'use strict';

/*=============================================
=            Modules & Global Variables       =
=============================================*/

/**_Start_Require Global Modules */
const log4js = require('log4js');
const ethUtils = require('ethereumjs-util');
const fs = require('fs');
/*=====  End of Modules & Global Variables======*/

/*=================================
=            Functional Zone      =
=================================*/

/**
 * [Send signed transaction]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.sendSignedTransaction = function (request, reply) {
  let rawTx = request.payload.raw_tx;
  let transName = request.payload.trans_name;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.sendSignedTransaction');
  loggerError.addContext('apiname', 'VNDWallet.sendSignedTransaction');

  try {
    global.web3.eth.sendRawTransaction(rawTx, function (err, hash) {
      if (err) {
        console.log(err);
        loggerError.error('Execute ' + transName + ' has error: ' + err.message);

        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);

      } else {
        console.log(hash);
        loggerInfo.info('Execute ' + transName + ' success. Hash of transaction: ', hash);

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
  } catch (err) {
    console.log(err);
    loggerError.error('Execute ' + transName + ' has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Change address of VNDBusiness]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.changeVNDBusiness = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let newAddress = request.payload.new_address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.changeVNDBusiness');
  loggerError.addContext('apiname', 'VNDWallet.changeVNDBusiness');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(newAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid new address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndWallet.changeVNDBusiness.getData(newAddress);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: global.gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        console.log(err);
        loggerError.error('Change address of VNDBusiness has error: ' + err.message);

        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Change address of VNDBusiness success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.payload = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Change address of VNDBusiness has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Change address of VNDRequestToPay]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.changeVNDReqToPay = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let newAddress = request.payload.new_address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.changeVNDRequestToPay');
  loggerError.addContext('apiname', 'VNDWallet.changeVNDRequestToPay');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(newAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid new address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndWallet.changeVNDRequestToPay.getData(newAddress);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: global.gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDWallet,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        console.log(err);
        loggerError.error('Change address of VNDRequestToPay has error: ' + err.message);

        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Change address of VNDRequestToPay success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.payload = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Change address of VNDRequestToPay has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Change master key]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.changeMasterKey = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let fromMasterKey = request.payload.from_master_key;
  let toMasterKey = request.payload.to_master_key;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.changeMasterKey');
  loggerError.addContext('apiname', 'VNDWallet.changeMasterKey');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(fromMasterKey)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address from master key'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(toMasterKey)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address to master key '
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndBusiness.changeMasterKey.getData(fromMasterKey, toMasterKey);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: global.gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, res) {
      if (err) {
        console.log(err);
        loggerError.error('Change master key has error: ' + err.message);

        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Change master key success.');

        let res = {
          'resCode': '200',
          'resDesc': 'Success'
        };

        res.payload = {
          'txParams': txParams
        };

        reply(res);
      }
    });
  } catch (err) {
    console.log(err);
    loggerError.error('Change master key has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Reset web3]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.resetWeb3 = function (request, reply) {
  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.resetConnect');
  loggerError.addContext('apiname', 'VNDWallet.resetConnect');

  try {
    const vndWalletConfig = JSON.parse(fs.readFileSync('../../config/vndWalletConfig.json', 'utf-8'));

    global.web3 = new Web3(new Web3.providers.HttpProvider(vndWalletConfig.urlRPC));
    global.gasPrice = global.web3.toHex(global.web3.eth.gasPrice);
    
    loggerInfo.info('Reset connection success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Reset connection has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Reset VNDWallet Info]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.resetVNDWallet = function (request, reply) {
  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.resetVNDWallet');
  loggerError.addContext('apiname', 'VNDWallet.resetVNDWallet');

  try {
    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    global.vndWalletAbi = JSON.parse(fs.readFileSync(vndConfig.abiFileVNDWallet, 'utf-8'));
    global.vndWallet = global.web3.eth.contract(vndWalletAbi).at(vndConfig.addressVNDWallet);

    loggerInfo.info('Reset VNDWallet success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Reset VNDWallet has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Reset VNDBusiness Info]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.resetVNDBusiness = function (request, reply) {
  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.resetVNDBusiness');
  loggerError.addContext('apiname', 'VNDWallet.resetVNDBusiness');

  try {
    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    global.vndBusinessAbi = JSON.parse(fs.readFileSync(vndConfig.abiFileVNDBusiness, 'utf-8'));
    global.vndBusiness = global.web3.eth.contract(vndBusinessAbi).at(vndConfig.addressVNDBusiness);

    loggerInfo.info('Reset VNDBusiness success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Reset VNDBusiness has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Reset VNDReqToPay Info]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.resetVNDReqToPay = function (request, reply) {
  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.resetVNDReqToPay');
  loggerError.addContext('apiname', 'VNDWallet.resetVNDReqToPay');

  try {
    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    global.vndReqToPayAbi = JSON.parse(fs.readFileSync(vndConfig.abiFileVNDReqToPay, 'utf-8'));
    global.vndReqToPay = global.web3.eth.contract(vndReqToPayAbi).at(vndConfig.addressVNDReqToPay);

    loggerInfo.info('Reset VNDReqToPay success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Reset VNDReqToPay has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};
/*=====  End of Functional Zone  ======*/