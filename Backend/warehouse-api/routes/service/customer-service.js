const Customer = require("../models/customers");

class CustomerService {
    
    /*mapCustomerToResponse(data) {
        return {
            customer_firstName: data.customer_firstName,
            customer_lastName: data.customer_lastName,
            customer_type: data.customer_type,
            address: data.address,
            email: data.email,
        };
    }*/

    async saveCustomerDetails(customerDetails) {
        const customer = new Customer({
            customer_firstName: customerDetails.customer_firstName,
            customer_lastName: customerDetails.customer_lastName,
            customer_type: customerDetails.customer_type,
            tax_id: customerDetails.tax_id,
            terms: customerDetails.terms,
            address: customerDetails.address,
            contact_person: customerDetails.contact_person,
            email: customerDetails.email,
            phone_number: customerDetails.phone_number
        });
        return customer.save();
    }

    async getAllCustomerDetails(){
        const data = await Customer.find();
        /*const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(this.mapOrderToResponse(data[i]));
        }*/
        return data;
    }
}
module.exports = CustomerService;