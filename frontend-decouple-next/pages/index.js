import Head from "next/head";
import Image from "next/image";
import Navabr from "../components/navbar";
import NewsList from "../components/newsList";

export default function Home({ newses }) {
  // console.log(newses);
  return (
    <div className="container">
      <NewsList newses={newses} />
    </div>
  );
}

export const getStaticProps = async () => {
  const apiurl = "http://localhost:1636/news";
  const res = await fetch(apiurl);

  const resdata = await res.json();

  if (!resdata) {
    return { notFound: true };
  }
  return {
    props: { newses: resdata },
  };
};
