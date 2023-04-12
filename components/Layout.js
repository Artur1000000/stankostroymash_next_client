import HeaderComponent from "./HeaderComponent";

export default function Layout({ children }) {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
}
