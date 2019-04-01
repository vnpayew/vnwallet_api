module.exports.vndWallet = {
  url: 'http://localhost:8502',
  address: '0x6edbe9a5389ee8e68be8ed310f8d683772320671',
  abiFile: './config/abi.json',
  amountETH: 0.01000000,
  coinbase: '0x8d5ee4b23382d7492355bf5c94bc2ee5311b90f6' //86e0fa601fb92717eef04c09d863d7ebead77936a40183438966ae907ffe6cc2
  //masterKey1: 0x3da0365e3cfc685c2503d111fe853c4c046ae978 - e40a899f2be9b12e9dd34934b29c126a20a92dbe6d3be765a19c1454d20749bd
  //masterKey2: 0x1df1e7d48fb36c35f3c768e1f381c8120587daea - f780d2947b86b794c2e1fd544f376c441bcb9aab47e2949ceb719375b623a1ad
};

module.exports.vndRevert = {
  url: 'http://localhost:8502',
  address: '0xa72eb3429718186e8bd689f58a36943331d1e268',
  abiFile: './config/abiRevert.json'
};

module.exports.vndReqToPay = {
  url: 'http://localhost:8502',
  address: '0x8d92fbfdf99ab98cca3ef2aaa670d5e36e27452d',
  abiFile: './config/abiReqToPay.json'
};

module.exports.replace_unicode = {
  source: 'áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ',
  target: 'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY'
};

module.exports.params = {
  accessKey: '79a96ccb09b127f81a0f48c23ef7c084e5132862a39c643c3964b6bd24e98685'
};