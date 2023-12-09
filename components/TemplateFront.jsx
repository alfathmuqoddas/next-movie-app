import Link from "next/link";
import { CardWrap } from "./Card";

export const TemplateFront2 = ({
  content,
  templateName,
  seeAll,
  contentLink,
}) => {
  return (
    <>
      <div className="py-12">
        <div className="flex items-center">
          <h3 className="px-8 text-2xl font-extrabold">{templateName}</h3>
          <Link href={`/${seeAll}`}>
            <h4 className="hover:underline">See More →</h4>
          </Link>
        </div>
        <div className="overflow-auto pt-6">
          <div className="px-8 flex flex-nowrap gap-6">
            {content &&
              content.map((contentData) => (
                <CardWrap
                  key={contentData.id}
                  size="w-48"
                  link={contentLink}
                  {...contentData}
                />
              ))}
          </div>
        </div>
      </div>
    </>
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
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-8">
          {content &&
            content.map((contentData, index) => (
              <CardWrap
                key={index}
                size=""
                link={contentLink}
                {...contentData}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFront;
