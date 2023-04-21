import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Head from "next/head";
import { primaryLinks } from "@/components/links";

export default function Index({ props }) {
  console.log(props);
  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | Главная</title>
      </Head>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "center",
          paddingTop: "15px",
          flexFlow: "column wrap",
          flexDirection: "row",
          marginTop: "15px",
          overflowY: "auto",
        }}
      >
        {primaryLinks.map((item) => {
          if (item.child) {
            return item.child.map((i) => {
              return (
                <Paper style={{ width: "80%", height: "350px" }} key={i.id}>
                  <Typography gutterBottom variant="h5" component="div">
                    {i.title}
                  </Typography>
                </Paper>
              );
            });
          }
        })}
      </div>
    </>
  );
}
Index.getInitialProps = async () => {
  const res = await fetch("https://stankostroymash.onrender.com/api/getall");
  const data = await res.json().then((res) => res);
  return {
    props: { main: data },
  };
};
