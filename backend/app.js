const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/test', (req, res) => {
    res.send('Hello from server!');
});

app.use('/api/customers', customerRoutes);

module.exports = app;
