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

  const props = {
    personDetails: {
      name: personDetails.name,
      biography: personDetails.biography,
      birthday: personDetails.birthday,
      place_of_birth: personDetails.place_of_birth,
      known_for_department: personDetails.known_for_department,
      deathday: personDetails.deathday,
      profile_path: personDetails.profile_path,
    },
    personMovieCredits: {
      cast: personMovieCredits.cast?.map((cast) => ({
        poster_path: cast.poster_path,
        title: cast.title,
        vote_average: cast.vote_average,
        id: cast.id,
        release_date: cast.release_date,
        character: cast.character,
      })),
    },
    personTVCredits: {
      cast: personTVCredits.cast?.map((cast) => ({
        poster_path: cast.poster_path,
        name: cast.name,
        vote_average: cast.vote_average,
        id: cast.id,
        first_air_date: cast.first_air_date,
        character: cast.character,
      })),
    },
  };

  const dataSize = JSON.stringify(props).length;
  console.log(`Data size: ${dataSize / 1024} KB`);

  return {
    props,
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<any> => {
  const { id: celebId } = await params;
  const { props } = await getCelebDetails(celebId);
  const { personDetails } = props;

  return {
    title: personDetails.name,
    description: personDetails.biography,
    openGraph: {
      title: personDetails.name,
      description: personDetails.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${personDetails.profile_path}`,
          width: 342,
          height: 513,
          alt: personDetails.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: personDetails.name,
      description: personDetails.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w342${personDetails.profile_path}`,
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
  const { props } = await getCelebDetails(celebId);
  const { personDetails, personMovieCredits, personTVCredits } = props;
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

  // console.log({ personDetails, personMovieCredits, personTVCredits });

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
