const {Schema, model} = require('mongoose')

const schema = new Schema({
  order_id: {type: Number},
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  address: {type: String},
  order: [{
    grocer_id: {type: Number},
    unit_id: {type: Number},
    unit_name: {type: String}
  }]
})

module.exports = model('Order', schema)
