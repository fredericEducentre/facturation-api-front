// Import des modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Création de l'application Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Données fictives pour les factures
let factures = [
    { id: 1, client: 'Jean Dupont', montant: 200, date: '2023-12-01' },
    { id: 2, client: 'Alice Durand', montant: 450, date: '2023-12-02' }
];

// Routes CRUD pour les factures

// Récupérer toutes les factures
app.get('/factures', (req, res) => {
    res.json(factures);
});

// Récupérer une facture par ID
app.get('/factures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const facture = factures.find(f => f.id === id);
    if (facture) {
        res.json(facture);
    } else {
        res.status(404).json({ message: 'Facture non trouvée' });
    }
});

// Créer une nouvelle facture
app.post('/factures', (req, res) => {
    const nouvelleFacture = {
        id: factures.length ? factures[factures.length - 1].id + 1 : 1,
        client: req.body.client,
        montant: req.body.montant,
        date: req.body.date
    };
    factures.push(nouvelleFacture);
    res.status(201).json(nouvelleFacture);
});

// Mettre à jour une facture existante
app.put('/factures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const factureIndex = factures.findIndex(f => f.id === id);
    if (factureIndex !== -1) {
        factures[factureIndex] = {
            id: id,
            client: req.body.client,
            montant: req.body.montant,
            date: req.body.date
        };
        res.json(factures[factureIndex]);
    } else {
        res.status(404).json({ message: 'Facture non trouvée' });
    }
});

// Supprimer une facture
app.delete('/factures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const factureIndex = factures.findIndex(f => f.id === id);
    if (factureIndex !== -1) {
        factures.splice(factureIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Facture non trouvée' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur de facturation démarré sur http://localhost:${PORT}`);
});
