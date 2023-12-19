const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const {readFile, saveFile} = require('../data/dbLogica');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = readFile('products');
		res.render("products",{products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products= readFile('products');
		const {id}=req.params;
		const product = products.find(product => product.id == id)
		res.render("detail", {title:product.name, product, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const producto=req.body;
		let products= readFile('products');
		producto.id = products[products.length-1].id+1;
		products.push(producto);
		saveFile(products, 'products')
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products= readFile('products');
		const {id}=req.params;
		const productToEdit = products.find(product => product.id == id);
		res.render("product-edit-form", {productToEdit});
		
	},
	// Update - Method to update
	update: (req, res) => {
		let products= readFile('products');
		const {id}=req.params;
		const {name,price,discount,category,description,image}=req.body;
		const newArray= products.map(product=>{
			if(product.id == id){
				return{
					id,
					name:name.trim(),
					price,
					discount,
					category,
					description: description.trim(),
					image: image ? image : product.image
				}	
			}
			return product
		})
		 saveFile(newArray, 'products')
		 res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products= readFile('products');
		const {id} = req.params; 
		const newList = products.filter(element => element.id != id);
		saveFile(newList, 'products')
		res.redirect("/products");
	}
};

module.exports = controller;