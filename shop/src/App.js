import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

// react-bootstrap 설치 npm install react-bootstrap@next bootstrap@버전

// 내보내기: export {변수1, 변수2, ...} 가져오기: import {변수1, 변수2, ...} from 경로

import { Link, Route, Switch } from 'react-router-dom';
// <Link to="url"></Link>

// Context 만들기
// 1. 같은 변수값을 공유할 범위 생성
// 2. 같은 값을 공유할 HTML을 <범위.Provider>로 감싸고 value={공유할값}
// 3. useContext(범위)로 공유된 값 사용하기
export let stockContext = React.createContext();

function App() {

  let [shoes, changeShoes] = useState(Data);
  let [stock, setStock] = useState([10, 11, 12]);

  return (
    <div className="App">

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Mooya-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home </Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
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

          <stockContext.Provider value={stock}>

            <div className="row">
              {
                shoes.map( (a, i) => {
                  // 반복시킨 HTML에는 key가 필요
                  return <Item shoes={shoes[i]} i={i} key={i}/>
                })
              }
            </div>

          </stockContext.Provider>

          <button className="btn btn-primary" onClick={()=>{

            // axios.post('url', {id: 'id', pw: '1234'})

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              changeShoes( [...shoes, ...result.data]);
            }) // 성공하면
            .catch(()=>{
              console.log('실패했다')
            }) // 실패하면
          }}>더보기</button>
        </div>
      </Route>

      {/* :id -> url 파라미터 기능 */}
      <Route path="/detail/:id">
        {/* 다른 파일에 context를 공유하고 싶을 때 */}
        <stockContext.Provider value={stock}>
          <Detail shoes={shoes} stock={stock} setStock={setStock}/>
        </stockContext.Provider>
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

  let stock = useContext(stockContext);

  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) +'.jpg' } width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
      <Test></Test>
    </div>
  )
}

function Test() {
  let stock = useContext(stockContext);
  return <p>{stock[0]}</p>
}

export default App;
