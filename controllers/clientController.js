const Client = require("../models/Client");


exports.createNew = async (req, res, next) => {
    try {
        const name = req.body?.name;
        const address = req.body?.address;
        const email = req.body?.email;
        const phonenumber = req.body?.phonenumber;

        const newClient = new Client({
            Name: name,
            Address: address,
            Email: email,
            PhoneNumber: phonenumber
        });

        await newClient.save();
        res.status(200).json({ message: 'Client created', Client: newClient });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const query = req.query; // Query parameters (if any)

        let allClients;

        if (Object.keys(query).length === 0) {
            // No query parameters, retrieve all clients
            allClients = await Client.find();
        } else {
            // Use query parameters to filter clients
            allClients = await Client.find(query);
        }
        if (allClients.length > 0) {
            res.status(200).json({ message: 'Clients found', clients: allClients });
        } else {
            res.status(404).json({ message: 'No clients found' });
        }
    } catch (error) {
        next(error);
    }
};

exports.getSpecificClient = async (req, res) => {

    try {
        const ClientID = req.params.id;
        // Find the author by ID
        const client = await Client.findById(ClientID);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
};

exports.updateClient = async (req, res) => {
    try {
        const ClientID = req.params.id;
        const name = req.body?.name;
        const address = req.body?.address;
        const email = req.body?.email;
        const phonenumber = req.body?.phonenumber;
        const updateData = {
            Name: name,
            Address: address,
            Email: email,
            PhoneNumber: phonenumber
        };
        // Find the book by ID and update the information
        const updatedClient = await Client.findByIdAndUpdate(
            ClientID,
            updateData,
            { new: true, runValidators: true } // Return the updated book and run validation
        );
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(updatedClient);
    }
    catch (error) {
        next(error);
    };
};
