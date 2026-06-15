import express from 'express';
import cors from 'cors';
import atendimentosRoutes from './routes/atendimentosRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/atendimentos', atendimentosRoutes);

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Rota não encontrada',
        data: null,
        meta: null,
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})