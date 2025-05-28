import Link from "next/link";
import { CardWrap } from "./Card";
import { ReactNode } from "react";

export const TemplateFront2 = ({
  content,
  templateName,
  seeAll,
  contentLink,
}: {
  content: any;
  templateName?: string;
  seeAll?: string;
  contentLink: string;
}) => {
  return (
    <section className="pt-6 px-4 md:px-8 flex flex-nowrap overflow-auto">
      {content &&
        content.map((contentData: any) => (
          <div key={contentData.id}>
            <CardWrap size="w-48" link={contentLink} content={contentData} />
          </div>
        ))}
    </section>
  );
};

export const TemplateFront = ({
  children,
  templateName,
}: {
  children?: ReactNode;
  templateName: string;
}) => {
  return (
    <section aria-label={templateName}>
      <h3 className="px-4 md:px-0 text-2xl font-bold mb-4">{templateName}</h3>
      <div className="overflow-auto">
        <div className="flex flex-nowrap mx-4 md:mx-0">{children}</div>
      </div>
    </section>
  );
};

export const GridTemplate = ({
  content,
  templateName,
  contentLink,
}: {
  content: any;
  templateName: string;
  contentLink: string;
}) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-8">{templateName}</h3>
      <div className="">
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-8">
          {content &&
            content.map((contentData: any, index: number) => (
              <div key={index}>
                <CardWrap size="" link={contentLink} content={contentData} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFront;
