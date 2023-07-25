import { useQuery } from "react-query";
import { getAllCategories } from "../api/category.api";

export enum CategoryQueryEnum {
  GET_ALL_CATEGORY = "get-all-category",
}

export const useGetAllCategoryQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: CategoryQueryEnum.GET_ALL_CATEGORY,
    queryFn: getAllCategories,
  });
  return { data, isLoading };
};
