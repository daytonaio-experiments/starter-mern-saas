const Customer = require('../models/customer');

class CustomerService {
    async getAllCustomers() {
        const existingCustomers = await Customer.find();
        return existingCustomers;
    }

    async getAllCustomer(id) {
        const existingCustomers = await Customer.findById(id);
        return existingCustomers;
    }

    async addCustomer(body) {

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
        return true;
    }

    async updateCustomer(id, body) {
        const existingCustomer = await Customer.findByIdAndUpdate(id, {
            customerStatus: body.customerStatus,
            projectStatus: body.projectStatus
        });

        if (!existingCustomer) {
            return false;
        }

        return true;
    }

    async deleteCustomer(id) {
        const existingCustomer = await Customer.findByIdAndDelete(id);
        if (!existingCustomer) {
            return false;
        }

        return true;
    }
}

module.exports = CustomerService;