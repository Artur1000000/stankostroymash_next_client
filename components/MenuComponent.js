import React from "react";
import List from "@mui/material/List";
import { primaryLinks } from "./links";
import MenuItemComponent from "./MenuItemComponent";
import SearchComponent from "./SearchComponent";
import { styled } from "@mui/material/styles";

const NewStyleList = styled(List)({
  "& .MuiTypography-root": {
    fontSize: 14,
    lineHeight: 0.5,
  },
});

export default function MenuComponent() {
  return (
    <>
      <SearchComponent />
      <NewStyleList dense={true}>
        {primaryLinks &&
          primaryLinks.map((link) => {
            return <MenuItemComponent key={link.id} link={link} />;
          })}
      </NewStyleList>
    </>
  );
}
