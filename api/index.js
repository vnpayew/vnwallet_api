'use strict'

const Joi = require('joi');

const Transfer = require('./handlers/Transfer');
const Account = require('./handlers/Account');
const Configuration = require('./handlers/Configuration');
const SignTransaction = require('./handlers/SignTransaction');

exports.register = (plugin, options, next) => {

  plugin.route([

    /**** SIGN ****/
    //Change master key
    {
      method: 'POST',
      path: '/sign/sign',
      handler: SignTransaction.signTransaction,
      config: {
        tags: ['api', 'SignTransaction'],
        validate: {
          payload: {
            signer_private_key: Joi.string().required(),
            tx_params: Joi.object()
          }
        }
      }
    },
    
    /**** SIGN - END ****/

    /**** CONFIGURATION ****/
    //Send signed transaction
    {
      method: 'POST',
      path: '/configuration/send-signed-transaction',
      handler: Configuration.sendSignedTransaction,
      config: {
        tags: ['api', 'Configuration'],
        validate: {
          payload: {
            raw_tx: Joi.string().required(),
            trans_name: Joi.string().required()
          }
        }
      }
    },
    //Change address of VNDBusiness
    {
      method: 'POST',
      path: '/configuration/change-vndbusiness',
      handler: Configuration.changeVNDBusiness,
      config: {
        tags: ['api', 'Configuration'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            new_address: Joi.string().required()
          }
        }
      }
    },
    //Change address of VNDReqToPay
    {
      method: 'POST',
      path: '/configuration/change-vndreqtopay',
      handler: Configuration.changeVNDReqToPay,
      config: {
        tags: ['api', 'Configuration'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            new_address: Joi.string().required()
          }
        }
      }
    },
    //Reset web3
    {
      method: 'POST',
      path: '/configuration/reset-web3',
      handler: Configuration.resetWeb3,
      config: {
        tags: ['api', 'Configuration']
      }
    },
    //Reset VNDWallet Info
    {
      method: 'POST',
      path: '/configuration/reset-vndwallet',
      handler: Configuration.resetVNDWallet,
      config: {
        tags: ['api', 'Configuration']
      }
    },
    //Reset VNDBusiness Info
    {
      method: 'POST',
      path: '/configuration/reset-vndbusiness',
      handler: Configuration.resetVNDBusiness,
      config: {
        tags: ['api', 'Configuration']
      }
    },
    //Reset VNDReqToPay Info
    {
      method: 'POST',
      path: '/configuration/reset-vndreqtopay',
      handler: Configuration.resetVNDReqToPay,
      config: {
        tags: ['api', 'Configuration']
      }
    },
    //Change master key
    {
      method: 'POST',
      path: '/configuration/change-master-key',
      handler: Configuration.changeMasterKey,
      config: {
        tags: ['api', 'Configuration'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_master_key: Joi.string().required()
          }
        }
      }
    },
    /**** CONFIGURATION - END ****/

    /**** ACCOUNT ****/
    {
      method: 'POST',
      path: '/account/create',
      handler: Account.create,
      config: {
        tags: ['api', 'Account'],
      }
    },
    //Self block
    {
      method: 'POST',
      path: '/account/self-block',
      handler: Account.selfBlock,
      config: {
        tags: ['api', 'Account'],
        validate: {
          payload: {
            signer_address: Joi.string().required()
          }
        }
      }
    },
    //Block by master key
    {
      method: 'POST',
      path: '/account/block-by-masterkey',
      handler: Account.blockByMasterKey,
      config: {
        tags: ['api', 'Account'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            address: Joi.string().required()
          }
        }
      }
    },
    //Unblock by master key
    {
      method: 'POST',
      path: '/account/unblock-by-masterkey',
      handler: Account.unblockByMasterKey,
      config: {
        tags: ['api', 'Account'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            address: Joi.string().required()
          }
        }
      }
    },
    //Get balace
    {
      method: 'GET',
      path: '/account/get-balance/{address}',
      handler: Account.getBalance,
      config: {
        tags: ['api', 'Account'],
        validate: {
          params: {
            address: Joi.string().required()
          }
        }
      }
    },
    //Check block
    {
      method: 'GET',
      path: '/account/check-block',
      handler: Account.checkBlock,
      config: {
        tags: ['api', 'Account'],
        validate: {
          query: {
            address: Joi.string().required()
          }
        }
      }
    },
    //Change owner for wallet account
    {
      method: 'POST',
      path: '/account/change-owner',
      handler: Account.changeOwner,
      config: {
        tags: ['api', 'Account'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            address: Joi.string().required(),
            owner_address: Joi.string().required()
          }
        }
      }
    },
    //Check account is owners of another account
    {
      method: 'GET',
      path: '/account/check-owner/{address}/{owner_address}',
      handler: Account.checkOwners,
      config: {
        tags: ['api', 'Account'],
        validate: {
          params: {
            address: Joi.string().required(),
            owner_address: Joi.string().required()
          }
        }
      }
    },
    //Change type of wallet account
    {
      method: 'POST',
      path: '/account/change-account-type',
      handler: Account.changeAccountType,
      config: {
        tags: ['api', 'Account'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            address: Joi.string().required(),
            typ: Joi.number().integer().required()
          }
        }
      }
    },
    //Check type of wallet account
    {
      method: 'GET',
      path: '/account/check-account-type/{address}',
      handler: Account.checkAccountType,
      config: {
        tags: ['api', 'Account'],
        validate: {
          params: {
            address: Joi.string().required()
          }
        }
      }
    },
    /**** ACCOUNT - END ****/

    /**** TRANSFER ****/
    //transfer eth base from_address to_address, signed by fromAddress
    {
      method: 'POST',
      path: '/transfer/transfer-eth',
      handler: Transfer.transferETH,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_address: Joi.string().required()
          }
        }
      }
    },
    //Transfer token from fromAddress to toAddress, signed by fromAddress
    {
      method: 'POST',
      path: '/transfer/transfer',
      handler: Transfer.transfer,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required(),
            description: Joi.any()
          }
        }
      }
    },
    //Transfer from address is child of signer address to toAddress, signed by signer address
    {
      method: 'POST',
      path: '/transfer/transfer-from-child',
      handler: Transfer.transferFromChild,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            from_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required(),
            description: Joi.any()
          }
        }
      }
    },
    //Mint token
    {
      method: 'POST',
      path: '/transfer/mint',
      handler: Transfer.mint,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required()
          }
        }
      }
    },
    //Burn token
    {
      method: 'POST',
      path: '/transfer/burn',
      handler: Transfer.burn,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            amount: Joi.number().integer().required()
          }
        }
      }
    },
    //Self burn token
    {
      method: 'POST',
      path: '/transfer/selfBurn',
      handler: Transfer.selfBurn,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            amount: Joi.number().integer().required()
          }
        }
      }
    },
    //request to pay
    {
      method: 'POST',
      path: '/transfer/request-to-pay',
      handler: Transfer.requestToPay,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required(),
            txn_trace: Joi.string().required()
          }
        }
      }
    },
    //process request to pay
    {
      method: 'POST',
      path: '/transfer/process-request-to-pay',
      handler: Transfer.processRequestToPay,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required(),
            txn_trace: Joi.string().required()
          }
        }
      }
    },
    //refund
    {
      method: 'POST',
      path: '/transfer/refund',
      handler: Transfer.refund,
      config: {
        tags: ['api', 'Transfer'],
        validate: {
          payload: {
            signer_address: Joi.string().required(),
            from_address: Joi.string().required(),
            to_address: Joi.string().required(),
            amount: Joi.number().integer().required(),
            description: Joi.string().required()
          }
        }
      }
    },
    /**** TRANSFER - END ****/
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};