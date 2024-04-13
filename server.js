import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

//load variables
dotenv.config();

//start server
const app = express();

app.use(express.static('public'));
app.use(express.json());

//home route
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "public" });
});

//stripe
let stripeGateway = stripe(process.env.stripe_api);

app.post("/stripe-checkout", async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^o-9.-]+/g, "") * 100);
        console.log("item-price:", item.price);
        console.log("unitAmount:", unitAmount);
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    images: [item.productImg]
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });
    console.log("lineItems:", lineItems);

    //create check session
    const session = await stripeGateway.checkout.sessions.create
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});