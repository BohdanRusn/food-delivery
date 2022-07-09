const {Schema, model} = require('mongoose')

const schema = new Schema({
  grocer_id: {type: Number},
  name: {type: String},
})

module.exports = model('Grocer', schema)
