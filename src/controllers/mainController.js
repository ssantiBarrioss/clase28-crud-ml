const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const {readFile, saveFile} = require('../data/dbLogica');

const controller = {
	index: (req, res) => {
		let products = readFile('products');
		const visited= products.filter(product=> product.category =="visited");
		const inSale= products.filter(product=> product.category =="in-sale");
		res.render("index", {visited, inSale, toThousand});
	},
	search: (req, res) => {
		let products = readFile('products');
		let userSearch = req.query.keywords
		let productsResults =[];

		for (let i=0; i < products.length; i++ ){
			if(products[i].name.toUpperCase().includes(userSearch.toUpperCase())){
				productsResults.push(products[i])
			}
		}
		
		res.render("results", {productsResults,userSearch, toThousand})
	
	},
	
};

module.exports = controller;
