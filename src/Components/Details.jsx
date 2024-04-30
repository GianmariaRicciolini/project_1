import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom/dist";
import { baseApiUrl } from "../constants";

const Details = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}?_embed=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [id]);

  // Verifica se post è null o undefined prima di accedere alle sue proprietà
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="fs-1 fw-bold text-success" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Row>
          <Col xs={12} lg={6} className="pt-4">
            {/* Accedi all'URL dell'immagine dall'elemento media */}
            {post._embedded && post._embedded["wp:featuredmedia"] && (
              <img src={post._embedded["wp:featuredmedia"][0].source_url} alt="Featured Image" className="img-fluid" />
            )}
          </Col>
          <Col xs={12} lg={6} className="pt-4" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Row>
      </Row>
    </Container>
  );
};

export default Details;
