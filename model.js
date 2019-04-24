//Rafael Conde Gómez
//model.js
//Desarrollo de funciones que se van a usar en cmds.js

'use strict'

//Llama al módulo fs
const fs = require('fs');

//QZ  La matriz con todos los quizzes
let QZ;

// Funciones de lectura y escritura
const lectura = () => {
  return new Promise((resolve, reject) =>
    fs.readFile('quizzes.json', 'utf8', 
       (err, data) => !err?resolve(data):reject(err))
)};

const escritura = () => {
  return new Promise((resolve, reject) =>
    fs.writeFile('quizzes.json', JSON.stringify(QZ), 
       (err, data) => !err?resolve():reject(err))
)};

//Escribe los cambios en el fichero quizzes.json
//escritura().catch(err  => errlog("ERROR:\n" + err));

//Lee el fichero quizzes.json y lo vuelca en el vector QZ
lectura().then(data => QZ = JSON.parse(data))
          .catch(err  => console.log("ERROR:\n" + err));



//Devuelve el número de quizzes
const contar = () => {return QZ.length};

//Devuelve una copia del vector QZ que almacena los quizzes
const vector = () => {return JSON.parse(JSON.stringify(QZ))};

//Devuelve un quiz concreto del vector QZ
const quiz = (param) => {
	 const quiz = QZ[param];
    if (typeof quiz === "undefined") {
        throw new Error(`El valor del id "${param}" no es válido`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

//Borra un quiz concreto del vector QZ
const borra = (param) => {
	const quiz = QZ[param];
	if(typeof quiz === "undefined"){
		throw new Error(`El valor del id "${param}" no es válido`);
	}
	QZ.splice(param,1);
	escritura().catch(err  => errlog("ERROR:\n" + err));
};

//Añade un nevo quiz al final del vector QZ
const add = (preg, resp) => {
	preg = (preg || "").trim();
	resp = (resp || "").trim();
	QZ.push({pregunta: preg, respuesta: resp});
	escritura().catch(err  => errlog("ERROR:\n" + err));
};

//Edita un quiz concreto del vector QZ
const actualiza = (param, preg, resp) => {
	const quiz = QZ[param];
	if (typeof quiz === "undefined"){
		throw new Error(`El valor del id "${param}" no es válido`);
	}
	QZ[param].pregunta = preg;
	QZ[param].respuesta = resp;
	escritura().catch(err  => errlog("ERROR:\n" + err));
}

//Crea un vector v con el mismo número de elementos que QZ
//Va a ser un índice ordenado al azar para leer los quizzes de QZ
const ordena = () => {
	let num; let v = [];
	/* Calcula un número al azar dentro del rango
		Si el número está repetido, sigue calculando las veces que sea necesario*/
    for (let i = 0; v.length < contar();i++){
    	num = Math.floor(Math.random()*contar());
    	//console.log(`${num} : ${v.indexOf(num)}`);
    	if (v.indexOf(num) === -1) {
        	v[i] = num;
        }else{
          for(let j = 0; v[i]===undefined; j++){
            num = Math.floor(Math.random()*contar());
            //console.log(`j:${j} - ${num} : ${v.indexOf(num)}`);
            if (v.indexOf(num) === -1) {v[i] = num;}
          }
        }
    }

    return v;
};


//exporta las funciones
exports = module.exports = {
	contar,
	vector,
	quiz,
	borra,
	add,
	actualiza,
	ordena
};


