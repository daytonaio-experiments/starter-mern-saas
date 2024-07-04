const express = require('express');
const router = express.Router();
const CustomerService = require('../service/customerService');
const customerService = new CustomerService();

router.get('/', async (req, res) => {
    try {
        const allCustomers = await customerService.getAllCustomers();
        if(!allCustomers || allCustomers.length === 0){
            return res.status(404).json({ message: "Customers not found!" });
        }
        res.status(200).json({ customers: allCustomers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await customerService.getAllCustomer(req.params.id);
        if(!customer){
            return res.status(404).json({ message: "Customer not found!" });
        }
        res.status(200).json({ customer: customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCustomer = await customerService.addCustomer(req.body);
        if (newCustomer) {
            return res.status(201).json({ message: "Customer added successfully!", customerId: newCustomer._id });
        }
        res.status(409).json({ message: "Customer already exists!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found!" });
        }
        res.status(200).json({ message: "Customer updated successfully!", customer: updatedCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedCustomer = await customerService.deleteCustomer(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found!" });
        }
        res.status(200).json({ message: "Customer deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

module.exports = router;