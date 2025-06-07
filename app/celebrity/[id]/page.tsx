import TableData from "@/components/TableData";
import { CardHorizontal } from "../../../components/Card";
import { getCelebData } from "../../../lib/getData";
import { sortByDate } from "@/lib/helper";
import ScrollRestore from "@/components/ScrollRestore";

async function getCelebDetails(id: string) {
  const [personDetails, personMovieCredits, personTVCredits] =
    await Promise.all([
      getCelebData(id, ""),
      getCelebData(id, "/movie_credits"),
      getCelebData(id, "/tv_credits"),
    ]);

  return {
    personDetails,
    personMovieCredits,
    personTVCredits,
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<any> => {
  const { id: celebId } = await params;
  const { personDetails } = await getCelebDetails(celebId);

  return {
    title: personDetails.name + " | ALEFAST",
    description: personDetails.biography,
    openGraph: {
      title: personDetails.name + " | ALEFAST",
      description: personDetails.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${personDetails.profile_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 342,
          height: 513,
          alt: personDetails.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: personDetails.name + " | ALEFAST",
      description: personDetails.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${personDetails.profile_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 342,
          height: 513,
          alt: personDetails.name,
        },
      ],
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: celebId } = await params;
  const { personDetails, personMovieCredits, personTVCredits } =
    await getCelebDetails(celebId);
  const {
    name,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    deathday,
    profile_path,
  } = personDetails;
  const { cast } = personMovieCredits;
  const { cast: tvCast } = personTVCredits;

  return (
    <>
      <ScrollRestore />
      <div className="max-w-4xl px-4 mx-auto mb-4 mt-12">
        <CardHorizontal
          img={
            profile_path
              ? `https://image.tmdb.org/t/p/w185/${profile_path}`
              : "https://placehold.co/185x278?text=Data+Unavailable"
          }
          title={name}
          subtitle={biography}
          subtitle2={`Known For: ${known_for_department}`}
          subtitle3={`Born: ${place_of_birth}, ${birthday}`}
          subtitle4={`Died: ${deathday}`}
          imgWidth="185"
          imgHeight="278"
          flexType="items-start"
          cardBodyPadding="pl-4"
        />
        <div className="mt-8">
          <TableData data={sortByDate(cast)} isMovie />
          <TableData data={sortByDate(tvCast, false)} />
        </div>
      </div>
    </>
  );
}
