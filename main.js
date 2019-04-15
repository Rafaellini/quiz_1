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
	let param = +text[1];


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
    		console.log(`El id introducido "${param}" no es correcto`);
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
    		QZ[param].pregunta;
    		QZ.splice(param,1);
    		}catch(err){
    			console.log(`El id introducido "${param}" no es correcto`);
    		}
    	break;
    case 'edit' :
    	try{
    		if (process.stdout.isTTY)  {rl.write(QZ[param].pregunta);}
    		rl.question(`Nueva pregunta: ` , (newPreg) => {
    			if (process.stdout.isTTY)  {rl.write(QZ[param].respuesta);}
    			rl.question(`Nueva respuesta: ` , (newResp) => {
    				QZ[param].pregunta = newPreg;
    				QZ[param].respuesta = newResp;
    				rl.prompt();
    			});
    		});
    	}catch(err){
    		console.log(`El id introducido "${param}" no es correcto`);
    	}
    	break;
    case 'test' :
    	try{
    		rl.question(`${QZ[param].pregunta} : `, (res) => {
    			if (res === QZ[param].respuesta) {
    				console.log('La respuesta es correcta');
    				rl.prompt();
    			}else{
    				console.log('La respuesta es incorrecta');
    				rl.prompt();
    				}
    			}
    		);
    	}catch(err){
    		console.log(`El id introducido "${param}" no es correcto`);
    	}
    	break;	
    case 'play':
    case 'p' :
    	let num; let v = [];
    	for (let i = 0; v.length < QZ.length;i++){
    	num = Math.floor(Math.random()*QZ.length);
    	console.log(`${num} : ${v.indexOf(num)}`);
    	if (v.indexOf(num) === -1) {v[i] = num;}
    	}
    	v.forEach((elem,i) => {console.log(`${i} : ${v[i]}`)});
    		
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

// cd "Users/Rafaellini/Documents/Curso Node 2019/quiz"