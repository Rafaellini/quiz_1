//Rafael Conde Gómez
//main.js
//Módulo principal. Aquí está el objeto interfaz (readline)


'use strict'


//Llama a los módulos
const readline = require('readline');
const cmds = require('./cmds.js');
const  {colorear, log, bigText, errlog} = require('./out.js');





//rl Objeto interfaz
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorear('QUIZ > ', 'blue'),
  completer: (line) => {
    const completions = 'h help list show add delete edit test play credits quit q'.split(' ');
    const hits = completions.filter((c) => c.startsWith(line));
    // Show all completions if none found
    return [hits.length ? hits : completions, line];
  }
});


log('');


// Mensaje de bienvenida
bigText('Juego del Quiz', 'yellow');
log('');
rl.prompt();

// Cada vez que escriba una línea y pulse return salta este evento
rl.on('line', (line) => {
	//Separa el comando del parámetro
	//cmd Comando
	//param Parámetro
	const text = line.split(' ');
	let cmd = text[0].toLowerCase().trim();
	let param = text[1];


 switch (cmd) {
  	case '':
  		break;
    case 'help':
    case 'h':
      cmds.helpCmd(rl);
      	break;
    case 'list':
      cmds.listCmd(rl);
      	break;
    case 'show':
    	cmds.showCmd(rl, param);
      	break;
    case 'add':
    	cmds.addCmd(rl);
    	break; 
    case 'delete':
    	cmds.delCmd(rl, param);
    	break;
    case 'edit' :
    	cmds.editCmd(rl, param);
    	break;
    case 'test' :
    	cmds.testCmd(rl, param);
    	break;	
    case 'play':
    case 'p' :
      cmds.playCmd(rl);
    	break;	  	
    case 'credits':
    	cmds.creditsCmd(rl);
    	break;
    case 'q':
    case 'quit':
      cmds.quitCmd(rl);
      break;
    default:
      errlog(`${line.trim()} no es un comando válido`);
      log('');
      log(`Por favor, pulse ${colorear('h','green')} para ver la ayuda`);
      log('');
      break;
  }
  rl.prompt();
}).on('close', () => {
  log(colorear('\n ¡Gracias por jugar a Quiz! \n', 'green'));
  process.exit(0);
});

// node main.js

// cd "Users/Rafaellini/Documents/Curso Node 2019/quiz_1"

// cd "Documents/Cursos MiríadaX/Curso Node 2019/quiz_1"




