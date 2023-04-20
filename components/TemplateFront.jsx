import Link from "next/link";
import { CardWrap } from "./Card";

export const TemplateFront2 = ({ content, templateName, seeAll }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-extrabold">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">
          {content &&
            content.map((contentData) => (
              <CardWrap
                key={contentData.id}
                {...contentData}
                size="w-48 xl:w-64"
              />
            ))}
          <Link href={`/${seeAll}`}>
            <div className="w-48 text-2xl">See All</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const TemplateFront = ({ content, templateName }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">{content}</div>
      </div>
    </div>
  );
};

export const GridTemplate = ({ content, templateName }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl">{templateName}</h3>
      <div className="pt-2">
        <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4">
          {content &&
            content.map((contentData, index) => (
              <CardWrap key={index} {...contentData} size="" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFront;
