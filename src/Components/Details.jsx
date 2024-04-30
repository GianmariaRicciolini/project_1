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

  return (
    <Container>
      <Row>
        <Col className="fs-1" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Col>
          {/* Accedi all'URL dell'immagine dall'elemento media */}
          {post._embedded && post._embedded["wp:featuredmedia"] && (
            <img src={post._embedded["wp:featuredmedia"][0].source_url} alt="Featured Image" className="img-fluid" />
          )}
        </Col>
        <Col dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Row>
    </Container>
  );
};

export default Details;
