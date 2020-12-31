import express from 'express';
import cors from 'cors';
import { signUpEndpoint } from './endpoints/user/signUp';
import { loginEndpoint } from './endpoints/user/login';

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.post('/signup', signUpEndpoint);
app.post('/login', loginEndpoint);

export default app;
