import React from "react";
import { formatPrice } from "../../utility/formatPrice";
import { Panel } from "../Panel/Panel";
import EditInventory from "../EditInventory/EditInventory";
import PubSub from "pubsub-js";
import axios from "../../utility/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const Product = ({
  id,
  name,
  image,
  tags,
  price,
  status,
  updateCartNum,
}) => {
  const _pClass = {
    available: "product",
    unavailable: "product out-stock",
  };

  const toEdit = (event) => {
    PubSub.publish("edit", {
      id,
      name,
      image,
      tags,
      price,
      status,
      toEdit: true,
    });
  };
  let navigate = useNavigate();
  const addCart = async () => {
    if (!global.auth.isLogin()) {
      navigate("/login");
      toast.info("Please Login First");
      return;
    }
    try {
      const response = await axios.get(`/carts?productId=${id}`);
      const carts = response.data;
      if (carts && carts.length > 0) {
        const cart = carts[0];
        cart.mount += 1;
        await axios.put(`/carts/${cart.id}`, cart);
      } else {
        const cart = {
          productId: id,
          name,
          image,
          price,
          mount: 1,
        };
        await axios.post("/carts", cart);
      }
      toast.success("add cart success");
      updateCartNum();
    } catch (error) {
      toast.error("add cart failed");
    }
  };

  const renderManageBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <div className="p-head has-text-right">
          <span className="icon edit-btn" onClick={toEdit}>
            <i className="fas fa-sliders-h"></i>
          </span>
        </div>
      );
    }
  };

  return (
    <div className={_pClass[status]}>
      <div className="p-content">
        {renderManageBtn()}
        <div className="img-wrapper">
          <div className="out-stock-text">Out of Stock</div>
          <figure className="img is-4by3">
            <img src={image} alt={name} />
          </figure>
        </div>
        <p className="p-tags">{tags}</p>
        <p className="p-name">{name}</p>
      </div>
      <div className="p-footer">
        <p className="price">{formatPrice(price)}</p>
        <button
          className="add-cart"
          disabled={status === "unavailable"}
          onClick={addCart}
        >
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-exclamation"></i>
        </button>
      </div>
    </div>
  );
};
