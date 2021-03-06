const appRoot = require("app-root-path")
const winston = require("winston")
const path = require("path")

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: path.join(appRoot.toString(), "logs", "main.log"),
    handleExceptions: true,
    json: true,
    maxsize: 52428800, // 50MB
    maxFiles: 200,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
})

// create a stream object with a "write" function that will be used by `morgan`
logger.stream = {
  write: function (message) {
    // use the "info" log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  },
}

module.exports = logger
