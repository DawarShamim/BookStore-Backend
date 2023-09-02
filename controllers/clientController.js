const Client = require("../models/Client");
const User = require("../models/User");
const mongoose = require('mongoose');

exports.createNew = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const name = req.body?.name;
        const address = req.body?.address;
        const email = req.body?.email;
        const phoneNumber = req.body?.phonenumber;
        const UserName = req.body?.username;
        const Password = req.body?.password;

        // Create a new Client instance using the provided data
        const newClient = new Client({
            Name: name,
            Address: address,
            Email: email,
            PhoneNumber: phoneNumber
        });

        // Save the new client within the ongoing transaction
        await newClient.save({ session });

        let newUser = await User.findOne({ username: UserName });
        if (!newUser) {
            newUser = new User({
                Username: UserName,
                Password: Password,
                Role: 'Client',
                _id: newClient._id
            });
            // Save the new user within the ongoing transaction
            await newUser.save({ session });
        } else {
            return res.status(409).json({ message: "Username not available" });
        }
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Send a response indicating success and include the created client data
        res.status(200).json({ message: 'Client created successfully', Client: newClient });
    } catch (error) {
        // If an error occurs, abort the transaction and pass the error to the error handling middleware
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const query = req.query;
        let allClients;
        if (Object.keys(query).length === 0) {
            // No query parameters, retrieve all clients
            allClients = await Client.find();
        } else {
            // Using  query parameters to filter clients
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
