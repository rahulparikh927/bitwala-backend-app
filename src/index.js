import http from 'http';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.json';
import api from './api';

let app = express();
app.server = http.createServer(app);

app.use(cors({
    exposedHeaders: config.corsHeaders
}));

// Configuring body parser middleware
app.use(bodyParser.json());

app.use('/api', api({ config }));

app.use('/', (req, res) => {
    res.send("Hello World!")
});

app.server.listen(config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app;