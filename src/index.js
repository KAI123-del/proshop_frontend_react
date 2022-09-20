import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe("pk_test_51LcWuySGe1QXpDYfRaUDLrBFRCc2QsZfNUNR6rcZcNN4d7aBRQoD6iGrFoSlCLkYAyckeZK7YCH5Koi1T4UTEfFJ00VRpj2GFk")



ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>

)

