import express from "express";
import cors from "cors"
import Stripe from "stripe";

const stripe = Stripe("sk_test_KQXKirxSkzJ0Ld1pnmM8ZdFO00jwIRzkMr");

const app = express();

app.use(cors({
    origin: "*"
}))

app.post("/create-payment-intent", async (req, res) => {
    try {
        console.log('asdasdasd');
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
    
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});


app.listen(8080, () => console.log("server started on 8080"));