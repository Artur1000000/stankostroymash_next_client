import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Fragment, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useState, useRef } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextEditor from "@/components/TextEditor";
import SelectCategoryWidget from "@/components/Widgets/SelectCategoryWidget";
import SelectSubCategoryWidget from "@/components/Widgets/SelectSubCategoryWidget";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "@/utils/cookies";

export default function Add() {
  const [state, setState] = useState({});
  const [text, setText] = useState("");
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [pathImage, setPathImage] = useState([]);
  const [photoPrimary, setPhotoPrimary] = useState("");
  const [send, setSend] = useState(false);
  const router = useRouter();

  const PhotosRef = useRef();

  const deleteImage = async (prop) => {
    const config = {
      headers: {
        auth: getCookie("token")
      }
    };

    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}api/delete_image`, {
          image: prop,
        }, config)
        .then(() => PhotosRef.current.value = null)
        .then(() => setPathImage((pathImage) => pathImage.filter((item) => item !== prop)))
        .then(() => setPhotoPrimary(""));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFile = async (event) => {
    try {
      await Array.from(event.target.files).map((item) => {
        const file = new FormData();
        file.append("image", item);
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}upload`, {
          method: "POST",
          headers: {
            auth: getCookie("token")
          },
          body: file,
        })
          .then((response) => response.json())
          .then((json) => setPathImage((pathImage) => [...pathImage, json.url]))
          .then((data) => PhotosRef.current.value = null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { if (!getCookie("token")) { router.push("/"); } }, []);

  useEffect(() => {
    if (category && category.title === "Запчасти") {
      setSubCategory();
    }
  }, [category])

  const onSave = () => {
    const config = {
      headers: {
        auth: getCookie("token")
      }
    };
    if (category.title !== "Запчасти") {
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_HOST}api/add_item`, {
            state,
            text,
            category,
            subCategory,
            pathImage,
            photoPrimary
          }, config)
          .then(() => {
            setState({});
            setText("");
            setCategory();
            setSubCategory();
            setPathImage([]);
            setPhotoPrimary("");
            setSend(true)
          });
      } catch (error) {
        console.log(error);
        setSend(false)
      }
    } else {
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_HOST}api/add_item_duplicates`, {
            state,
            text,
            category,
            subCategory,
            pathImage,
            photoPrimary
          }, config)
          .then(() => {
            setState({});
            setText("");
            setCategory();
            setSubCategory();
            setPathImage([]);
            setPhotoPrimary("");
            setSend(true)
          });
      } catch (error) {
        console.log(error);
        setSend(false)
      }
    }
  }

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
          value={state.title ?? ""}
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
          value={state.price ?? ""}
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
            getSub={setSubCategory}
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
      {pathImage.length > 0 &&
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
              <Button color="primary" disabled={Boolean(str === photoPrimary)} onClick={() => setPhotoPrimary(str)}>
                Сделать главной
              </Button>
            </Fragment>
          );
        })}
      <Button
        fullWidth={true}
        disabled={category?.title !== "Запчасти" ? !Boolean(state &&
          text &&
          category &&
          subCategory &&
          pathImage &&
          photoPrimary
        ) :
          !Boolean(state &&
            text &&
            category &&
            pathImage &&
            photoPrimary
          )}
        variant="contained"
        color={"primary"}
        style={{ marginTop: "15px" }}
        onClick={() => onSave()}>
        Сохранить
      </Button>
      {send && <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
        Продукт успешно добавлен
      </Typography>}
    </div>
  );
}
