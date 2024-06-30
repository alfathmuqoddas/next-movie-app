const RadioGroup = ({ name, options }) => {
  return (
    <div role="group" aria-labelledby={radioGroupName}>
      <div className="flex align-center gap-4">
        <label>
          <input
            type="radio"
            name="trending-radio"
            value="today"
            id="trending-radio"
            className="peer sr-only"
          />
          <div className="rounded-[99px] text-white ring-1 ring-white peer-checked:bg-white transition-all peer-checked:text-black peer-checked:ring-white py-1 px-6">
            Today
          </div>
        </label>
      </div>
    </div>
  );
};

export default RadioGroup;
