const express = require('express');

const User = require('../models/user');
const { param } = require('../routes/user');


exports.postcontroler = (req, res, next) => {
    const { name, phone, email } = req.body;

    User.create({ name, phone, email })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        });
};

exports.getcontroler = (req, res) => {
    User.findAll()
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        });
};

exports.deleteuser = (req, res, next) => {
    const id = req.params.userid;  
    User.findByPk(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            console.log(user);
            
            return user.destroy();
        })
        .then(() => {
            res.json({ message: 'Deleted successfully' });  // Corrected "massage" to "message" and "delet" to "delete"
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user' });
        });
};

exports.putuser = (req, res, next) => {
    const id = req.params.userid;

    User.findByPk(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.name = req.body.name;
            user.phone = req.body.phone;
            user.email = req.body.email;

            return user.save();
        })
        .then((updatedUser) => {
            res.json({ message: 'User updated successfully', user: updatedUser });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        });
};



