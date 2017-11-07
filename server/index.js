import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Game off 2017'));
app.use((err, req, res, next) => res.status(400).json({ err }));

app.listen(8080, () => console.log('Application listening on port 8080'));