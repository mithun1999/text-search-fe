import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tw } from "twind";
import { extractContentWithKeywords } from "../../../util/string.util";
import { searchPosts } from "./api/post.api";
import { IPost } from "./interface/post.interface";

function Post() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("search") ?? "";
  const searchKeyArr = searchKey.split(" ");
  const [searchInput, setSearchInput] = useState(searchKey);
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
          filteredData.map((post) => {
            const extractedBody = extractContentWithKeywords(
              searchKey.split(" "),
              post.body
            );
            return (
              <Card
                key={post?._id}
                onClick={() => navigate(`/post/${post.slug}`)}
                className={tw(`cursor-pointer`)}
              >
                <CardContent>
                  <div className={tw(`mb-5`)}>
                    <Highlighter
                      searchWords={searchKeyArr}
                      autoEscape={true}
                      textToHighlight={post.title}
                      className={tw(`text-xl font-medium`)}
                    />
                  </div>
                  <div>
                    <Highlighter
                      searchWords={searchKeyArr}
                      autoEscape={true}
                      textToHighlight={`${extractedBody}...`}
                      className={tw(`overflow-text`)}
                    />
                  </div>

                  <Typography variant="subtitle2" mt={3} fontStyle="italic">
                    Written by {post.author}
                  </Typography>
                  <Typography variant="subtitle2" fontStyle="italic">
                    {dayjs(post.createdAt).format("MMM YY")}
                  </Typography>
                </CardContent>{" "}
              </Card>
            );
          })}
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
