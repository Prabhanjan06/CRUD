import React from "react";

function Buttons(props) {
  return (
    <div className="buttons">
      <button className={props.className} type={props.type} name={props.name}>
        {props.label}
      </button>
    </div>
  );
}

export default Buttons;
