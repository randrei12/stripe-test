import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./checkout";

const stripePromise = loadStripe("pk_test_iT4ttV6BuQN583tEmxFvmFe100w3ryOoOC");

export default function App() {
    async function onClick() {
        const stripe = await stripePromise;

        const response = await fetch('/api/pay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ priceId: 'price_1OtHkdBF7AptWZlcIjbBpS8r', userId: data.user?.id, email: data.user?.email }),
          });
        const session = await response.json();
        console.log(session);
        
        await stripe?.redirectToCheckout({ sessionId: session.id });
    
    }
 
    return (
        <button onClick={onClick}>
            Buy shit
        </button>
    )
    // const [clientSecret, setClientSecret] = useState("");

    // useEffect(() => {
    //     fetch("/api/create-payment-intent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setClientSecret(data.clientSecret));
    // }, []);

    // return (
    //     <div>
    //         {clientSecret && (
    //             <Elements options={{ clientSecret }} stripe={stripePromise}>
    //                 <CheckoutForm />
    //             </Elements>
    //         )}
    //     </div>
    // )
}
