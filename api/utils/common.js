'use strict';

/*=============================================
=            Modules & Global Variables       =
=============================================*/


/**_Start_Response*/
const moment = require('moment');
/**_End_Response*/

const global = require('../../config/global');

/*=====  End of Modules & Global Variables======*/

/*=================================
=            Functional Zone      =
=================================*/

/*__FUNCTION random user_pass__*/
module.exports.randomPasswordHoa = function () {

  let text = '';

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;

}

module.exports.undefinedToEmptyString = function (str) {
  if (str === undefined || str === null) {
    return '';
  }
  return str;
}

module.exports.undefinedToEmptyNumber = function (str) {
  if (str === undefined || str === null) {
    return 0;
  }
  return str;
}

module.exports.numberWithCommas = function (x) {
  if (x === null || x === undefined){return ''};

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.undefinedToEmptyNumber1 = function (str) {
  if (str === undefined || str === '') {
    return -1;
  }
  return str;
}

module.exports.undefinedToNullString = function (str) {
  if (str === undefined) {
    return 'NULL';
  }
  return str;
}

module.exports.undefinedToNull = function (str) {
  if (str === undefined) {
    return null;
  }
  return str;
}

module.exports.randomPassword = function () {
  var userPass = '';
  var possible = "0123456789";
  for (var i = 0; i < 6; i++)
    userPass += possible.charAt(Math.floor(Math.random() * possible.length));

  return userPass;
}

module.exports.preResponse = (request, reply) => {
  let response = request.response;
  if (response.isBoom) {
    if (response.output.payload.message === '97') {

      response.output.payload = {
        'statusCode': '97',
        'status': 'Failed',
        'message': 'Xác thực không hợp lệ!'
      };

    } else if (response.output.payload.message === '96') {

      response.output.payload = {
        'statusCode': '96',
        'status': 'Failed',
        'message': 'Token không hợp lệ!'
      };

    } else if (response.output.payload.message === '95') {

      response.output.payload = {
        'statusCode': '95',
        'status': 'Failed',
        'message': 'Token không đúng định dạng!'
      };

    } else if (response.output.payload.message === '94') {

      response.output.payload = {
        'statusCode': '94',
        'status': 'Failed',
        'message': 'Phiên làm việc hết hạn!'
      };

    }
  }
  return reply.continue();

}

module.exports.excelFilter = (fileName) => {
  // accept image only
  if (!fileName.match(/\.(xlsx|xls)$/)) {

    return false;
  }
  return true;
};

module.exports.imageFilter = (fileName) => {
  // accept image only
  if (!fileName.match(/\.(png|jpg|JPG|PNG)$/)) {

    return false;
  }
  return true;
};

module.exports.fileDocumentExtensionFilter = (fileName) => {
  // accept image only
  if (!fileName.match(/\.(xlsx|xls|doc|docx|png|jpg|pdf|jpeg)$/)) {

    return false;
  }
  return true;
};

module.exports.catdau = (myStr) => {

  let characterCoDau = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
  let characterKhongDau = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  let oldChar = '';
  let oldCharIndexInCharacterCoDau = -1;

  myStr = myStr.toLowerCase();
  for (var i = 0; i < myStr.length; i++) {

    oldChar = myStr.charAt(i);
    oldCharIndexInCharacterCoDau = characterCoDau.indexOf(oldChar);
    if (oldCharIndexInCharacterCoDau > -1) {
      myStr = replaceAt(myStr, i, characterKhongDau.charAt(oldCharIndexInCharacterCoDau));
    }

  }

  return myStr.replace(' ', '');

}

/*=====  End of Functional Zone  ======*/