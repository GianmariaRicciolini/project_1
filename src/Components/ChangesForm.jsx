import React, { useState, useEffect } from "react";
import { Form, Container, Col } from "react-bootstrap";
import { baseApiUrl, authString } from "../constants";
import { useParams } from "react-router-dom/dist";

const ChangesForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title.rendered);
        setContent(data.content.rendered);
        setImage(data.featured_media);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      title: title,
      content: content,
      featured_media: image,
    };

    fetch(`${baseApiUrl}/posts/${id}`, {
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
          // Mostra un alert che il salvataggio è avvenuto con successo
          window.alert("Salvataggio avvenuto con successo!");
          // Reindirizza alla home
          window.location.href = "/";
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "200px", resize: "vertical" }}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Col className="text-end">
          <button className="mt-4 w-25 btn btn-outline-success" variant="primary" type="submit">
            Save
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default ChangesForm;
