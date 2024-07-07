const RadioButtonGroup = ({ contents, onChange, checkedFunction }) => {
  const RadioChildrenStyle =
    "rounded-full bg-black text-white peer-checked:bg-white transition-all peer-checked:text-black py-1 px-4";
  const RadioParentStyle = "peer sr-only";
  return (
    <>
      {contents.map((content) => (
        <label className="cursor-pointer">
          <input
            type="radio"
            value={content.value}
            checked={checkedFunction === content.value}
            className={RadioParentStyle}
            onChange={onChange}
          />
          <div className={RadioChildrenStyle}>{content.label}</div>
        </label>
      ))}
    </>
  );
};

export default RadioButtonGroup;
