require("dotenv").config()
const admin = require("firebase-admin");
const express = require("express");
const serviceAccount = require("./serviceAccountKey.json")
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const port = 5000

app.use(express.json())
app.use(bodyParser.json())


const [basic, silver, gold] = ['price_1OHCBCGldazAWVtM9NJHMXJC', 'price_1OHCHXGldazAWVtMqX5fqZZ8', 'price_1OHCK1GldazAWVtMRl155m6Y'];

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://club-house-3fa46-default-rtdb.firebaseio.com"
});

app.use(
    cors({
        origin: "http://localhost:3000"
    })
)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)



const stripeSession = async (plan) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });
        return session;
    } catch (e) {
        return e;
    }
};

app.post("/api/v1/create-subscription-checkout-session", async (req, res) => {
    const { plan, customerId } = req.body;
    let planId = null;
    if (plan == 9.99) planId = basic;
    else if (plan == 49.9) planId = silver;
    else if (plan == 99.9) planId = gold;

    try {

        const session = await stripeSession(planId);
        const user = await admin.auth().getUser(customerId);

        await admin.database().ref("users").child(user.uid).update({
            subscription: {
                sessionId: session.id
            }
        });
        return res.json({ session })

    } catch (error) {
        res.send(error)
    }
})


app.post("/api/v1/payment-success", async (req, res) => {
    const { sessionId, firebaseId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const subscriptionId = session.subscription;
            try {
                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                const user = await admin.auth().getUser(firebaseId);
                const planId = subscription.plan.id;
                const planType = "";
                if (subscription.plan.amount === 9900) planType = "basic"
                else if (subscription.plan.amount === 49900) planType = "silver"
                else if (subscription.plan.amount === 99900) planType = "gold"
                const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
                const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
                const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
                const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();

                await admin.database().ref("users").child(user.uid).update({
                    subscription: {
                        sessionId: null,
                        planId: planId,
                        planType: planType,
                        planStartDate: startDate,
                        planEndDate: endDate,
                        planDuration: durationInDays
                    }
                });


            } catch (error) {
                console.error('Error retrieving subscription:', error);
            }
            return res.json({ message: "Payment successful" });
        } else {
            return res.json({ message: "Payment failed" });
        }
    } catch (error) {
        res.send(error);
    }
});


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})