import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { tw } from "twind";
import { useGetAllPostsQuery } from "./query/post.query";
import { css } from "twind/css";
import dayjs from "dayjs";

function Post() {
  const { data } = useGetAllPostsQuery();

  return (
    <div>
      <div className={tw(`flex justify-center items-center`)}>
        <TextField label="Search here" variant="standard" />
        <IconButton aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </div>

      <div className={tw(`flex flex-col gap-6 mt-14`)}>
        {data &&
          data.map((post) => (
            <Card>
              <CardHeader
                title={post.title}
                className={tw(
                  css({ "& .MuiCardHeader-title": { fontSize: "1.15rem" } })
                )}
              />
              <CardContent>
                <Typography noWrap>{post.body}</Typography>
                <Typography variant="subtitle2" mt={3} fontStyle="italic">
                  Written by {post.author}
                </Typography>
                <Typography variant="subtitle2" fontStyle="italic">
                  {dayjs(post.createdAt).format("MMM YY")}
                </Typography>
              </CardContent>{" "}
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Post;
