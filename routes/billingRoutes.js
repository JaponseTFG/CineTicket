const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post("/api/stripe",requireLogin, async (req,res)=>{
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency:'eur',
      source: req.body.id,
      description: "Compra entradas"
    });

    req.user.credits += 5;
    const user = await req.user.save();//saverequest

    res.send(user);
    console.log(req.body);
  });

};
