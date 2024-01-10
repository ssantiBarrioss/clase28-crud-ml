const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const {readFile, saveFile} = require('../data/dbLogica');

const controller = {
	register: (req,res)=>{
		res.render('createUser')
	},
	storeUser: (req,res)=>{
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			let users= readFile('users');
				const {first_name, last_name, email, password} = req.body;
				console.log(req.body);
				const newUser = {
					first_name: first_name.trim(),
					last_name: last_name,
					email: email,
					password: password.trim(),
				}
				users.push(newUser);
				saveFile(users, 'users')
				res.redirect('/')
			
			} else {
				res.render('createUser', { errors: errors.mapped(), old: req.body });
			console.log(errors);
		}
		
	}
};

module.exports = controller;
