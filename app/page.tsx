"use client";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
const localOptionsDefault = [

  {
    operator: "zaad",
    shortNumber: "25263",
    isSelected: false,
  },
  {
    operator: "evc",
    shortNumber: "252",
    isSelected: true,
  },
  {
    operator: "sahal",
    shortNumber: "252",
    isSelected: false,
  },
]


export default function Home() {

  const [paymentMethod, setPaymentMethod] = useState('local');

  const [localPaymentOptions, setLocalPaymentOptions] = useState(localOptionsDefault);

  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const [orderId, setOrderId] = useState('33321232'); // Set your order ID here


  const handlePaymentClickOption = (index: number) => {

    setLocalPaymentOptions(localPaymentOptions.map((option, i) => ({
      ...option,
      isSelected: i === index
    })))
  }

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

    try {
      setLoading(true)
      const response = await axios.post('/api/local', {
        phone,
        amount,
        // operator: "zadd"
      })

      toast.success(response.data.params.description);

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("error", error);
      // toast.error(response.data.params.description)
    }
  }

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://test-gateway.mastercard.com/static/checkout/checkout.min.js";

    script.async = true;
    script.onload = () => console.log("master card script loaded");
    document.body.appendChild(script);

    // clean up
    return () => {
      document.body.removeChild(script);
    }
  }, []);



  const configureCheckout = (sessionId: string) => {

    if (!window.Checkout) {
      console.log("checkout script not loaded");
      return
    }


    window.Checkout.configure({
      session: {
        id: sessionId,
      },
      order: {
        description: "Order something",
        id: orderId
      },
      interaction: {
        operation: 'PURCHASE',
        merchant: {
          name: "Dugsiiye",
          // address: {
          //   line1: '123 Premier bank Street',
          //   line2: 'StreetAddressLine2',
          // },
        },
      },
    })
    window.Checkout.showPaymentPage();
  }



  const handleOnlinePayment = async () => {
    try {
      const response = await axios.post('/api/online',
        {
          amount: 20,
          returnUrl: 'http://localhost:3000/success',
        }
      );

      const data = response.data;

      setSessionId(data.session.id);
      configureCheckout(data.session.id);

    } catch (error) {
      console.log("err", error)
    }
  }




  return (
    <>
      <Toaster />
      <main className="container mx-auto p-4">

        <h1 className="text-2xl font-bold mb-4">Payments</h1>

        <div className="mb-4">
          <button
            className={`mr-2 ${paymentMethod === "local" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}  p-2 rounded`}
            onClick={() => setPaymentMethod("local")}
          >
            Local Payment
          </button>


          <button
            className={`mr-2  p-2 rounded ${paymentMethod === "online" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setPaymentMethod("online")}
          >
            Online Payment
          </button>
        </div>


        {

          paymentMethod === "local" && (

            <div className="max-w-2xl">
              <h2 className="text-xl mb-2">Local Payment Options</h2>

              {
                localPaymentOptions.map((option, index) => (
                  <div
                    onClick={() => handlePaymentClickOption(index)}

                    className={`w-full bg-gray-50 rounded border-2 ${option.isSelected && "border-blue-500"}  p-2  my-2 cursor-pointer`} key={option.operator}>
                    <h2>{option.operator}</h2>
                  </div>
                ))
              }

              <form onSubmit={handleSubmit}>
                <input

                  type="text"
                  className="mb-2 p-2 border w-full rounded"
                  placeholder="Enter your payment number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  className="mb-2 p-2 border w-full rounded"
                  placeholder="Enter your amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button className="mr-2  p-2 rounded bg-blue-500 text-white">{loading ? "Paying..." : "Pay now"}</button>
              </form>
            </div>
          )
        }

        {
          paymentMethod === "online" && (
            <>
              <h2 className="text-xl mb-2">Online Payment Options</h2>

              <button onClick={handleOnlinePayment}>Pay now</button>
              <div id="embedded-checkout"></div>
            </>
          )
        }

      </main >
    </>
  );
}
