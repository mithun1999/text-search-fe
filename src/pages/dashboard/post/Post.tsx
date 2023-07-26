import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tw } from "twind";
import { css } from "twind/css";
import { searchPosts } from "./api/post.api";
import { IPost } from "./interface/post.interface";

function Post() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );
  const { ref, inView } = useInView();

  const {
    data: infiniteData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ["posts"],
    async ({ pageParam = 0 }) => {
      const res = await searchPosts(searchInput, pageParam);
      return res;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.prevPage ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );
  // console.log(infiniteData);

  const filteredData = useMemo(() => {
    const data: IPost[] = [];
    infiniteData?.pages?.forEach((p) => {
      p?.docs?.forEach((v: any) => data.push(v));
    });
    return data;
  }, [infiniteData?.pages]);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  function handleSearchBtn() {
    if (searchInput) {
      setSearchParams({ search: searchInput });
    } else {
      setSearchParams({});
    }
    refetch();
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(searchParams.get("search"));

  return (
    <div>
      <div className={tw(`flex justify-center items-center`)}>
        <TextField
          label="Search here"
          variant="standard"
          onChange={handleSearchInput}
          value={searchInput}
        />
        <IconButton
          aria-label="search"
          color="primary"
          onClick={handleSearchBtn}
        >
          <SearchIcon />
        </IconButton>
      </div>

      <div className={tw(`flex flex-col gap-6 mt-14`)}>
        {filteredData &&
          filteredData.map((post) => (
            <Card
              key={post?._id}
              onClick={() => navigate(`/post/${post.slug}`)}
              className={tw(`cursor-pointer`)}
            >
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

      <div className={tw(`p-5`)}>
        {!filteredData.length && "No results"}
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : ""}
        </button>
      </div>
    </div>
  );
}

export default Post;
