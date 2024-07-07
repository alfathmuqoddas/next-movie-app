import { useState } from "react";

const RadioButton = ({ value, label, name, onChange, checked }) => {
  const [isChecked, setIsChecked] = useState(checked || false); // Handle default checked state

  const handleChange = (event) => {
    setIsChecked(true);
    onChange(event); // Call provided onChange handler if available
  };

  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        name={name} // Important for ensuring only one radio button is selected within a group
      />
      {label}
    </label>
  );
};

export default RadioButton;
