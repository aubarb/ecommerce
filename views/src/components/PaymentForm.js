import React, { useState } from "react"
import { CardElement, CartElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";


export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CartElement)
    })

    if (!error) {
      try {
        const {id} = paymentMethod
        const response = await axios.post("http//localhost/5000/payment", {
          amount: 10000,
          id
        })

        if (response.data.success) {
          console.log("Successful payment")
          setSuccess(true)
        }
      } catch (error) {
        console.error(error.message)
      }
    } else {
      console.log(error.message)
    }
  };

    return (
      <>
        {!success ? 
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
        :
        <div>
          <h2>You just bought blbla</h2>
        </div>
        }
      </>
    )
  };
