import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { baseApiUrl } from "../constants";

const ChangesForm = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title.rendered);
        setContent(data.content.rendered);
        setAuthor(data.author);
        setImage(data.featured_media);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      title: { rendered: title },
      content: { rendered: content },
      author: author,
      featured_media: image,
    };

    const authString = btoa("GianMariaRicciolini: 8mT4 MAip fZ4h 7ytW BLO5 vzZs");

    fetch(`${baseApiUrl}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Post updated successfully");
          // Handle success
        } else {
          console.error("Error updating post:", res.statusText);
          // Handle error
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Handle error
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content:</Form.Label>
        <Form.Control as="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="author">
        <Form.Label>Author:</Form.Label>
        <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image:</Form.Label>
        <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ChangesForm;
