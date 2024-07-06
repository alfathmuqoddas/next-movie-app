import { CardWrap } from "./Card";
import { ICardWrap } from "./Card";

interface ITemplateFront2 {
  content: ICardWrap[];
  contentLink: string;
}

export const TemplateFront2: React.FC<ITemplateFront2> = ({
  content,
  contentLink,
}) => {
  return (
    <>
      <div className="">
        <div className="pt-6">
          <div className="px-8 flex flex-nowrap overflow-auto gap-4">
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

export interface ITemplateFront {
  content: React.ReactNode;
  templateName: string;
}

export const TemplateFront: React.FC<ITemplateFront> = ({
  content,
  templateName,
}) => {
  return (
    <div className="mb-2 py-6">
      <h3 className="text-2xl">{templateName}</h3>
      <div className="overflow-auto pt-2">
        <div className="flex flex-nowrap gap-4">{content}</div>
      </div>
    </div>
  );
};

interface IGridTemplate {
  content: ICardWrap[];
  templateName: string;
  contentLink?: string;
}

export const GridTemplate: React.FC<IGridTemplate> = ({
  content,
  templateName,
  contentLink,
}) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-8">{templateName}</h3>
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
