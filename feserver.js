import express from 'express';
import path from 'path';
import cors from 'cors';
import timeout from 'connect-timeout';
import dotenv from 'dotenv';

const app = express();
const port = 3001;
dotenv.config();

// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'CSS')));
app.use(express.static(path.join(__dirname, 'JS')));
app.use(timeout('5s'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/HTML', 'loginpage.html'));
});
app.get('/sinup', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'sinup.html'));
});
app.get('/dialog', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'dialog.html'));
});
app.get('/adddialog', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'adddialog.html'));
});
app.get('/infochange', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'infochange.html'));
});
app.get('/writingpage', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'writingpage.html'));
});
app.get('/writingchange', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'writingchange.html'));
});
app.get('/passwordcange', (req, res) => {
    res.sendFile(path.join(__dirname, './HTML', 'passwordcange.html'));
});

app.listen(port, () => {
    console.log(`server start!! port ${port}`);
});
