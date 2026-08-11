import express from 'express';
import cors from 'cors';
import routes from './mapRoutes.js';
import 'dotenv/config';

const api = express();
const PORT = process.env.API_PORT ?? 3000

api.use(cors());
api.use(express.json());

routes.forEach((route) => {
    api.use(route.path, route.router);
});

api.listen(PORT, ()=>{
    console.log(`API: http://localhost:${PORT}`)
})
