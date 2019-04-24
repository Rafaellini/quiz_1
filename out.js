//Rafael Conde Gómez
//out.js
//Funciones que dan estilo al texto

'use strict'

//LLama a los módulos
const figlet = require('figlet');
const chalk = require('chalk');

//Funciones
//Colorea un texto en un determinado color
const colorear = (msg, color) => {
  if (color !== undefined){
    msg = chalk[color].bold(msg);
  }
  return msg;
}

//Escribe un texto en color
const log = (msg, color) => {
  console.log(colorear(msg, color));
}

//Escribe un texto en formato grande y le da color
const bigText = (msg, color) => {
  log(figlet.textSync(msg,{horizontalLayout: 'full'}), color);
}

//Estilo de los mensajes de error
const errlog = (emsg) => {
  console.log(`${chalk['red'].bold.bgYellowBright('Error: ')}${chalk['red'].bold.bgYellowBright(emsg)}`);
}

//Exporta los módulos
exports = module.exports = {
	colorear,
	log,
	bigText,
	errlog
};