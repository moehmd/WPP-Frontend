import { Col, Row } from 'react-bootstrap';
import Content from './components/content/Content';
import Filter from './components/filters/Filter';

function App() {
  return (
    <main>
      <>
        <Row>
          <Col xs={4}>
            <Filter />
          </Col>
          <Col xs={8}>
            <Content />
          </Col>
        </Row>
      </>
    </main>
  );
}

export default App;
