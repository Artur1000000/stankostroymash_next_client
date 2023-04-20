import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function SearchComponent() {
  return (
    <div style={{ padding: "15px 5px 5px 5px" }}>
      <TextField
        id="outlined-size-small"
        defaultValue=""
        placeholder="Поиск"
        size="small"
        InputProps={{
          startAdornment: (
            <IconButton
              style={{ marginLeft: "-7px" }}
              onClick={() => {
                console.log(1);
              }}
              size="small"
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
