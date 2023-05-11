import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function SubCategoryId({ props }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props) {
      props.data.photos.map(item => {
        setImages(images => [...images, {
          original: `${process.env.NEXT_PUBLIC_API_HOST}${item.substring(1)}`,
          thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${item.substring(1)}`,
        }])
      })
    }
  }, [props])

  return (
    <div style={{marginTop:"15px"}}>
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
            items={images && images}
            showBullets
            showPlayButton={false}
            showIndex
            showFullscreenButton={true}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.data.title}
            </Typography>
            {props ? <div dangerouslySetInnerHTML={{ __html: props.data.description }}></div> : ""}
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
