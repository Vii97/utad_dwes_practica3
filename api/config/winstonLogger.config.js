// Importo bibliotecas
const { createLogger, format, transports} = require("winston");
const { MESSAGE } = require("triple-beam");
const { combine, timestamp, label } = format;

// Formatos
const generalFormat = format((info) => {
    const { level, message, timestamp } = info;
    info[MESSAGE] = `LOG (${timestamp}) ${level}: ${message}`;
    return info
});
 // Loggers
 const appLogger = createLogger({

    format: combine(
        label({ label:"APP", message: true }),
        timestamp(),
        generalFormat()
    ),
    transports: [
        new transports.Console()
    ]
 });

 // JWT
 const jwtLogger = createLogger({

    format: combine(
        label({ label:"JWT", message: true }),
        timestamp(),
        generalFormat
    ),
    transports: [
        new transports.Console()
    ]
 });

 // Exportar módulo
 module.exports = {
    appLogger,
    jwtLogger
 }

/* 

const { appLogger, jwtLogger } = require("./api/config/winstonLogger.config");

appLogger.info("Información");
appLogger.warn("Advertencia");
appLogger.error("Error");
appLogger.debug("Depuración");
appLogger.verbose("Detalles");

jwtLogger.info("Información");
jwtLogger.warn("Advertencia");
jwtLogger.error("Error");
jwtLogger.debug("Depuración");
jwtLogger.verbose("Detalles");

*/