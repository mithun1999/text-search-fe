import { UseFormReset } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { createPost, getPostBySlug } from "../api/post.api";
import { IAddPostForm } from "../interface/createPost.type";

export enum PostQueryEnum {
  GET_ALL_POST = "get-all-post",
  GET_POST_BY_SLUG = "get-post-by-slug",
}

export const useGetPostBySlugQuery = (slug: string) => {
  const { data, isLoading } = useQuery({
    queryKey: PostQueryEnum.GET_POST_BY_SLUG,
    queryFn: () => getPostBySlug(slug),
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
