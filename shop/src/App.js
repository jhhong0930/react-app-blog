import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';

// react-bootstrap 설치 npm install react-bootstrap@next bootstrap@버전

// 내보내기: export {변수1, 변수2, ...} 가져오기: import {변수1, 변수2, ...} from 경로

import { Link, Route, Switch } from 'react-router-dom';
// <Link to="url"></Link>

function App() {

  let [shoes, changeShoes] = useState(Data);

  return (
    <div className="App">

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mooya-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
            <Nav.Link> <Link to="/detail">Detail</Link> </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    

    <Switch>

      <Route exact path="/">
        <div className="background">
          <h1>20% Season Off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <Button variant="outline-primary">Primary</Button>{' '}
        </div>
        <div className="container">
          <div className="row">
            {
              shoes.map( (a, i) => {
                // 반복시킨 HTML에는 key가 필요
                return <Item shoes={shoes[i]} i={i} key={i}/>
              })
            }
          </div>
        </div>
      </Route>

      {/* :id -> url 파라미터 기능 */}
      <Route path="/detail/:id">
        <Detail shoes={shoes}/>
      </Route>

      <Route path="/:id">
        <div>아거무나 적었을 때 이거 보여주셈</div>
      </Route>

      {/* <Route path="/..." component={Modal} ></Route> */}

    </Switch>
    {/* Switch : 중복 허용 안함 */}

    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) +'.jpg' } width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}

export default App;
