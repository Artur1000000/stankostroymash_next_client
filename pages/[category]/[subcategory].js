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
import { useRouter } from "next/router";

export default function SubCategory({ props }) {
  console.log(props);
  const router = useRouter();
  console.log(router.query.subcategory, router);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        alignItems: "center",
        paddingTop: "15px",
        flexFlow: "column wrap",
      }}
    >
      {props.data &&
        props.data.map((item) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={item._id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://picsum.photos/id/1019/1000/600/"
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
SubCategory.getInitialProps = async () => {
  const res = await fetch("https://stankostroymash.onrender.com/api/getall");
  const data = await res.json().then((res) => res);
  return {
    props: { data },
  };
};
