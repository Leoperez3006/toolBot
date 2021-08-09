const fs = require ('fs'); // para archivos
const ora = require('ora'); // para spinner de carga
const chalk = require('chalk'); //para logs de colores
const { Client } = require('whatsapp-web.js'); //modulo de whatsapp
const qrcode = require('qrcode-terminal'); //generador de qr
const fetch = require("node-fetch");
const { json } = require('express');

const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;


/**
 * Funcion que trabaja cuando una session ya esta lista
 */
const withSession = () => {
    // Si la sesion ya existe, cargamos la sesion desde el archivo de session.json
    const spinner = ora(`Cargando ${chalk.yellow('Validando sesion de Whatsapp')}`);
    sessionData = require(SESSION_FILE_PATH);
    spinner.start();
    client = new Client({
        session: sessionData
    });
    client.on('ready', () => {
        console.log(chalk.green('\nEl cliente esta listo'));
        spinner.stop();
        receiveMessages();
    });

    client.on('auth_failure', () => {
        spinner.stop();
        console.log(chalk.red('Hubo un error en la autenticacion. \n Sesion expirada'));
    })

    client.initialize();
};


/**
 * FUncion para generar codigo QR
 */
const withoutSession = () => { 
    client = new Client ();
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('authenticated', (session) =>{
        //Guardar las credenciales de la session
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session),  (err) => {
            if(err){
                console.log(err);
            }
        });
    });
    client.initialize();
};

const sendMessage = (to, message) => {
    client.sendMessage(to, message);
}


/**
 * Funcion que recibe los mensajes
 */
const receiveMessages= () => {
    client.on('message', async (msg) => {

        const {from, to, body} = msg;
        console.log(chalk.blue('Informacion del mensaje'), chalk.cyan(from, to, body));
        const comand = getCommand(string_to_array(body));


        switch(comand) {
            case 'wiki:':
                let answer = await goWiki(getSearch(string_to_array(body)));
                sendMessage(from, answer);
                break;
            case 'maps:':
                sendMessage(from, 'Todavia estamos trabajando en esta funcion\n Quedate al pendiente de actualizaciones futuras 😉');
                break;
            case 'lens:':
                sendMessage(from, 'Todavia estamos trabajando en esta funcion\n Quedate al pendiente de actualizaciones futuras 😉');
                break;
            case 'info:':
                sendMessage(from, 'Hola ✌️\n Yo soy toolBot 🤖 \n Soy un proyecto de codigo abierto creado por Leonardo Perez\n Todavia me encuentro en una fase muy temprana de desarrollo, pero con tu ayuda podremos hacer de esto algo mucho mas grande, \n Si te interesa contribuir, ponte en contacto conmigo😉. \n Este es el proyecto de GitHub https://github.com/Leoperez3006/toolBot 😺 \n \n Los comando que puedes usar conmigo son: \n ▫️ wiki: + busqueda \n ▫️ maps: + un lugar \n ▫️ lens: + una foto\n');
                break;
            default:
                sendMessage(from, "Hola! No reconozco ese comando 😕 intenta con: \n ▫️ wiki: + tu busqueda \n ▫️ maps: + un lugar\n ▫️ lens: + una foto\n ▫️ info: ");

        }
    })
}

function returnData (str) {
    var myData = new Object ();
    let array= str.trim().split(":");
    myData.command = array[0];
}

/**
 * Funcion que convierte una string en un array 
 * @param {una string} str 
 * @returns{un array} array
 */
 function string_to_array (str) {
    let array= str.trim().split(" ");
    // console.log(str.trim().split(" "));
    return array;
};

/**
 * Funcionque identica el comando dentro de la funcion 
 * @param {array} array 
 * @returns {comando} command  
 */
 function getCommand (array) {
    let command = array[0];
    command = command.toLowerCase();
    console.log(chalk.magenta('El comando a usar es: ' + command));
    return command;
};

function getSearch (array) {
    let search = '';
    let size = array.length;
    for (let i = 1; i<array.length-1; i++) {
        search = search + array[i] + '_';
    }
    search =  search + array[size-1];
    return search;
};


/**
 * 
 * @param {La busqueda a realizar en wikipedia} s 
 * @returns el extracto de la busqueda realizada
 */
async function goWiki(s) {
    //let ext = '';
    let theUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${s}`;
    let response = await fetch(theUrl);
    let myJson = await response.json();
    let ext = myJson.extract;
    let title = myJson.title;
    let page = myJson.content_urls.mobile.page; 
    console.log('Extract: ', ext);

    let ans = '*'+ title+ '* \n' + '\n Segun wikipedia:\n\n _' + ext + '_\n \n Si quieres mas informacion visita: \n' + page;
    console.log(chalk.yellow(ans));
    return ans;
}



(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withoutSession();