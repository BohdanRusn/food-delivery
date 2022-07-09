const {Schema, model} = require('mongoose')

const schema = new Schema({
  unit_id: {type: Number},
  unit_name: {type: String},
  grocer_id: {type: Number},
  price: {type: Number},
  thumbnail: {type: String},
})

module.exports = model('Unit', schema)
