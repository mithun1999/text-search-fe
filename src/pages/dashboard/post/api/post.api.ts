import { axiosInstance } from "../../../../util/axios.util";
import { IAddPostForm } from "../interface/createPost.type";
import { IPost } from "../interface/post.interface";

export async function createPost(payload: IAddPostForm) {
  const { data } = await axiosInstance({
    method: "POST",
    url: `/post`,
    data: payload,
  });
  return data;
}

export async function getAllPosts() {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/post`,
  });
  return data as IPost[];
}

export async function getPostById(id: string) {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/post/${id}`,
  });
  return data as IPost;
}

export async function getPostBySlug(slug: string) {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/post/slug/${slug}`,
  });
  return data as IPost;
}

export async function searchPosts(key?: string, page?: string) {
  const { data } = await axiosInstance({
    method: "GET",
    url: `/post/search?key=${key}&page=${page}&limit=10`,
  });
  return data;
}
