const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const puppeteer = require("puppeteer");
const express = require('express');

/** */

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
})
  
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

/** */

const browserP = puppeteer.launch({
	args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});

	app.get('/asd', (req, res) => {
		res.send(qr);
	})
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    message.body = message.body.toLowerCase();

	if(message.body === '!ping') {
		message.reply('pong');
	}

    if(message.body === 'silva') {
		message.reply('El gei');
	}

    if(message.body === 'david') {
		message.reply('El queu ele');
	}

    if(message.body === 'ditter') {
		message.reply('Se la come');
	}

    if(message.body === 'rocio') {
		message.reply('Mi bb <3');
	}

    if(message.body.includes('sumar')) {
        let n = message.body.split(' ');
        let respuesta = parseInt(n[1]) + parseInt(n[2]);
        
		message.reply(respuesta);
	}
});

client.initialize();