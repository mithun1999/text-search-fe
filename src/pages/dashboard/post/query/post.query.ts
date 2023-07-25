import { UseFormReset } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IAddPostForm } from "../interface/createPost.type";
import { createPost, getAllPosts, getPostById } from "../api/post.api";

export enum PostQueryEnum {
  GET_ALL_POST = "get-all-post",
  GET_POST_BY_ID = "get-post-by-id",
}

export const useGetAllPostsQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: PostQueryEnum.GET_ALL_POST,
    queryFn: getAllPosts,
    initialData: [],
  });
  return { data, isLoading };
};

export const useGetPostByIdQuery = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: PostQueryEnum.GET_POST_BY_ID,
    queryFn: () => getPostById(id),
  });
  return { data, isLoading };
};

export const useUploadPostQuery = ({
  reset,
}: {
  reset: UseFormReset<IAddPostForm>;
}) => {
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: () => {
      toast("Post created successfully", { type: "success" });
      reset();
    },
    onError: (error: any) => {
      toast(error.message || "Something went wrong while creating posts", {
        type: "error",
      });
    },
  });

  return { createPost: mutate, isCreatingPost: isLoading };
};
