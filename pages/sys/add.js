import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextEditor from "@/components/TextEditor";
import SelectCategoryWidget from "@/components/Widgets/SelectCategoryWidget";
// import dynamic from "next/dynamic";
import SelectSubCategoryWidget from "@/components/Widgets/SelectSubCategoryWidget";
// const SelectSubCategoryWidget = dynamic(
//   () => import("@/components/Widgets/SelectSubCategoryWidget"),
//   { ssr: false }
// );

export default function Add() {
  const [state, setState] = useState({});
  const [text, setText] = useState("");
  const [category, setCategory] = useState();
  const [pathImage, setPathImage] = useState([]);

  const PhotosRef = useRef();

  const handleChangeFile = async (event) => {
    try {
      await Array.from(event.target.files).map((item) => {
        const file = new FormData();
        file.append("image", item);

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}upload`, {
          method: "POST",
          body: file,
        })
          .then((response) => response.json())
          .then((json) => setPathImage((pathImage) => [...pathImage, json]));
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state, pathImage);
  return (
    <div style={{ width: "80%", overflowY: "auto" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
        Добавить продукт
      </Typography>
      <div style={{ padding: "15px 0px" }}>
        <TextField
          required={true}
          label="Название"
          variant="outlined"
          size="small"
          fullWidth={true}
          onChange={(e) => {
            setState((state) => {
              return { ...state, title: e.target.value };
            });
          }}
        />
      </div>
      <div style={{ padding: "15px 0px" }}>
        <TextEditor text={text} setText={setText} />
      </div>
      <div style={{ padding: "15px 0px" }}>
        <TextField
          label="Цена"
          variant="outlined"
          size="small"
          fullWidth={true}
          onChange={(e) => {
            setState((state) => {
              return { ...state, price: e.target.value };
            });
          }}
        />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%", boxSizing: "border-box", padding: "15px" }}>
          {<SelectCategoryWidget setCategory={setCategory} />}
        </div>
        <div style={{ width: "50%", boxSizing: "border-box", padding: "15px" }}>
          <SelectSubCategoryWidget
            category={category}
            disabled={Boolean(!category || category.title === "Запчасти")}
          />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => PhotosRef.current.click()}
          startIcon={<PhotoCamera />}
        >
          Добавить фото
        </Button>
        <input
          hidden={true}
          ref={PhotosRef}
          type="file"
          multiple={true}
          accept=".png, .jpg, .jpeg"
          name="files[]"
          onChange={handleChangeFile}
        />
      </div>
      <div>{pathImage.length ? `Фото: ${pathImage.length}` : ""}</div>
      {pathImage &&
        pathImage.map((item) => {
          let str = item.url.substring(1);
          return (
            <img
              key={item.url}
              src={`${process.env.NEXT_PUBLIC_API_HOST}${str}`}
              style={{ width: "300px", height: "auto", display: "block" }}
            />
          );
        })}
    </div>
  );
}
