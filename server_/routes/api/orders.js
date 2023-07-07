// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Item = require('../../models/Item');
const express = require('express');

const router = express.Router();

// const YOUR_DOMAIN = 'http://localhost:3001';

// @route    GET api/orders
// @desc     Get all items
// @access   Public
router.post('/', async (req, res) => {
    const { products, userName, email } = req.body;
    // console.log(products);
    try{
        const lineItems = await Promise.all(
            products.map(async (product) => {
              const item = await Item.findById(product._id);
    
              return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.price * 100,
                },
                quantity: product.count,
              };
            })
        );
        console.log(lineItems);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: email,
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3001/checkout/success",
            cancel_url: "http://localhost:3001",
          });
        //   console.log(session);
          res.json(session);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
//   res.redirect(303, session.url);
});
module.exports = router;
