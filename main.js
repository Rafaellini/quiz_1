'use strict'


const readline = require('readline');

//Definición de variables
//QZ  La matriz con todos los quizzes

let QZ = [
			{pregunta:"Capital de España",respuesta:"Madrid"},
			{pregunta:"Capital de Francia",respuesta:"París"},
			{pregunta:"Capital de Italia",respuesta:"Roma"},
			{pregunta:"Capital de Portugal",respuesta:"Lisboa"}

];



//LC  Lista de comandos

let LC; 
LC =  "\nhelp|h -- Lista de comandos \n";
LC += "list -- Lista de preguntas \n";
LC += "show <id> -- Muestra la pregunta y la respuesta asociada a dicho <id> \n";
LC += "add -- Añade un nuevo quiz \n";
LC += "delete <id> -- Borra el quiz asociado <id> \n";
LC += "edit <id> -- Edita el quiz asociado <id> \n";
LC += "test <id> -- Prueba el quiz asociado a <id> \n";
LC += "play|p -- Juega a Quiz \n";
LC += "credits -- Muestra los créditos \n";
LC += "quit|q -- Sale de Quiz \n";

// Autor El texto de los créditos

let Autor = "\n \u00a9 Federico Rafael Conde Gómez";


//rl Objeto interfaz
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'QUIZ > '
});

console.log();

// Mensaje de bienvenida
console.log("Juego del Quiz");
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
      	console.log(LC);
      	break;
    case 'list':
    	console.log();
    	QZ.forEach((elem,i) => console.log(`[${i}] - ${elem.pregunta}`));
    	console.log();
      	break;
    case 'show':
    	try {
    		console.log(`\n[${param}] - ${QZ[param].pregunta} : ${QZ[param].respuesta}\n`);
    	}catch(err){
    		console.log("\nEl id introducido no es correcto\n");
    	}
      	break;
    case 'add':
    	rl.question('Introduzca una nueva pregunta: ', (preg) => {
  			rl.question('Ahora introduzca una nueva respuesta: ', (res) =>  {
  				QZ.push({pregunta: preg, respuesta: res});
  				console.log("Se ha añadido una pregunta\n");
  				console.log(`${QZ[QZ.length-1].pregunta} => ${QZ[QZ.length-1].respuesta}`);
  				rl.prompt();
  			});
		});
    	break; 
    case 'delete':
    	try{
    		QZ.splice(param,1);
    		}catch(err){
    			console.log("El id introducido no es correcto");
    		}
    	break;  	
    case 'credits':
    	console.log(Autor + '\n');
    	break;
    case 'q':
    case 'quit':
      rl.close();
      break;
    default:
      console.log(`\n '${line.trim()}' no es un comando válido`);
      console.log('Por favor, pulse h para ver la ayuda\n');
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('\n ¡Gracias por jugar a Quiz! \n');
  process.exit(0);
});

// node main.js