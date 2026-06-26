import { redirect } from "next/navigation";

// The store now lives at /shop. Keep /shelf working for any old links.
export default function ShelfPage() {
  redirect("/shop");
}
