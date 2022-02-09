import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Pagination, Container, Row, Col } from '../middlewares/react-bootstrap.js';
import { selectPage } from '../middlewares/middlewares.js';
import { body } from "../middlewares/reducer.js"
import './content.css';

let itemsCount = [];
let totalCount = 0;

const Content = () => {
  const dispatch = useDispatch();

  let setPagination = (res) => {
    let active = res.pageNumber;
    let itemsNumber = [];
    for (let number = 1; number <= res.pageNumber; number++) {
      itemsNumber.push(
        <Pagination.Item key={number} active={number === active} 
        onClick={(p) => { 
          selectPage(p.target.text);
          dispatch(body());
          }}>
          {number}
        </Pagination.Item>,
      );
    };
    return itemsNumber;
  };
  const reqBody = useSelector(state => state.reqBody.allItems);
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/api/Items/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      .then(response => response.json())
      .then(json => {
        totalCount = json.totalRecord;
        itemsCount = setPagination(json);
        setItems(json.items);
        setSuccess(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [reqBody]);

  return( 
    <>
      <div>
        <hr />
        <p>Result: {totalCount}</p>
        <hr />

      <div className="row">
        {success ? (items.map((item) => {
          return <div className="col-lg-4 col-md-6 col-sm-12" key={`${item.formatId}`}>
            <Card className='cards'>
              <Card.Img variant="top" key={`${item.itemId}`} src={`http://localhost:5000/Images/${item.formatId}.png`}/>
                <Card.Body>
                  <Card.Title>{`${item.title}`}</Card.Title>
                  <Card.Text>{`${item.description}`}</Card.Text>
                  <Card.Link href={`${item.link}`}>read more</Card.Link>
                </Card.Body>
            </Card>
        </div>;
          })
          ) : (
          <p>loading items</p>
          )}
      </div>

        <Container>
          <Row>
            <Col md={{ span: 6, offset: 6}}>
              <Pagination size="sm">
                  {itemsCount}
              </Pagination>
            </Col>
          </Row>
        </Container>
        
      </div>
    </>
  );
};

export default Content;
