import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { tw } from "twind";
import { css } from "twind/css";
import { useGetPostBySlugQuery } from "./query/post.query";

function ViewPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPostBySlugQuery(slug ?? "");
  return (
    <div>
      <IconButton
        aria-label="search"
        color="primary"
        className={tw(`!mb-5`)}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </IconButton>
      {slug && post && (
        <Card>
          <CardHeader
            title={post.title}
            className={tw(
              css({ "& .MuiCardHeader-title": { fontSize: "1.15rem" } })
            )}
          />
          <CardContent>
            <Typography>{post.body}</Typography>
            <Typography variant="subtitle2" mt={3} fontStyle="italic">
              Written by {post.author}
            </Typography>
            <Typography variant="subtitle2" fontStyle="italic">
              {dayjs(post.createdAt).format("MMM YY")}
            </Typography>
          </CardContent>{" "}
        </Card>
      )}
    </div>
  );
}

export default ViewPost;
