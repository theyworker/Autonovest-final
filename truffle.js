// Allows us to use ES6(A new Javascript version) in our migrations and tests.
require('babel-register')

//truffle configuration file
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777'
    }
  }
}
