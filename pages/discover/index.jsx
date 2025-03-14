import { getDiscover } from "../../lib/getData"

export const getServerSideProps = async (context) => {
    const {page = 1, genre} = await context.query
    const data = await getDiscover(genre, page, "movie")
    return {props: {page, genre, data}}
}

const Discover = ({page, genre, data}) => {
return (
    <>
    Genre Id is {genre}, and page is {page}
    <pre>{JSON.stringify(data.result, 2, null)}</pre>
    </>
)
}

export default Discover