import { useSelector } from "react-redux";
import { cartTotalPriceSelector } from "../redux/store";
import {loadStripe} from "@stripe/stripe-js";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

export default function Cart() {
    const cart = useSelector(state => state.cart);
      const totalPrice = useSelector(cartTotalPriceSelector);
      const [email, setEmail] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const stripe = loadStripe("pk_test_51MYB9DEnTYpxrAdMC0hkUJyO6JRTcn7eOaheXtMBaAPN53RR67ZsuXnNEckIXSVGst6RvF2JA0hEQWlIQv88wSim00tuuL61sS");

      let lineItems = cart.map(product => {
        return {
          price: `${product.price_id}`,
          quantity: product.quantity
        }
      })

      const handleFormSubmit = (e) => {
          e.preventDefault();
          setIsLoading(true);

          stripe.then(stripe => {
            stripe.redirectToCheckout({
              lineItems: lineItems,
              mode: "payment",
               successUrl: "http://localhost:3000/home",
              cancelUrl: "http://localhost:3000/cart",
              customerEmail: email
            })
            .then((response) => {
                      console.log(response.error);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      console.log(error);
                    });
                })
      }
  
    return (
      
      <div className="cart-layout">
        <div>
          <h1>Your Cart</h1>
          {cart.length === 0 && (
            <p>You have not added any product to your cart yet.</p>
          )}
          {cart.length > 0 && (
            <>
              <table className="table table-cart">
                <thead>
                  <tr>
                    <th width="25%" className="th-product">
                      Product
                    </th>
                    <th width="20%">Unit price</th>
                    <th width="10%">Quanity</th>
                    <th width="25%">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={product.image}
                            width="30"
                            height="30"
                            alt=""
                          />{" "}
                          {product.name}
                        </td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <strong>${product.price * product.quantity}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="2"></th>
                    <th className="cart-highlight">Total</th>
                    <th className="cart-highlight">${totalPrice}</th>
                  </tr>
                </tfoot>
              </table>

            <form onSubmit={handleFormSubmit} className="pay-form">
            <p>
              Enter your email and then click on pay and your products will be
              delivered to you on the same day!
            </p>
            <Input onChange={e => setEmail(e.target.value)} required autocomplete="email" placeholder="Email" type="email" />
            {isLoading && <Loader />}
            <Button type="submit">Pay</Button>
            </form>
            </>
          )
          }
        </div>
      </div>
                
      
    );
  }
