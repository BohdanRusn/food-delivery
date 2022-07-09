const Unit = require('../models/Unit');
const OrderPreview = require('../models/OrderPreview')

exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.send(units);
  } catch (error) {
    res.send({status: 500, body: 'Something went wrong, try again'})
  }
}

exports.getPreviewOrder = async (req, res) => {
  try {
    const units = await OrderPreview.find();
    const finalPrice = units.reduce((acc, unit) => acc + unit.price, 0);
    res.send([units, finalPrice]);
  } catch (error) {
    res.send({status: 500, body: 'Something went wrong, try again'})
  }
}

exports.filteredData = async (req, res) => {
  try {
    const {filter, id, name} = req.query;
    const units = await Unit.find();
    const filtered = units.filter(unit => unit[filter] === (id?+id:name));
    res.json(filtered);
  } catch (error) {
    res.json({status: 500, body: 'Something went wrong, try again'})
  }
}

exports.deleteById = async (req, res) => {
  try {
    await OrderPreview.findOneAndDelete({ unit_id: +req.params.id });
    res.json({status: 200})
  } catch (error) {
    res.json({status: 500, body: 'Something went wrong, try again'})
  }
}

exports.deleteAllFromPreview = async (req, res) => {
  try {
    await OrderPreview.deleteMany({});
    res.json({status: 200})
  } catch (error) {
    res.json({status: 500, body: 'Something went wrong, try again'})
  }
}

