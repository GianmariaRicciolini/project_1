import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { baseApiUrl } from "../constants";

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

  const modifyPost = (postId) => {
    const authString = btoa("GianMariaRicciolini: 8mT4 MAip fZ4h 7ytW BLO5 vzZs");
    fetch(`${baseApiUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          setChanges(changes + 1);
        } else {
          console.error("Errore durante la modifica dell'articolo:", res.statusText);
        }
      })
      .catch((error) => {
        console.error("Errore durante la richiesta di modifica:", error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          {posts.map((post) => (
            <Col key={post.id} md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  {/* Accedi all'URL dell'immagine dall'elemento media */}
                  {post._embedded && post._embedded["wp:featuredmedia"] && (
                    <Card.Img
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt="Featured Image"
                      className="img-fluid"
                    />
                  )}
                </Card.Body>

                <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                  Delete
                </button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
              Previous
            </span>
          </li>

          {generatePaginationArray().map((page) => (
            <li key={page.n} className={`page-item ${page.active && "active"}`}>
              <span className="page-link" onClick={() => changePage(page.n)}>
                {page.n}
              </span>
            </li>
          ))}

          <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
              Next
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
