import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS } from "../utils/graphQlQuery";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);
  const { user } = useContext(AuthContext);
  return (
    <div className="post-container">
      <div className="post-form">{user && <PostForm />}</div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        data &&
        data.getPosts.map((post) => {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
