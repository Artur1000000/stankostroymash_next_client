import Head from "next/head";

export default function Index({ props }) {
  console.log(props);
  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | Главная</title>
      </Head>
      {/* Главная */}
    </>
  );
}
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:4444/api/getall");
  const data = await res.json().then((res) => res);
  return {
    props: { main: data },
  };
};
