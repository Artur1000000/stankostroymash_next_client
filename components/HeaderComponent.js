import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuComponent from "./MenuComponent";
import Link from "next/link";

export default function HeaderComponent() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ textDecoration: "none", color: "#000" }}>
                СТАНКОСТРОЙМАШ
              </Link>
            </Typography>
            <MenuComponent />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
