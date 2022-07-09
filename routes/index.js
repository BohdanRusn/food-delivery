const express = require('express');
const router = express.Router();
const unit = require('../controllers/unit')
const Order = require('../models/Order')
const OrderPreview = require('../models/OrderPreview')


router
      .post('/send', async (req, res) => {
        try {
          const order = new Order(req.body)
          await order.save();
          res.json({status: 200})
        } catch (error) {
          res.json({status: 500, body: 'Something went wrong, try again'})
        }
      })
      .post('/sentPreviewOrder', async (req, res) => {
        try {
          const order = new OrderPreview(req.body)
          await order.save();
          res.json({status: 200})
        } catch (error) {
          res.json({status: 500, body: 'Something went wrong, try again'})

        }
      })
      .delete('/delete/:id', unit.deleteById)
      .delete('/deleteAllFromPreview', unit.deleteAllFromPreview)
      .get('/getAllUnits',  unit.getAllUnits)
      .get('/getPreviewOrder',  unit.getPreviewOrder)
      .get('/getFilteredData', unit.filteredData);

module.exports = router;
