// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer's configuration ************
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,path.join(__dirname, '../../public/images/products') );
    },
    filename: (req,file, cb)=>{
        const newFilename = "Img-" + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload= multer({storage})
/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.array('imagenes'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/update/:id', upload.array('imagenes'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
