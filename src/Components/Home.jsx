import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { baseApiUrl } from "../constants";
import { Link } from "react-router-dom";

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

  function generatePaginationArray() {
    let paginationArr = [];
    for (let index = 1; index <= lastPage; index++) {
      paginationArr.push({
        n: index,
        active: currentPage === index,
      });
    }
    return paginationArr;
  }

  const deletePost = (postId) => {
    const authString = btoa("GianMariaRicciolini: 8mT4 MAip fZ4h 7ytW BLO5 vzZs");
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
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span
              className="page-link text-success btn"
              onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
            >
              Previous
            </span>
          </li>

          {generatePaginationArray().map((page) => (
            <li key={page.n} className={`page-item ${page.active && "active"}`}>
              <span
                className={`page-link text-success btn ${page.active ? "bg-success text-white border-white" : ""}`}
                onClick={() => changePage(page.n)}
              >
                {page.n}
              </span>
            </li>
          ))}

          <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
            <span
              className="page-link text-success btn"
              onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>

      <Container>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  {/* Accedi all'URL dell'immagine dall'elemento media */}
                  <div className="overflow-hidden py-3 mb-3" style={{ height: "300px" }}>
                    {post._embedded && post._embedded["wp:featuredmedia"] && (
                      <Card.Img src={post._embedded["wp:featuredmedia"][0].source_url} alt="Featured Image" />
                    )}
                  </div>
                  <Row>
                    <Col xs={8}>
                      <Link to={`/post/${post.id}`}>
                        <button className="btn btn-success w-50">Read more...</button>
                      </Link>
                    </Col>
                    <Col xs={4}>
                      <Link to={`/changes/${post.id}`}>
                        <button className="btn btn-warning w-50">Modify</button>
                      </Link>
                      <button className="btn btn-danger w-50" onClick={() => deletePost(post.id)}>
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

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span
              className="page-link text-success btn"
              onClick={() => currentPage !== 1 && changePage(currentPage - 1)}
            >
              Previous
            </span>
          </li>

          {generatePaginationArray().map((page) => (
            <li key={page.n} className={`page-item ${page.active && "active"}`}>
              <span
                className={`page-link text-success btn ${page.active ? "bg-success text-white border-white" : ""}`}
                onClick={() => changePage(page.n)}
              >
                {page.n}
              </span>
            </li>
          ))}

          <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
            <span
              className="page-link text-success btn"
              onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
