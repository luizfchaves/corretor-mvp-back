const {createLogger, transports, format} = require('winston');
const dayjs = require('dayjs');

const consoleFormatter = format.printf(({timestamp, level, message}) =>{
  const colors = {
    reset: '\x1b[0m',
    error: '\x1b[41m',
    warn: '\x1b[43m',
    debug: '\x1b[46m',
  };

  const hour = dayjs(timestamp).format('HH:mm:ss');

  return `${colors[level] ?? ''}`+
  `[${level.toUpperCase().padEnd(7)}] ${hour} - ${message}`+
  `${colors.reset}`;
});

const fileFormatter = format.combine(
    format.timestamp(),
    format.printf((info) =>{
      return `[${info.timestamp} - ${info.level.toUpperCase().padEnd(7)}] ${info.message}`;
    }),
);

const Logger = createLogger({
  transports: [
    new transports.Console({
      format: consoleFormatter,
      level: process.env.LOG_LEVEL ?? 'info',
    }),
    new transports.File({
      filename: `./logs/logs-${dayjs().format('YYYY-MM-DD')}.log`,
      format: fileFormatter,
      level: 'info',
    }),
    // new transports.Http({
    //   host: process.env.LOG_HOST ?? 'localhost:8080/logs',
    //   level: 'info',
    // }),
  ],
});

module.exports = Logger;
