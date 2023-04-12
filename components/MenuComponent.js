import React from "react";
import { primaryLinks } from "./links";
import CustomLink from "./CustomLink";
import PopUpMenu from "./PopUpMenu";

export default function MenuComponent() {
  return (
    <>
      {primaryLinks.map((link) => {
        if (link.child) {
          return <PopUpMenu prop={link} key={link.id} />;
        }
        return <CustomLink path={link.path} key={link.id} title={link.title} />;
      })}
    </>
  );
}
