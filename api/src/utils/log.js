import winston from 'winston'

winston.add(new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(
      ({ level, message, ...meta }) => `${level}: ${JSON.stringify(message, null, 4)} ${JSON.stringify(meta)}\n`,
    ),
  ),
}))

module.exports = winston

export const log = (...args) => winston.info(...args)