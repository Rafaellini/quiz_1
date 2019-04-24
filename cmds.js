//Rafael Conde Gómez
//cmds.js
//Aquí se implementan los comandos del juego

'use strict'

//Llama a los módulos
const {contar, vector, quiz, borra, add, actualiza, ordena} = require('./model.js');
const  {colorear, log, bigText, errlog} = require('./out.js');

//Definición de variables
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


//Funciones
//h help
exports.helpCmd = (rl) => {
	log(LC);
  rl.prompt();
}

//list
exports.listCmd = (rl) => {
	log('');
  vector().forEach((elem,i) => {
    log(`${colorear('[' + i + ']', 'magenta')} - ${elem.pregunta}`);
    log('');
  });
  rl.prompt();
}


//show
exports.showCmd = (rl, param) => {
  if (typeof param === "undefined"){
    errlog('Falta el parámetro id');
  }else{
	   try {
    	 log(`\n ${colorear('[' + param + ']', 'magenta')} -  ${quiz(param).pregunta} : ${quiz(param).respuesta}\n`);
        rl.prompt();
    }catch(err){
    	 errlog(err.message);	
        rl.prompt();
    }
  }
}

//add
exports.addCmd = (rl) => {
	rl.question('Introduzca una nueva pregunta: ', (preg) => {
  			rl.question('Ahora introduzca una nueva respuesta: ', (res) =>  {
  				add(preg, res);
  				log("Se ha añadido una pregunta\n",'green');
  				log(`${preg} ${colorear('=>', 'magenta')} ${res}`);
  				rl.prompt();
  			});
		});
}

//delete
exports.delCmd = (rl,param) => {
  if (typeof param === "undefined"){
    errlog('Falta el parámetro id');
  }else{
	   try{
    	 borra(param);
        rl.prompt();
    	 }catch(err){
    		  errlog(err.message);
          rl.prompt();
    	 }
  } 
}

//edit
exports.editCmd = (rl, param) => {
  if (typeof param === "undefined"){
    errlog('Falta el parámetro id');
  }else{
    	try{
        	if (process.stdout.isTTY)  {rl.write(quiz(param).pregunta);}
        		rl.question(`Nueva pregunta: ` , (newPreg) => {
        		if (process.stdout.isTTY)  {rl.write(quiz(param).respuesta);}
        			rl.question(`Nueva respuesta: ` , (newResp) => {
        				actualiza(param, newPreg, newResp);
        				rl.prompt();
        			});
        		});
        	}catch(err){
        		errlog(err.message);
        	}
    }
  }

//test
exports.testCmd = (rl, param) => {
  if (typeof param === "undefined"){
    errlog('Falta el parámetro id');
      }else{
    	try{
        	rl.question(`${quiz(param).pregunta} : `, (res) => {
        		if (res.toUpperCase().trim() === quiz(param).respuesta.toUpperCase() ) {
        			log('La respuesta es correcta', 'greenBright');
        			rl.prompt();
        		}else{
        			log('La respuesta es incorrecta', 'red');
        			rl.prompt();
        			}
        		}
        	);
        }catch(err){
        	errlog(err.message);
          rl.prompt();
        }
    }
  }

//play
exports.playCmd = (rl) => {
	let score = 0; //Inicializa marcador a cero
  const vor = ordena(); //Orden aleatorio de las preguntas

  //vor.forEach((elem) => {console.log(elem)});

  function play() {
        if (score === vor.length) {
          log(`Fin. Puntuación Final ${score}`, 'green');
          bigText(`${score}`, 'magenta');
          rl.prompt();  
          }else{
            //console.log('score' + score + 'vor' + vor[score]);
            rl.question(`${score+1}. ${quiz(vor[score]).pregunta}: `, resp => {
                if(resp.toUpperCase().trim() === quiz(vor[score]).respuesta.toUpperCase()){
                  score = score + 1;
                  log(`Respuesta acertada. Puntuación:  ${score}`, 'greenBright');
                  play();
                }else{
                  log(`Respuesta incorrecta. Puntuación Final ${score}`, 'red');
                  bigText(`${score}`, 'magenta');
                  rl.prompt();
                }
            });
          }
    }
    play();
}

//credits
exports.creditsCmd = (rl) => {
	log(Autor + '\n');
  rl.prompt();
}

//quit
exports.quitCmd = (rl) => {
	rl.close();
}
