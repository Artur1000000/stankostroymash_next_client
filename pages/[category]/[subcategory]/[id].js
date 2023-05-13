import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "../../../styles/id.module.css";
import { useRouter } from "next/router";

export default function SubCategoryId({ props }) {
  const [images, setImages] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (props?.data?.photos) {
      props.data.photos.map((item) => {
        setImages((images) => [
          ...images,
          {
            original: `${process.env.NEXT_PUBLIC_API_HOST}${item.substring(1)}`,
            thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${item.substring(
              1
            )}`,
          },
        ]);
      });
    }else{router.push("/404")}
  }, [props]);

  return (
    <div className={styles.wrapp}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ textAlign: "center" }}
      >
        {props.data.subCategory}
      </Typography>
      <div className={styles.wrappCard}>
        <Card variant="outlined" className={styles.card}>
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
            {props ? (
              <div
                dangerouslySetInnerHTML={{ __html: props.data.description }}
              ></div>
            ) : (
              ""
            )}
            <Typography gutterBottom variant="h5" component="div">
              Цена:{" "}
              {Number.parseInt(props.data.price)
                ? props.data.price + " р."
                : props.data.price}
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
