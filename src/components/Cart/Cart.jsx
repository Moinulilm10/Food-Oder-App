import { useContext } from "react";
import { Modal } from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../Context_Store/Cart-Context";
import CartItem from "./CartItem";

export const Cart = (props) => {
  const cartCtnx = useContext(CartContext);

  const totalAmount = `$${cartCtnx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtnx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtnx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler}
          onAdd={cartItemAddHandler}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
