import React from "react";
import List from "@mui/material/List";
import { primaryLinks } from "./links";
import MenuItemComponent from "./MenuItemComponent";
import SearchComponent from "./SearchComponent";

export default function MenuComponent() {

  return (
    <>
      <SearchComponent />
      <List dense={true}>
        {primaryLinks &&
          primaryLinks.map((link) => {
            return <MenuItemComponent key={link.id} link={link} />;
          })}
      </List>
    </>
  );
}
