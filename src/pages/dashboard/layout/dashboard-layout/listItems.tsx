import RssFeedIcon from "@mui/icons-material/RssFeed";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

export const pageItems = [
  {
    name: "Posts",
    path: "/",
    icon: <RssFeedIcon />,
    show: true,
  },
  {
    name: "Create Post",
    path: "/post/create",
    icon: <AddToPhotosIcon />,
    show: true,
  },
];
