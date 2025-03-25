(function () {
  require('dotenv').config(
    Object.assign(
      {},
      require('./lib/env-options'),
      require('./lib/cli-options')(process.argv)
    )
  )
})()
