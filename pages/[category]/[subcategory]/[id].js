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

export default function SubCategoryId() {
  const router = useRouter();
  return (
    <>
    <h1 style={{textAlign:"center"}}>{router.query.id}</h1>
      <div style={{width:"600px", height:"400px", margin:"30px auto"}}>
        <ImageGallery
          items={mockData}
          showBullets
          showPlayButton={false}
          showIndex
          showFullscreenButton={false}
        />
      </div>
    </>
  );
}
