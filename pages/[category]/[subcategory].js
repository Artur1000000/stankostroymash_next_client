import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SubCategory({ props }) {
  const router = useRouter();
  return (
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
      {props.subCategory &&
        props.subCategory.map((item) => {
          return (
            <Card sx={{ maxWidth: 345, minWidth: 200, height: 350 }} key={item._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.NEXT_PUBLIC_API_HOST}${item.photoPrimary}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href={`${router.asPath}/${item._id}`}>
                  <Button size="small" color="primary">
                    Далее
                  </Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}
SubCategory.getInitialProps = async (ctx) => {
  const attr = `?category=${ctx.query.category}&subcategory=${ctx.query.subcategory}`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}api/getSubCategory${attr}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { subCategory: data },
  };
};
