import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";

const index = () => {
  return (
    <>
      <Head>
        <title>404 Not Found | ALEFAST</title>
      </Head>
      <Layout>
        <div className="mx-4">
          <div className="flex items-center justify-center h-[calc(100vh-11rem)]">
            <div>
              <h1 className="text-2xl">
                The Page You&apos;re Looking Is Not Exist
              </h1>
              <div className="flex items-center justify-center">
                <button className="btn btn-outline rounded-full mr-2 mt-4">
                  <Link href="/">Back To Home</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
