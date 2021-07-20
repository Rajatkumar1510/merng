import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import {FETCH_POSTS} from "../utils/graphQlQuery";
import { gql, useMutation } from "@apollo/client";
import FileBase64 from "react-file-base64";

const PostForm = () => {
  const initialState = {
    body: "",
    file: "",
  };
  const [inputValue, setInputValue] = useState(initialState);
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: inputValue,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
    setInputValue(initialState);
  };
  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div >
      <Form onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Label>What's on your mind? </Form.Label>
          <Form.Control
            type="text"
            name="body"
            value={inputValue.body}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          {/* <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div> */}

          <Form.File id="custom-file" custom name="file">
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setInputValue({ ...inputValue, file: base64 })
              }
            />
          </Form.File>
        </Form.Group>

        <Button
          style={{
            marginTop: "15px",
          }}
          type="submit"
        >
          Post
        </Button>
      </Form>
    </div>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!, $file: String!) {
    createPost(body: $body, file: $file) {
      id
      body
      file
      createdAt
      username
    }
  }
`;

export default PostForm;
// createPost(body: String!, file: String!): Post!
