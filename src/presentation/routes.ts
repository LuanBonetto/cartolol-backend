import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import MulterConfig from '../config/multer';
import { signUpEndpoint } from './endpoints/user/signUp';
import { loginEndpoint } from './endpoints/user/login';
import { createChampionshipEndpoint } from './endpoints/championship/createChampionship';

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post('/user/signup', signUpEndpoint);
app.post('/user/login', loginEndpoint);

app.post('/championship', multer(new MulterConfig().config).single("file"), createChampionshipEndpoint);

export default app;
