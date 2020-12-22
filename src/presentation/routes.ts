import express from 'express';
import cors from 'cors';
import { signUpEndpoint } from './endpoints/user/signUp';

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.post('/signup', signUpEndpoint);

export default app;
