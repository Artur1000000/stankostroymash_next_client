import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Head from "next/head";
import { primaryLinks } from "@/components/Menu/links";
import SubCategoryListBlock from "@/components/SubCategoryListBlock";

export default function Index({ props }) {
  // console.log(props);
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
        {/* {primaryLinks.map((item) => {
          if (item.child) {
            return item.child.map((i) => {
              return (
                <Paper style={{ width: "80%", height: "350px" }} key={i.id}>
                  <Typography gutterBottom variant="h5" component="div">
                    {i.title}
                  </Typography>
                  <img src={i.image} alt={i.title} width="150px" height="150" />
                </Paper>
              );
            });
          }
          if (item.title === "Запчасти") {
            return (
              <Paper style={{ width: "80%", height: "350px" }} key={item.id}>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <img src={item.image} alt={item.title} />
              </Paper>
            );
          }
        })} */}
        {primaryLinks.map((item) => {
          if (item.child) {
            return <SubCategoryListBlock key={item.id} name={item.title} images={item.child} parent={item.path} />;
          }
          if(item.title==="Запчасти"){
            return <SubCategoryListBlock key={item.id} name={item.title} images={[item]} />;
          }
        })}
      </div>
    </>
  );
}
Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}api/getall`);
  const data = await res.json().then((res) => res);
  return {
    props: { main: data },
  };
};
