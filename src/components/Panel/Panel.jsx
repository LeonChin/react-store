import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PubSub from "pubsub-js";
import AddInventory from "../AddInventory/AddInventory";
import EditInventory from "../EditInventory/EditInventory";

export const Panel = () => {
  const [isActive, setIsActive] = useState(false);
  const [isEiditable, setIsEditable] = useState(false);
  const [editObject, setEditObject] = useState([]);

  const close = () => {
    setIsActive(false);
    setIsEditable(false);
  };

  useEffect(() => {
    let token = PubSub.subscribe("open", (_, stateVaule) => {
      setIsActive(stateVaule);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [isActive]);

  useEffect(() => {
    let token = PubSub.subscribe("edit", (_, editObj) => {
      setIsActive(true);
      setIsEditable(editObj.toEdit);
      setEditObject({ ...editObj });
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, [isEiditable]);

  return (
    <div className={isActive ? "panel-wrapper active" : "panel-wrapper"}>
      <div className="over-layer" onClick={close}></div>
      <div className="panel">
        <div className="head">
          <span className="close" onClick={close}>
            x
          </span>
          {isEiditable ? (
            <EditInventory
              close={close}
              key={new Date().getTime()}
              {...editObject}
            />
          ) : (
            <AddInventory close={close} key={new Date().getTime()} />
          )}
        </div>
      </div>
    </div>
  );
};

const _div = document.createElement("div");
document.body.appendChild(_div);

const _panel = ReactDOM.render(<Panel />, _div);
export default _panel;
