import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import Script from "next/script";

const IndexPage: NextPage = () => {
  return (
    <main className="">
      <Head>
        <title>Muhammad Bin Jamil</title>
        <meta charSet="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="mx-auto max-w-5xl h-screen flex flex-col">
        <Script strategy="beforeInteractive" src="/static/theme.js"></Script>
        <Header />

        <div className="flex justify-center items-center mx-4 sm:mx-8 h-full">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-bold text-3xl sm:text-5xl">
              Work in progress &#128640;
            </h2>
            <p>
              Meanwhile hit me up on{" "}
              <a
                className="text-indigo-500"
                href="mailto:contact@mbinjamil.dev"
              >
                contact@mbinjamil.dev
              </a>{" "}
              for any queries!
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;
