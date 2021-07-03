const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const { check, validationResult } = require('express-validator');

// @route     GET api/purchases
// @desc      Get all Purchases
// @access    Private
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ date: -1 });
    res.json(purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/purchases
// @desc      Add new Purchase
// @access    Private
router.post('/', async (req, res) => {
  const { equipmentName, quantity, cost, date, vendor, billNo, receiver, description } = req.body;

  console.log(req.body);

  try {
    const newPurchase = new Purchase({
      equipmentName,
      quantity,
      cost,
      date,
      vendor,
      billNo,
      receiver,
      description,
    });

    const purchase = await newPurchase.save();
    res.json(purchase);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/purchases/:id
// @desc      Update Purchase
// @access    Private
router.put('/:id', async (req, res) => {
  const { equipmentName, quantity, cost, date, vendor, billNo, receiver, description } = req.body;

  // Build Purchase Object
  const purchaseFields = {};
  if (equipmentName) purchaseFields.equipmentName = equipmentName;
  if (quantity) purchaseFields.quantity = quantity;
  if (cost) purchaseFields.cost = cost;
  if (date) purchaseFields.date = date;
  if (vendor) purchaseFields.vendor = vendor;
  if (billNo) purchaseFields.billNo = billNo;
  if (receiver) purchaseFields.receiver = receiver;
  if (description) purchaseFields.description = description;

  try {
    let purchase = await Purchase.findById(req.params.id);

    if (!purchase) return res.status(404).json({ msg: 'Contact Not Found' });

    purchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      { $set: purchaseFields },
      { new: true }
    );

    res.json(purchase);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/purchases/:id
// @desc      DELETE Purchase
// @access    Private
router.delete('/:id', async (req, res) => {
  try {
    let purchase = await Purchase.findById(req.params.id);

    if (!purchase) return res.status(404).json({ msg: 'Contact Not Found' });

    await Purchase.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Purchase Removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
