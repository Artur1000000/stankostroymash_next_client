import HeaderComponent from "./HeaderComponent";
import Box from "@mui/material/Box";
import MenuComponent from "./MenuComponent";

const menuWidth = 240;

export default function Layout({ children, data, error }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HeaderComponent />
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
          }}
        >
          <Box
            style={{
              width: `${menuWidth}px`,
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
            }}
          >
            <MenuComponent data={data} error={error} />
          </Box>
          <Box
            style={{
              width: `calc(100% - ${menuWidth}px)`,
              height: "calc(100vh - 64px)",
              display: "flex",
              justifyContent: "center",
              padding: "15px 10px 5px 5px",
              boxSizing: "border-box",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
