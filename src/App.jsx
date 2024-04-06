import { Component } from "react";
import "./App.css";
import CheckoutStepper from "./components/CheckoutStepper";
import CheckoutForm from "./components/CheckoutForm";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => (
      <div>
        <CheckoutForm content={"Provide your contact details."} />
      </div>
    ),
  },
  {
    name: "Shipping Info",
    Component: () => <CheckoutForm content={"Enter your shipping address."} />,
  },
  {
    name: "Payment",
    Component: () => (
      <CheckoutForm content={"Complete payment for your order."} />
    ),
  },
  {
    name: "Delivered",
    Component: () => (
      <CheckoutForm content={"Your order has been delivered."} />
    ),
  },
];

function App() {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold m-5">Checkout</h2>
      <CheckoutStepper stepConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;
