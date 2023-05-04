import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const mockData = [
  {
    original: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
  },
  {
    original: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
  },
  {
    original: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`,
  },
];

export default function SubCategoryId({ props }) {
  console.log(props);
  return (
    <div>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ textAlign: "center" }}
      >
        {props.data.subCategory}
      </Typography>
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
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
    </div>
  );
}
SubCategoryId.getInitialProps = async (ctx) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}api/getItem/${ctx.query.id}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { data },
  };
};
