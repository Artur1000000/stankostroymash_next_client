import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SearchDialog from "./SearchDialog";

export default function SearchComponent() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div style={{ padding: "15px 5px 5px 5px" }}>
      <TextField
        id="outlined-size-small"
        defaultValue=""
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
