const bunyan = require('bunyan')
const logger = bunyan.createLogger({
    name: 'my-project',
    streams: [
        {
          level: 'debug',
          stream: process.stdout            // log INFO and above to stdout
        }
      ]
})

module.exports = logger