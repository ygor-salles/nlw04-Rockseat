import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    return res.json({ message: "Hellow world - NLW04" })
});

app.post('/', (req, res) => {
    //recebeu os dados para salvar
    return res.json({ message: "Os dados foram salvos com sucesso" })
})



app.listen(3333, () => console.log('Server is run'));
