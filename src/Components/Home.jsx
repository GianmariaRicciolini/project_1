import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { baseApiUrl, authString } from "../constants";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${baseApiUrl}/posts?page=${currentPage}&_embed=1`)
      .then((res) => {
        setLastPage(parseInt(res.headers.get("X-WP-TotalPages")));
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, [currentPage, deletes]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const deletePost = (postId) => {
    fetch(`${baseApiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDeletes(deletes + 1);
        } else {
          console.error("Errore durante l'eliminazione dell'articolo:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Errore durante la richiesta di eliminazione:", error);
      });
  };

  return (
    <>
      <Pagination currentPage={currentPage} lastPage={lastPage} changePage={changePage} />

      <Container>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} md={6}>
              <Card className="mb-3 background">
                <Card.Body>
                  <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div className="overflow-hidden py-3 mb-3" style={{ height: "300px" }}>
                    {post._embedded && post._embedded["wp:featuredmedia"] && (
                      <Card.Img src={post._embedded["wp:featuredmedia"][0].source_url} alt="Featured Image" />
                    )}
                  </div>
                  <Row>
                    <Col xs={8}>
                      <Link to={`/post/${post.id}`}>
                        <button className="btn btn-outline-success w-50">Read more...</button>
                      </Link>
                    </Col>
                    <Col xs={4}>
                      <Link to={`/changes/${post.id}`}>
                        <button className="btn btn-outline-warning w-50">Modify</button>
                      </Link>
                      <button className="btn btn-outline-danger w-50" onClick={() => deletePost(post.id)}>
                        Delete
                      </button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Pagination currentPage={currentPage} lastPage={lastPage} changePage={changePage} />
    </>
  );
};

export default Home;
