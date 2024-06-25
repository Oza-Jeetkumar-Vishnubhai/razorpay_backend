// server/api/create-subscription.js (example using Express)
const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const crypto = require('crypto')
const port = 3000;
const cors = require("cors"); 

require("dotenv").config();
// const router = express.Router();
app.use(express.json());
app.use(cors({credentials:true,origin:true}))

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/",(req,res)=>{
  res.json({message:"Hello from express"})
})

app.post("/create-subscription", async (req, res) => {
  const { planId } = req.body;
  console.log(planId);
  console.log("req body : ",req.body)
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 1, // number of billing cycles
      customer_notify: 1,
      // start_at: Math.floor(Date.now() / 1000) + 60, // subscription start time
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/allPlans", async (req, res) => {

  try {
    const plans = await razorpay.plans.all();
    res.json(plans);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/details',async(req,res)=>{
  const {id} = req.body;
  try {
    const details = await razorpay.subscriptions.fetch(id);
    res.json(details)
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// module.exports = router;
