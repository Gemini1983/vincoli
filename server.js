const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // Puoi usare qualsiasi porta disponibile


const uri = "mongodb://webusr:wmLf6Uu00t3WRuAT@vincoli-shard-00-00.upvff.mongodb.net:27017,vincoli-shard-00-01.upvff.mongodb.net:27017,vincoli-shard-00-02.upvff.mongodb.net:27017/vincoli?ssl=true&replicaSet=atlas-vmzue4-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('client')); // Aggiungi questa riga


app.get('/api', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("vincoli"); // Nome del tuo database
        const collection = database.collection('vincoli'); // Nome della tua collezione

        // Puoi personalizzare la query in base alle tue necessità
        const query = { foglio: req.query.foglio, particella: req.query.particella };
        const data = await collection.findOne(query);

        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Dati non trovati');
        }
    } catch (e) {
        res.status(500).send('Errore del server');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
