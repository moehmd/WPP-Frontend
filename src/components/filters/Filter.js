import React, { useEffect, useState } from 'react';
import {InputGroup, FormControl, Button, Form, Accordion, Container, Row} from '../middlewares/react-bootstrap.js';
import {categoryFilter, formatFilter, handleClick, textInput, populateSearchResult} from '../middlewares/middlewares.js';
import { useDispatch } from 'react-redux';
import {body} from "../middlewares/reducer.js"
import './filters.css'

const Filter = () => {
  const dispatch = useDispatch();

  let searchValue = "";

  let clearSearch = () => {
    console.log(searchValue);
  };
  let populateSearchField = () => {
    searchValue = populateSearchResult();
  };

  const [CategoriesSuccess, setSuccess] = useState(false);
  const [formatSuccess, setFormatSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formats, setFormats] = useState([]);

  useEffect(() => {
    if (!CategoriesSuccess) {
      fetch('http://localhost:5000/api/Categories/categories')
        .then((response) => response.json())
        .then((json) => {
          setCategories(json);
          setSuccess(true);
        });
    }
    if (!formatSuccess) {
      fetch('http://localhost:5000/api/Format/formats')
        .then((response) => response.json())
        .then((json) => {
          setFormats(json);
          setFormatSuccess(true);
        });
    }
  }, [CategoriesSuccess, formatSuccess]);

  return (
    <>
    <div>
        <hr />
          <div className='d-flex flex-row-reverse'>
            <p>
            {(searchValue !== '') ? {searchValue} : ''}
            </p>
            <Button variant="outline-secondary" 
              size="sm" className='clear-button' 
              onClick={clearSearch}>
              X Clear
            </Button>
          </div>
        <hr />
      <Container>
        <Row>
        <InputGroup>
          <Form className="search-field">
          <FormControl placeholder="Search by keyword" ref={textInput} 
          aria-label="Search by keyword" 
          aria-describedby="search-field"
          type="text" 
          name="search" 
          />
          <Button variant="primary" id="search-field" 
          onClick={() => { 
            handleClick();
            dispatch(body());
            populateSearchField();
            }}
          > search </Button>
          </Form>
      </InputGroup>
        </Row>
      </Container>

      <Accordion defaultActiveKey={['0', '1']} flush alwaysOpen>
        <Accordion.Item eventKey="0" className="accordion">
          <Accordion.Header>Solution</Accordion.Header>
          <Accordion.Body>
            <Form>
              <div className="mt-3 mb-3">
                  {CategoriesSuccess ? (categories.map((category) => {
                    return <Form.Check 
                    type='checkbox' 
                    id={`${category.categoryId}`} 
                    key={`${category.categoryId}`} 
                    label={`${category.name}`}
                    onChange={((e) => { categoryFilter(e) })} />;
                    })
                    ) : (
                    <p>loading categories</p>
                    )}
              </div>
            </Form> 
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="accordion">
          <Accordion.Header>Content Format</Accordion.Header>
          <Accordion.Body>
            <Form>
              <div className="mt-3 mb-3">
                {formatSuccess ? ( formats.map((format) => {
                  return <Form.Check
                  type='checkbox'
                  id={`${format.formatId}`}
                  key={`${format.formatId}`}
                  label={`${format.name}`}
                  onChange={(f) => {formatFilter(f)}}
                  />;
                  })
                  ) : (
                    <p>loading formats</p>
                  )}
              </div>
            </Form> 
          </Accordion.Body>
        </Accordion.Item>
      <hr />
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" onClick={() => dispatch(body())}>
          Filter
        </Button>
      </div>
      </Accordion>
      </div>
    </>
  );
};

export default Filter;