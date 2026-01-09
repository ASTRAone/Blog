import { getCategories } from "@/app/actions/categories";
import CategoriesClient from "./client/categories-client";

const CategoriesPage = async () => {
  const data = await getCategories();

  return (
    <div>
      <CategoriesClient categories={data ?? []} />
    </div>
  );
};
export default CategoriesPage;
