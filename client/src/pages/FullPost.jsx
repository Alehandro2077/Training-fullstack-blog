import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

import axios from "../axios.js";

export const FullPost = () => {
  const { id } = useParams();

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting post");
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Post isLoading={isLoading} isFullPost />
      ) : (
        <>
          <Post
            id={data._id}
            title={data.title}
            imageUrl={
              data.imageUrl ? `http://localhost:4040${data.imageUrl}` : ""
            }
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost
          >
            <p>{data.text}</p>
          </Post>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Josef Alen",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "test comment",
              },
              {
                user: {
                  fullName: "Ramires",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "comment 2222",
              },
            ]}
            isLoading={false}
          >
            <Index />
          </CommentsBlock>{" "}
        </>
      )}
    </>
  );
};
