const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
  equipmentName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  date: {
    type: String,
  },
  vendor: {
    type: String,
  },
  billNo: {
    type: String,
  },
  receiver: {
    type: String,
  },
  description: {
    type: String,
  },
  pdf: {
    type: String,
  },
});

module.exports = mongoose.model('purchase', PurchaseSchema);
