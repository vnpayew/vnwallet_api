'use strict'

module.exports.connectionInfo = {
  user: "vntaxi",
  password: "1234@Abcd",
  connectString: "edumobile.vn:1521/db11g",
  _enableStats: true
}

module.exports.doReleaseConnection = (connection) => {
  connection.close(
    function (err) {
      if (err) {
        console.error(err.message);
      }
      console.log('release success');
    }
  );
}

module.exports.doReleaseConnectionCommit = (connection) => {
  connection.commit(
    function (err) {
      if (err) {
        console.error('Commit error: ', err.message);
        connection.close(
          function (err) {
            if (err) {
              console.error(err.message);
            }
            console.log('Release success');
          }
        );
      }else{
        connection.close(
          function (err) {
            if (err) {
              console.error(err.message);
            }
            console.log('Commit & Release success');
          }
        );
      }
    }
  );
}

module.exports.doReleaseConnectionRollback = (connection) => {
  connection.rollback(
    function (err) {
      if (err) {
        console.error('Rollback error: ', err.message);
        connection.close(
          function (err) {
            if (err) {
              console.error(err.message);
            }
            console.log('Release success');
          }
        );
      }else{
        connection.close(
          function (err) {
            if (err) {
              console.error(err.message);
            }
            console.log('Rollback & Release success');
          }
        );
      }
    }
  );
}

module.exports.doClose = (connection, resultSet) => {
  resultSet.close(
    function (err) {
      if (err) {
        console.error(err.message);
      }
      console.log('close success');
      doRelease(connection);
    });
}