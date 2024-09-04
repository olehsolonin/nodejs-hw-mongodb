import express from 'express';
import contacts from './db/db.js';
import cors from 'cors';
import pino from 'pino-http'

const app = express(); // app - web server - створення сервера

const logger = pino({
	transport: {
		target: "pino-pretty"
	}
}); // створення мідлвари для логера(логування)

app.use(logger); // використовуємо раніше створену мідлвару 


const corsMiddleware = cors(); // створення мідлвари чере функцію з бібліотеки для можливості запитів з будь яких адрес.

app.use(corsMiddleware);  // використовуємо раніше створену мідлвару 

// app.use(cors()); корототкий запис 



app.get('/', (request, response) => {
	response.json({
		message: 'Hello world!',

	});

})

app.get('/contacts', (request, response) => {
	response.json(contacts);

})

app.use((req, res) => {
	res.status(404).json({
		message: `${req.url} not found`
	})
})

app.listen(3000, () => console.log("Server Running 3000 PORT"))  // запуск сервера 