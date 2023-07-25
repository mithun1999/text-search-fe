import { TextField } from "@mui/material";
import { tw } from "twind";

function CreateCategory() {
  return (
    <div className={tw(`flex flex-col gap-5`)}>
      <TextField label="Name" fullWidth />
      <TextField label="Description" fullWidth multiline rows={3} />
    </div>
  );
}

export default CreateCategory;
