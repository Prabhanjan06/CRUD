import React from "react";

function FormInputs(props) {
  return (
    <div className="form-floating mb-3">
      <input
        type={props.type}
        className={props.className}
        name={props.name}
        id={props.id}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default FormInputs;
