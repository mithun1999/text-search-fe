import { Button, TextField } from "@mui/material";
import { tw } from "twind";
import { IAddPostForm } from "./interface/createPost.type";
import { useForm } from "react-hook-form";
import { useUploadPostQuery } from "./query/post.query";

function CreatePost() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IAddPostForm>();

  const { createPost, isCreatingPost } = useUploadPostQuery({ reset });

  function onSubmit(data: IAddPostForm) {
    createPost(data);
  }

  return (
    <div className={tw(`max-w-xl`)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={tw(`flex flex-col gap-8`)}>
          <TextField
            label="Title"
            variant="outlined"
            {...register("title", { required: "Title is required" })}
            error={Boolean(errors?.title?.message)}
            helperText={errors?.title?.message}
          />
          <TextField
            label="Body"
            variant="outlined"
            multiline
            rows={6}
            {...register("body", { required: "Body content is required" })}
            error={Boolean(errors?.body?.message)}
            helperText={errors?.body?.message}
          />
          <TextField
            label="Author"
            variant="outlined"
            {...register("author", { required: "Author name is required" })}
            error={Boolean(errors?.author?.message)}
            helperText={errors?.author?.message}
          />
          <Button type="submit" variant="contained" disabled={isCreatingPost}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
