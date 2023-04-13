import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const mockData = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default function SubCategoryId({props}) {
  console.log(props)
  const router = useRouter();
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{props.data.subCategory}</h1>
      <div style={{ width: "600px", height: "400px", margin: "30px auto" }}>
        <Card
          variant="outlined"
          style={{ boxSizing: "border-box", padding: "15px" }}
        >
          <ImageGallery
            items={mockData}
            showBullets
            showPlayButton={false}
            showIndex
            showFullscreenButton={false}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
SubCategoryId.getInitialProps = async (ctx) => {
  const res = await fetch(`https://stankostroymash.onrender.com/api/getItem/${ctx.query.id}`);
  const data = await res.json().then((res) => res);
  return {
    props: { data },
  };
};
