import { useContext, useState } from "react";
import CartContext from "../Context_Store/Cart-Context";
import { Modal } from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

/*
Cart component is responsible for rendering the cart items,
total amount and providing functionalities like adding, removing items
from the cart and also handling the checkout process.
*/

export const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  // Getting the cart context
  const cartCtx = useContext(CartContext);

  // Calculating the total amount and checking if there are any items in the cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  /*
 Handler for removing an item from the cart
 */
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  /*
 Handler for adding an item to the cart
 */
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  /*
 Handler for triggering the checkout process
 */
  const orderHandler = () => {
    setIsCheckout(true);
  };

  /*
 Handler for submitting the order data
 */
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    // Sending a POST request to the firebase database
    await fetch(
      "https://food-order-app-aac5b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  return (
    <Modal onClose={props.onClose}>
      {/* If there are no items in the cart, display a message */}
      {!hasItems && <p>No items added yet.</p>}

      {/* If there are items in the cart, display the cart items and the total amount */}
      {hasItems && (
        <>
          <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            {/* If there are items in the cart, display the order button */}
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </>
      )}

      {/* If the checkout is triggered, display the checkout component */}
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}

      {/* If the order is submitted, display a success message */}
      {didSubmit && (
        <p>Successfully sent the order data. You can close this message now.</p>
      )}
    </Modal>
  );
};
