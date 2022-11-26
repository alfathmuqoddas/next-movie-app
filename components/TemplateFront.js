function TemplateFront({ children, templateName }) {
  return (
    <div className="mb-2">
      <h3 className="text-2xl">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">{children}</div>
      </div>
    </div>
  );
}

export default TemplateFront;
