import { useRouter } from "next/router";

export default function SubCategory() {
  const router = useRouter();
  console.log(router.query.subcategory, router);

  return <div>1</div>;
}
