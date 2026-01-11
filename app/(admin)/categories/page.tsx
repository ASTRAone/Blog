import { getCategories } from "@/app/actions/categories";
import { Metadata } from "next";
import CategoriesClient from "./client/categories-client";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesPage = async () => {
  const data = await getCategories();
  const categories = Array.isArray(data) ? data : [];

  return (
    <div>
      <CategoriesClient categories={categories} />
    </div>
  );
};
export default CategoriesPage;
