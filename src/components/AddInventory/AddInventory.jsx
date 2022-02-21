import React, { useState } from "react";
import axios from "axios";
import PubSub from "pubsub-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddInventory({ close }) {
  const [newShoe, setNewShoe] = useState({
    name: "",
    price: "",
    tags: "",
    image: "",
    status: "available",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewShoe({ ...newShoe, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const product = { ...newShoe };
    axios.post("http://localhost:3004/products", product).then((res) => {
      console.log(res.data);
      toast.success("Add items successfully");
    });
    PubSub.publish("rerender", true);
    close();
  };
  return (
    <div className="inventory">
      <p className="title has-text-centered">Inventory</p>
      <form onSubmit={submit}>
        <div className="field">
          <div className="control">
            <label className="label">Name</label>
            <textarea
              className="textarea"
              name="name"
              value={newShoe.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Price</label>
            <input
              type="number"
              className="input"
              name="price"
              value={newShoe.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Tags</label>
            <input
              type="text"
              className="input"
              name="tags"
              value={newShoe.tags}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Image</label>
            <input
              type="text"
              className="input"
              name="image"
              value={newShoe.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Status</label>
            <div className="select is-fullwidth">
              <select
                name="status"
                value={newShoe.status}
                onChange={handleChange}
              >
                <option>available</option>
                <option>unavailable</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button" type="button" onClick={close}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
