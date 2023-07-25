import { Button, TextField } from "@mui/material";
import { tw } from "twind";

function CreatePost() {
  return (
    <div className={tw(`max-w-xl`)}>
      <div className={tw(`flex flex-col gap-8`)}>
        <TextField label="Title" variant="outlined" />
        <TextField label="Body" variant="outlined" multiline rows={6} />
        <TextField label="Author" variant="outlined" />
        <Button variant="contained">Create</Button>
      </div>
    </div>
  );
}

export default CreatePost;
