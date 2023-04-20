import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuItemComponent({ link }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  if (!link.child) {
    return (
      <Link
        href={link.path.length === 0 ? "/" : "/" + link.path}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <ListItemButton selected={"/" + link.path === router.asPath}>
          <ListItemText sx={{ fontSize: "12px" }} primary={link.title} />
        </ListItemButton>
      </Link>
    );
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={link.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          <Link
            href={`/${link.path}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItemButton
              sx={{ pl: 4 }}
              selected={"/" + link.path === router.asPath}
            >
              <ListItemText primary={link.alt} />
            </ListItemButton>
          </Link>
          {link.child &&
            link.child.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/${link.path}/${item.path}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={item.path === router.query.subcategory}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              );
            })}
        </List>
      </Collapse>
    </>
  );
}
