import { axiosInstance } from "../../../../util/axios.util";
import { ICategory } from "../interface/category.interface";

export async function getAllCategories() {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/category`,
  });
  return data as ICategory[];
}
