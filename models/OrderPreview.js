const {Schema, model} = require('mongoose')

const schema = new Schema({
  grocer_id: {type: Number},
  unit_id: {type: Number},
  price: {type: Number},
  unit_name: {type: String}
})

module.exports = model('OrderPreview', schema)
