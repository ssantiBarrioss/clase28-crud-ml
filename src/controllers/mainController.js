const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		const visited= products.filter(product=> product.category =="visited");
		const inSale= products.filter(product=> product.category =="in-sale");
		res.render("index", {visited, inSale, toThousand});
	},
	search: (req, res) => {
		let userSearch = req.query.keywords
		let productsResults =[];

		for (let i=0; i < products.length; i++ ){
			if(products[i].name.includes(userSearch)){
				productsResults.push(products[i])
			}
		}
		
		res.render("results", {productsResults, toThousand})
	},
};

module.exports = controller;
