import React, { useState } from "react";
import { Form, Container, Col } from "react-bootstrap";
import { baseApiUrl, authString } from "../constants";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", image); // Invia l'immagine come parte del FormData

    try {
      const response = await fetch(`${baseApiUrl}/posts`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (response.ok) {
        console.log("Articolo creato con successo!");
      } else {
        console.error("Errore durante la creazione dell'articolo:", response.statusText);
      }
    } catch (error) {
      console.error("Errore durante la richiesta di creazione dell'articolo:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label className="pt-4 fs-3">Titolo:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label className="pt-4 fs-3">Contenuto:</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "200px", resize: "vertical" }}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label className="pt-4 fs-3">Carica immagine:</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Col className="text-end">
          <button variant="primary" type="submit" className="btn btn-outline-success px-5 mt-4">
            Aggiungi
          </button>
        </Col>
      </Form>
    </Container>
  );
};

export default CreatePost;
