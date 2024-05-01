import express from "express";
import cors from "cors"
import Stripe from "stripe";

const stripe = new Stripe("sk_test_KQXKirxSkzJ0Ld1pnmM8ZdFO00jwIRzkMr");

const app = express();

app.use(cors({
    origin: "*"
}));

// (async () => {
//     const customer = await stripe.customers.create({
//         name: "Comtsu | Andrei Neamtu",
//         email: "neamtucosmin2017@gmail.com"
//     })

    
//     // Create a PaymentIntent with the order amount and currency
//     await stripe.subscriptions.create({
//         customer: customer.id,
//         items: [
//             {
//                 price: price.id,
//                 quantity: 5
//             }
//         ]
//     })

// })();

app.post("/pay", async (req, res) => {
    const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: 100000,
        recurring: {
            interval: "day"
        },
        product_data: {
            name: "Closed Source Fundation & Big Corporations Fundation & Pro Windows (and anti Linux) Fundation & Anti EU anti-trust laws Fundation PREMIUM EDITION",
        }
    })

    const session = await stripe.checkout.sessions.create({
        metadata: {
            user_id: "Comtsu | Andrei Neamtu",
        },
        customer_email: "neamtucosmin2017@gmail.com",
        payment_method_types: ['card'],
        line_items: [
            {
                quantity: 5,
                // base subscription
                price: price.id,
            },
        ],
        mode: 'subscription',
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
    });

    res.send({ id: session.id })
})

app.post("/create-payment-intent", async (req, res) => {
    try {
   
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: 1000,
        //     currency: "usd",
        //     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        //     automatic_payment_methods: {
        //         enabled: true,
        //     }, 
        // });
    
        // res.send({
        //     clientSecret: paymentIntent.client_secret,
        // });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});


app.listen(8080, () => console.log("server started on 8080"));