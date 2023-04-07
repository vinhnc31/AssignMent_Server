const express = require('express');
const route = express.Router();
const sanphamController = require('../Controllers/sanpham.controller')
route.get('/listsanpham',sanphamController.show);
route.get('/addsanpham',sanphamController.index);
route.post('/addsanpham',sanphamController.add);
route.get('/:id/edit',sanphamController.edit);
route.put('/:id',sanphamController.update);
route.delete('/:id',sanphamController.delete);
module.exports = route;