import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  console.log(router.query.category);
  return (
    <div
      style={{ width: "80%", outline: "1px solid red", margin: "20px auto" }}
    >
      0
    </div>
  );
}
