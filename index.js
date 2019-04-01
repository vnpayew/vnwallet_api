'use strict';

const Glue = require('glue');
const manifest = require('./config/manifest');
const common = require('./api/utils/common');
const moment = require('moment');
const log4js = require('log4js');
const Web3 = require('web3');
const fs = require('fs');

log4js.configure({
  appenders: {
    info: {
      type: 'file',
      maxLogSize: 10240,
      keepFileExt: true,
      filename: 'logs/info/' + moment(new Date()).format('YYYYMMDD') + '.log',
      layout: {
        type: 'pattern',
        pattern: '{"Time": "%d", "Source": "%X{apiname}", "Detail": "%m"}'
      }
    },
    error: {
      type: 'file',
      maxLogSize: 10240,
      keepFileExt: true,
      filename: 'logs/error/' + moment(new Date()).format('YYYYMMDD') + '.log',
      layout: {
        type: 'pattern',
        pattern: '{"Time": "%d", "Source": "%X{apiname}", "Detail": "%m"}'
      }
    }
  },
  categories: {
    default: {
      appenders: ['info'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
});

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
}

const vndWalletConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

global.web3 = new Web3(new Web3.providers.HttpProvider(vndWalletConfig.urlRPC));
global.gasPrice = global.web3.toHex(global.web3.eth.gasPrice);
global.vndWalletAbi = JSON.parse(fs.readFileSync(vndWalletConfig.abiFileVNDWallet, 'utf-8'));
global.vndWallet = global.web3.eth.contract(vndWalletAbi).at(vndWalletConfig.addressVNDWallet);
global.vndReqToPayAbi = JSON.parse(fs.readFileSync(vndWalletConfig.abiFileVNDReqToPay, 'utf-8'));
global.vndReqToPay = global.web3.eth.contract(vndReqToPayAbi).at(vndWalletConfig.addressVNDReqToPay);
global.vndBusinessAbi = JSON.parse(fs.readFileSync(vndWalletConfig.abiFileVNDBusiness, 'utf-8'));
global.vndBusiness = global.web3.eth.contract(vndBusinessAbi).at(vndWalletConfig.addressVNDBusiness);
global.checkCheckSum = false;

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {

  if (err) {
    console.log('server.register err:', err);
  }

  server.ext('onPreResponse', common.preResponse);

  server.route({
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    path: '/{any*}',
    handler: (request, reply) => {
      reply({ 'message': 'Liên kết không tồn tại' });
    }

  });

  server.start((err) => {

    if (err) {
      console.log(err);
    }

    console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());

  });
});
