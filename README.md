# WhatsApp toolBot
##### _By Leonardo Perez_



WhatsApp toolBot es un proyecto de codigo abierto creado para facilitar busquedas de internet


## Caracteristicas

toolBot cuenta con caracteristicas en las que apenas se esta trabajando, pero por el momento las tres que se tienen pensadas son: 

- [x] Busquedas de wikipedia
- [ ] Busquedas a traves de reconocimiento de imagenes
- [ ]  Busqueda de lugares


## Tecnologias

toolBot utiliza librerias de node.js para funcionar

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - Cliente de API de whatsApp
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) - Generador de codigos QR para conectar whatsApp
-  [fetch](https://javascript.info/fetch) - Para hacer peticiones
-  [fs](https://nodejs.dev/learn/the-nodejs-fs-module) - modulo de sistema de archivos
-  [ora](https://github.com/sindresorhus/ora) - Aspectos visuales (Spinner)
-  [chalk](https://github.com/chalk/chalk) - Aspectos visuales (logs de colores)

Por supuesto, toolBot cuenta con su repositorio abierto en GitHub 😺
> Nota: `WhatsApp no permite bots o clientes no oficiales en su plataforma, por lo que esto no debe considerarse totalmente seguro.`

## Instalacion

toolBot requiere de [Node.js](https://nodejs.org/) v12+ para funcionar.

De igual forma se requiere de instalar las librerias listadas anteriormente


```sh
$ npm i whatsapp-web.js

$ npm install qrcode-terminal

$ npm install fetch

$ npm install ora

$ npm install chalk
```


El modulo de ndoe FS no es necesario instalarlo, pero si requerirlo

```sh
const fs = require('fs')
```

De igual forma las demas librerias 
```sh
const fs = require ('fs'); 
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); 
const ora = require('ora'); 
const chalk = require('chalk'); 
const fetch = require("node-fetch");
const { json } = require('express');
```


## Licencia 

**Es codigo abierto 😉 ¡usalo porfavor!**
