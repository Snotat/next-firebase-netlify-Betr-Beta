import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./firebaseConfig";
import Subscription from "@/app/interfaces/Subscription";
import logger from "@/logger";

async function populateFirestoreWithDummyData() {
  const db = getFirestore(app);

  const dummySubscriptions: Subscription[] = [
    {
      orderId: 1,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 2,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 3,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 4,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 5,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 6,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
    {
      orderId: 7,
      subscriptionName: "Example Subscription 1",
      paymentCycle: "Monthly",
      status: "Active",
      subscriptionStartDate: "2023-09-01",
      subscriptionEndDate: "2023-10-01",
      trialSubscriptionEndDate: "2023-09-15",
      nextPaymentDueDate: "2023-10-01",
      nextPaymentAmount: "$19.99",
      emailAddress: "jkpordje@gmail.com",
    },
  ];

  for (const subscription of dummySubscriptions) {
    await addDoc(collection(db, "subscriptions"), subscription);
  }

  logger.info("Dummy data added to firebase")
}

export default populateFirestoreWithDummyData();
