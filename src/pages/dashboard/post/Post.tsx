import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import { tw } from "twind";

function Post() {
  return (
    <div>
      <div className={tw(`flex justify-center items-center`)}>
        <TextField label="Search here" variant="standard" />
        <IconButton aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Post;
