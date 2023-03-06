import { useContext, memo } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/card-context';

const Cart = (props) => {
  const cardCtx = useContext(CartContext);

  const totalAmount = `$${cardCtx.totalAmount.toFixed(2)}`;
  const hasItems = cardCtx.items.length > 0;

  const cartItemRemoveHanlder = (id) => {
    cardCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cardCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cardCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHanlder.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
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
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default memo(Cart);
