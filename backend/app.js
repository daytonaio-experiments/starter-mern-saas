const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('<h2>Welcome to the CRM MERN Application</h2><p>Server is running successfully.</p>');
});

app.get('/test', (req, res) => {
    res.send('Hello from server!');
});

app.use('/api/customers', customerRoutes);  

module.exports = app;
