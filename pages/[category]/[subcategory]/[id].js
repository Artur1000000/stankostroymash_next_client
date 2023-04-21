import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const mockData = [
  {
    original: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
    thumbnail: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
  },
  {
    original: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
    thumbnail: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
  },
  {
    original: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
    thumbnail: "https://stankostroymash.onrender.com/uploads/1681876195924.jpg",
  },
];

export default function SubCategoryId({ props }) {
  console.log(props);
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
            showFullscreenButton={true}
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
  const res = await fetch(
    `https://stankostroymash.onrender.com/api/getItem/${ctx.query.id}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { data },
  };
};
