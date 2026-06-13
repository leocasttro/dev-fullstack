import express from 'express';
import cors from 'cors';
import atendimentosRoutes from './routes/atendimentosRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/atendimentos', atendimentosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})