import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import Post from "../components/post";
import { PostData, PostDataListProps } from "../types/postdata";
import { GetPosts } from "../lib/postdata_api";

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of posts
  const posts: PostData[] = await GetPosts();
  return {
    props: {
      postDataList: posts,
    },
  };
};

const IndexPage: NextPage<PostDataListProps> = ({
  postDataList,
}: PostDataListProps) => {
  return (
    <main className="m-4 sm:m-8">
      <Head>
        <title>Home page</title>
      </Head>

      <div className="mx-auto max-w-5xl">
        <h1>List of posts</h1>

        <section>
          {postDataList.map((post: PostData) => (
            <Post {...post} key={post.id} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default IndexPage;
