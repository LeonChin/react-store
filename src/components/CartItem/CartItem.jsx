import axios from "../../utility/axios";
import React from "react";
import { useState } from "react";
import { formatPrice } from "../../utility/formatPrice";

export const CartItem = (props) => {
  const { image, name, price, id } = props.cart || [];
  const [mount, setMount] = useState(props.cart.mount);
  const sumPrice = formatPrice(mount * parseInt(price));

  const handleChange = (e) => {
    const newMount = parseInt(e.target.value);
    setMount(newMount);
    const newCart = { ...props.cart, mount: newMount };
    axios.put(`http://localhost:3004/carts/${id}`, newCart).then((res) => {
      props.updateCart(newCart);
    });
  };

  const deleteCart = () => {
    axios.delete(`http://localhost:3004/carts/${id}`).then((res) => {
      props.deleteCart(props.cart);
    });
  };

  return (
    <div className="columns is-vcentered">
      <div className="column is-narrow" onClick={deleteCart}>
        <span className="close">X</span>
      </div>
      <div className="column is-narrow">
        <img src={image} alt={name} width="100" />
      </div>
      <div className="column cart-name is-narrow">{name}</div>
      <div className="column">
        <span className="price">{formatPrice(price)}</span>
      </div>
      <div className="column">
        <input
          type="number"
          className="input num-imput"
          value={mount}
          min={1}
          onChange={handleChange}
        />
      </div>
      <div className="colunm">
        <span className="sum-pirce">{sumPrice}</span>
      </div>
    </div>
  );
};
