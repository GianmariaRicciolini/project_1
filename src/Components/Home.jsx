import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { baseApiUrl } from "../costants";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${baseApiUrl}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Errore durante il recupero dei post:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <Container>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{post.title.rendered}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
