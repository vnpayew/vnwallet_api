'use strict';

/*=============================================
=            Modules & Global Variables       =
=============================================*/

/**_Start_Require Global Modules */
const log4js = require('log4js');
const crypto = require('crypto');
const ethUtils = require('ethereumjs-util');
const globalConfig = require('../../config/global');
const fs = require('fs');
/*=====  End of Modules & Global Variables======*/

/*=================================
=            Functional Zone      =
=================================*/

/**
 * [Create acccount wallet]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.create = function (request, reply) {
  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.createAccount');
  loggerError.addContext('apiname', 'VNDWallet.createAccount');

  try {
    //generate private key
    let randbytes = crypto.randomBytes(32);
    //generate address
    let newAddress = '0x' + ethUtils.privateToAddress(randbytes).toString('hex');

    //init ETH for new account
    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    global.web3.eth.sendTransaction({
      from: vndConfig.coinbaseVNDWallet,
      to: newAddress,
      value: global.web3.toHex(global.web3.toWei(globalConfig.vndWallet.amountETH, 'ether'))
    });

    loggerInfo.info('Create account success. Address of new account: ', newAddress);

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    res.data = {
      'address': newAddress,
      'private_key': randbytes.toString('hex')
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Create account has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Sefl block]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.selfBlock = function (request, reply) {
  let signerAddress = request.payload.signer_address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.selfBlock');
  loggerError.addContext('apiname', 'VNDWallet.selfBlock');

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

    let data = global.vndBusiness.selfBlock.getData();

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    web3.eth.estimateGas(txParams, function (err, response) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Self block success');

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
    loggerError.error('Self block has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Block by master key]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.blockByMasterKey = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let address = request.payload.address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.blockByMasterKey');
  loggerError.addContext('apiname', 'VNDWallet.blockByMasterKey');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
    
    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndBusiness.blockByMasterKey.getData(address);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, response) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Block by master key success');

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
    loggerError.error('Block by master key has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Unblock by master key]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.unblockByMasterKey = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let address = request.payload.address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.unblockByMasterKey');
  loggerError.addContext('apiname', 'VNDWallet.unblockByMasterKey');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid adress'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndBusiness.unblockByMasterKey.getData(address);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, response) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Unblock by master key success. Hash of transaction: ', hash);

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
    loggerError.error('Unblock by master key has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Get balance]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.getBalance = function (request, reply) {
  let address = request.params.address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.getBalance');
  loggerError.addContext('apiname', 'VNDWallet.getBalance');

  try {
    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    let balance = global.vndWallet.balanceOf.call(address).toNumber();

    loggerInfo.info('Get balance success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    res.data = {
      'balance': balance
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Get balance has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Check block]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.checkBlock = function (request, reply) {
  let address = request.params.address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.checkBlock');
  loggerError.addContext('apiname', 'VNDWallet.checkBlock');

  try {
    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    let isBlock = global.vndWallet.isBlock.call(address);

    loggerInfo.info('Check block success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    res.data = {
      'isBlock': isBlock
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Check block has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Check account is owners of another account]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.checkOwners = function (request, reply) {
  let address = request.params.address;
  let ownerAddress = request.params.owner_address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.checkOwners');
  loggerError.addContext('apiname', 'VNDWallet.checkOwners');

  try {
    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(ownerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid owner address'
      }
      reply(res);
      return;
    }

    let isOwner = global.vndWallet.checkOwners.call(address, ownerAddress);

    loggerInfo.info('Check account is owners of another account success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    res.payload = {
      'isOwner': isOwner
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Check account is owners of another account has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Change owner for wallet account]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.changeOwner = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let address = request.payload.address;
  let ownerAddress = request.payload.owner_address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.changeOwner');
  loggerError.addContext('apiname', 'VNDWallet.changeOwner');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(ownerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid owner address'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndBusiness.changeOwner.getData(address, ownerAddress);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, response) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Change owner success.');

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
    loggerError.error('Change onwer has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Change type of wallet account by master key]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.changeAccountType = function (request, reply) {
  let signerAddress = request.payload.signer_address;
  let address = request.payload.address;
  let typ = request.payload.typ;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.changeAccountType');
  loggerError.addContext('apiname', 'VNDWallet.changeAccountType');

  try {
    if (!ethUtils.isValidAddress(signerAddress)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid signer address'
      }
      reply(res);
      return;
    }

    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    if (typ != 1 && typ != 2){
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid type data'
      }
      reply(res);
      return;
    }

    const vndConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    let nonce = global.web3.eth.getTransactionCount(signerAddress, 'pending');

    let data = global.vndBusiness.changeAccountType.getData(address, typ);

    const txParams = {
      nonce: nonce, // Replace by nonce for your account on geth node
      gasPrice: gasPrice,
      gasLimit: '0x30000',
      from: signerAddress,
      to: vndConfig.addressVNDBusiness,
      value: 0x00,
      data: data
    };

    global.web3.eth.estimateGas(txParams, function (err, response) {
      if (err) {
        let res = {
          'resCode': '500',
          'resDesc': 'Internal error'
        }
        reply(res);
      }
      else {
        loggerInfo.info('Change type of wallet account success.');

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
    loggerError.error('Change type of wallet account has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};

/**
 * [Check type of account]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.checkAccountType = function (request, reply) {
  let address = request.params.address;

  let loggerInfo = log4js.getLogger();
  let loggerError = log4js.getLogger('error');

  loggerInfo.addContext('apiname', 'VNDWallet.checkAccountType');
  loggerError.addContext('apiname', 'VNDWallet.checkAccountType');

  try {
    if (!ethUtils.isValidAddress(address)) {
      let res = {
        'resCode': '400',
        'resDesc': 'Invalid address'
      }
      reply(res);
      return;
    }

    let accountType = global.vndBusiness.checkAccountType.call(address).toNumber();
    
    loggerInfo.info('Check type of account success.');

    let res = {
      'resCode': '200',
      'resDesc': 'Success'
    };

    res.payload = {
      'accountType': accountType
    };

    reply(res);
  } catch (err) {
    console.log(err);
    loggerError.error('Check type of account has error: ' + err.message);

    let res = {
      'resCode': '500',
      'resDesc': 'Internal error'
    }
    reply(res);
  }
};
/*=====  End of Functional Zone  ======*/