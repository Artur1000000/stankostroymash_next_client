import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function CustomLink({ path, title }) {
  return (
    <Link href={`/${path}`} style={{ color: "#000" }}>
      <Button variant="text" color="inherit">
        {title}
      </Button>
    </Link>
  );
}
