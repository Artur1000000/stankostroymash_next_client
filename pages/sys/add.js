import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextEditor from "@/components/TextEditor";
import SelectCategoryWidget from "@/components/Widgets/SelectCategoryWidget";
import SelectSubCategoryWidget from "@/components/Widgets/SelectSubCategoryWidget";
import axios from "axios";

export default function Add() {
  const [state, setState] = useState({});
  const [text, setText] = useState("");
  const [category, setCategory] = useState();
  const [pathImage, setPathImage] = useState([]);

  const PhotosRef = useRef();

  const deleteImage = async (prop) => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}api/delete_image`, {
          image: prop,
        })
        .then((data) => console.log(data))
        .then(() => setPathImage((pathImage) => pathImage.filter((item)=>item!==prop)));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeFile = async (event) => {
    try {
      await Array.from(event.target.files).map((item) => {
        const file = new FormData();
        file.append("image", item);
console.log(file)
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}upload`, {
          method: "POST",
          body: file,
        })
          .then((response) => response.json())
          .then((json) => setPathImage((pathImage) => [...pathImage, json.url]));
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      {pathImage.length>0 &&
        pathImage.map((item, index) => {
          let str = item.substring(1);
          return (
            <Fragment key={item}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_HOST}${str}`}
                style={{ width: "300px", height: "auto", display: "block" }}
              />
              <Button color="warning" onClick={() => deleteImage(item, index)}>
                Удалить
              </Button>
            </Fragment>
          );
        })}
    </div>
  );
}
