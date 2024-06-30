import { useState } from "react";

const RadioGroup = ({ name, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div role="group" aria-labelledby={name}>
      <div className="flex align-center gap-4">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              id={name}
              className="peer sr-only"
              checked={selectedValue === option.value}
              onChange={handleChange}
            />
            <div className="rounded-[99px] text-white ring-1 ring-white peer-checked:bg-white transition-all peer-checked:text-black peer-checked:ring-white py-1 px-6">
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
