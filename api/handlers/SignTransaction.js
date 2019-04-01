const ethTx = require('ethereumjs-tx');

/**
 * [Create acccount wallet]
 * @param  {[type]} request [description]
 * @param  {[type]} reply   [description]
 * @return {[type]}         [description]
 */
module.exports.signTransaction = function (request, reply) {
  let signerPrivateKey = Buffer.from(request.payload.signer_private_key.toString('hex'), 'hex');
  let txParams = request.payload.tx_params;
  
  // Transaction is created
  const tx = new ethTx(txParams);
  
  // Transaction is signed
  tx.sign(signerPrivateKey);
  const rawTx = '0x' + tx.serialize().toString('hex');
  console.log(rawTx);

  let res = {
    'resCode': '200',
    'resDesc': 'Success'
  };

  res.payload = {
    'rawTx': rawTx
  };

  reply(res);
}