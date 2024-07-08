const Customer = require('../models/customer');

class CustomerService {

    async getAllCustomers() {
        try {
            const existingCustomers = await Customer.find();
            return existingCustomers;
        } catch (error) {
            throw new Error('Database Error: Unable to retrieve clients');
        }
    }

    async getCustomerById(id) {
        try {
            const existingCustomer = await Customer.findById(id);
            if (!existingCustomer) throw new Error('Client Not Found');
            return existingCustomer;
        } catch (error) {
            throw new Error(error.message.includes('Client Not Found') ? error.message : 'Database Error: Unable to retrieve client');
        }
    }

    async addCustomer(body) {
        try {
            const newCustomer = new Customer({
                name: body.name,
                designation: body.designation,
                bio: body.bio,
                contactDetails: body.contactDetails,
                profiles: body.profiles,
                customerStatus: body.customerStatus,
                projectStatus: body.projectStatus,
                profilePicture: body.profilePicture,
            });
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            throw new Error('Database Error: Unable to add client');
        }
    }

    async updateCustomer(id, body) {
        try {
            const existingCustomer = await Customer.findByIdAndUpdate(id, {
                customerStatus: body.customerStatus,
                projectStatus: body.projectStatus
            });
            if (!existingCustomer) throw new Error('Client Not Found');
            return existingCustomer;
        } catch (error) {
            throw new Error(error.message.includes('Client Not Found') ? error.message : 'Database Error: Unable to update client');
        }
    }

    async deleteCustomer(id) {
        try {
            const existingCustomer = await Customer.findByIdAndDelete(id);
            if (!existingCustomer) throw new Error('Client Not Found');
            return true;
        } catch (error) {
            throw new Error(error.message.includes('Client Not Found') ? error.message : 'Database Error: Unable to delete client');
        }
    }
}

module.exports = CustomerService;