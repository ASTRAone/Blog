import { getCategories } from "@/app/actions/categories";
import CategoriesClient from "./client/categories-client";

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
