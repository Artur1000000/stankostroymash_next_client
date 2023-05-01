import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SearchDialog from "./SearchDialog";

export default function SearchComponent() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  // const handleClickOpen = ()=>{
  //   setOpen(true);

  // }

  const handleClickOpen = useCallback(async() => {
    if (text.length) {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}api/search?search=${text}`
      );
      const data = await res.json().then((res) => res);

      console.log(data)

      // fetch(`${process.env.NEXT_PUBLIC_API_HOST}api/search/${text}`)
      //   .then(function (response) {
      //     // обработка успешного запроса
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     // обработка ошибки
      //     console.log(error);
      //   });

      setOpen(true);
    }
  }, [text]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "15px 5px 5px 5px" }}>
      <TextField
        id="outlined-size-small"
        defaultValue={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Поиск"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton
              style={{ marginRight: "-7px" }}
              onClick={handleClickOpen}
              size="small"
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <SearchDialog open={open} handleClose={handleClose} />
    </div>
  );
}
