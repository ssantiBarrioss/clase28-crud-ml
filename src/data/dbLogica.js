 const fs = require('fs');
 const path = require('path');

 const readFile = (nameFile) =>{
     const filePath = path.join(__dirname, "../data", nameFile + ".json");
     let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
     return products
 }

 const saveFile = (newArray, nameFile)=>{
     const pathFile = path.join(__dirname, "../data", nameFile + ".json");
     let dataJson = JSON.stringify(newArray);
     fs.writeFileSync(pathFile, dataJson, 'utf-8')
 }

module.exports = {readFile, saveFile}