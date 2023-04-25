import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
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
      <Image
        height={140}
        width={100}
        src={`${process.env.NEXT_PUBLIC_API_HOST}uploads/1681876195924.jpg`}
        alt="green iguana"
      />
    </>
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
