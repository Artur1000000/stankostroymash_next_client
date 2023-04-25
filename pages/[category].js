import Head from "next/head";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Category({ props }) {
  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ</title>
        <meta name="keywords" content="СТАНКОСТРОЙМАШ, станкостроймаш" />
        <meta name="description" content="СТАНКОСТРОЙМАШ, станкостроймаш" />
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
        {props.category &&
          props.category.map((item) => {
            return (
              <Card sx={{ maxWidth: 345, height: 350 }} key={item._id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href={`${item.categoryEn}/${item.subCategoryEn}/${item._id}`}>
                    <Button size="small" color="primary">
                      Далее
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
}
Category.getInitialProps = async (ctx) => {
  const attr = `?category=${ctx.query.category}`;
  console.log(attr);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}api/getCategory${attr}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { category: data },
  };
};
