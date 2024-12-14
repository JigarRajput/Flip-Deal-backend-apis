// Jai Ganesh
const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2; // 2 points per $1

app.get('/cart-total', (req, res) => {
  const { newItemPrice, cartTotal } = req.query;
  const totalPrice = parseFloat(newItemPrice) + parseFloat(cartTotal);
  res.send(totalPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  const { cartTotal, isMember } = req.query;

  if (isMember === 'true') {
    const parsedCartTotal = parseFloat(cartTotal);
    const discountedPrice =
      parsedCartTotal - (parsedCartTotal * discountPercentage) / 100;

    res.send(discountedPrice.toString());
  } else {
    res.send(cartTotal);
  }
});

app.get('/calculate-tax', (req, res) => {
  const { cartTotal } = req.query;
  const parsedCartTotal = parseFloat(cartTotal);
  const calculatedTax = (parsedCartTotal * taxRate) / 100;

  res.send(calculatedTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const { shippingMethod, distance } = req.query;

  const parsedDistance = parseFloat(distance);

  let days = 0;

  if (shippingMethod.toLowerCase() == 'express') {
    days = parsedDistance / 100;
  } else {
    days = parsedDistance / 50;
  }

  res.send(days.toString());
});

app.get('/shipping-cost', (req, res) => {
  const { weight, distance } = req.query;
  const parsedWeight = parseFloat(weight);
  const parsedDistance = parseFloat(distance);

  const shippingCost = (parsedWeight * parsedDistance * 0.1).toString();

  res.send(shippingCost);
});

app.get('/loyalty-points', (req, res) => {
  const { purchaseAmount } = req.query;

  const finalPoints = (parseFloat(purchaseAmount)*2).toString();

  res.send(finalPoints);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
