import { getCelebData } from "../../../lib/getData";
import ScrollRestore from "@/components/ScrollRestore";
import { convertBornDate, sortByDate } from "@/lib/helper";
import DetailTabs from "./components/DetailTabs";
import { extractIdFromSlug } from "@/lib/helper";

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
  const { id } = await params;
  const celebId = extractIdFromSlug(id);
  const { personDetails } = await getCelebDetails(celebId);

  return {
    title: personDetails.name + " | ALEFAST",
    description: personDetails.biography,
    openGraph: {
      title: personDetails.name + " | ALEFAST",
      description: personDetails.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w185${personDetails.profile_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 185,
          height: 278,
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
          url: `https://image.tmdb.org/t/p/w185${personDetails.profile_path} || https://placehold.co/342x513?text=Data+Unavailable`,
          width: 185,
          height: 278,
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
  const { id } = await params;
  const celebId = extractIdFromSlug(id);
  const { personDetails, personMovieCredits, personTVCredits } =
    await getCelebDetails(celebId);
  const { name, biography, birthday, place_of_birth, deathday, profile_path } =
    personDetails;
  const { cast } = personMovieCredits;
  const { cast: tvCast } = personTVCredits;

  const movieData = sortByDate(cast);
  const tvShowData = sortByDate(tvCast, false);

  return (
    <>
      <ScrollRestore />
      <section className="max-w-4xl px-4 mx-auto mb-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <figure className={`flex-none w-28`}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w185/${profile_path}`
                  : "https://placehold.co/185x278?text=Data+Unavailable"
              }
              alt="cardSmall-thumbnail"
              className="rounded-2xl"
              width={185}
              height={278}
              loading="lazy"
            />
          </figure>
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p>
              <b>Birthplace</b>: {place_of_birth}
            </p>
            <p>
              <b>Birthday</b>: {convertBornDate(birthday)}
            </p>
            {deathday && (
              <p>
                <b>Died</b>: {convertBornDate(deathday)}
              </p>
            )}
          </div>
        </div>

        <DetailTabs
          biography={biography}
          movies={movieData}
          tvShows={tvShowData}
        />
      </section>
    </>
  );
}
