function TemplateFront({ content, templateName }) {
  return (
    <div className="my-8">
      <h3 className="text-2xl">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">{content}</div>
      </div>
    </div>
  );
}

export default TemplateFront;
