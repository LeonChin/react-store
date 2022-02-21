import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../components/CartItem/CartItem";
import { Layout } from "../../utility/Layout";
import { formatPrice } from "../../utility/formatPrice";

const Cart = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/carts").then((res) => setCarts(res.data));
  }, []);

  const totalPrice = () => {
    const totalPrice = carts
      .map((cart) => {
        return cart.mount * parseInt(cart.price);
      })
      .reduce((a, value) => {
        return a + value;
      }, 0);

    return formatPrice(totalPrice);
  };

  const deleteCart = (cart) => {
    const newCarts = carts.filter((c) => c.id !== cart.id);
    setCarts(newCarts);
  };

  const updateCart = (cart) => {
    const newCarts = [...carts];
    const _index = newCarts.findIndex((c) => c.id === cart.id);
    newCarts.splice(_index, 1, cart);
    setCarts(newCarts);
  };

  return (
    <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          {carts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              deleteCart={deleteCart}
              updateCart={updateCart}
            />
          ))}
        </div>
        <div className="cart-total">
          Total:
          <span className="total-price">{totalPrice()}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
