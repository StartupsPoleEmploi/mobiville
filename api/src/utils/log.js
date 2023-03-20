import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format:
    process.env.NODE_ENV !== 'production'
      ? winston.format.simple()
      : winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    //new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //new winston.transports.File({ filename: 'combined.log' }),
  ],
})

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(
        ({ level, message, ...meta }) =>
          `${level}: ${JSON.stringify(message, null, 4)} ${JSON.stringify(
            meta
          )}\n`
      )
    ),
  })
)

export const log = (...args) => logger.info(...args)
