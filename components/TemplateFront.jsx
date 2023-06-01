import Link from "next/link";
import { CardWrap } from "./Card";

export const TemplateFront2 = ({
  content,
  templateName,
  seeAll,
  contentLink,
}) => {
  return (
    <div className="my-8">
      <h3 className="px-8 text-2xl font-extrabold">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="px-8 flex flex-nowrap gap-6">
          {content &&
            content.map((contentData) => (
              <CardWrap
                key={contentData.id}
                {...contentData}
                size="w-48"
                link={contentLink}
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

export const GridTemplate = ({ content, templateName, contentLink }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl mb-8">{templateName}</h3>
      <div className="">
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-8">
          {content &&
            content.map((contentData, index) => (
              <CardWrap
                key={index}
                {...contentData}
                size=""
                link={contentLink}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFront;
