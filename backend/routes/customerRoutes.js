const express = require('express');
const router = express.Router();
const CustomerService = require('../service/customerService');
const customerService = new CustomerService();

router.get('/', async (req, res) => {
    try {
        const allCustomers = await customerService.getAllCustomers();
        if(!allCustomers || allCustomers.length === 0){
            return res.status(404).json({ message: "Client not found!" });
        }
        res.status(200).json({ customers: allCustomers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        res.status(200).json({ customer });
    } catch (error) {
        console.error(error);
        res.status(error.message === 'Client Not Found' ? 404 : 500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCustomer = await customerService.addCustomer(req.body);
        return res.status(201).json({ message: "Client added successfully!", customerId: newCustomer._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Client not found!" });
        }
        res.status(200).json({ message: "Client updated successfully!", customer: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(error.message === 'Client Not Found' ? 404 : 500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await customerService.deleteCustomer(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found!" });
        }
        res.status(200).json({ message: "Client deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(error.message === 'Client Not Found' ? 404 : 500).json({ message: error.message });
    }
});

module.exports = router;