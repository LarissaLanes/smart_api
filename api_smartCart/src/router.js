const express = require('express');
const router = express.Router();

const SmartController = require('./controllers/SmartControllers');
const ClienteController = require('./controllers/ClienteController');
const VendedorController = require('./controllers/VendedorController');

// produtos
router.get('/produtos', SmartController.buscarTodos);
router.get('/produtos/:id', SmartController.buscarUm);
router.post('/produtos', SmartController.criarProduto);
router.delete('/produtos/:id', SmartController.excluirProduto);

// cliente
router.post('/cliente', ClienteController.criarConta);
router.post('/cliente/login', ClienteController.fazerLogin)
// vendedor
router.post('/vendedor', VendedorController.criarConta)
router.post('/vendedor/login', VendedorController.fazerLogin)


module.exports = router;
