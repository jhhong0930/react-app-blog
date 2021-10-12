/* eslint-disable */

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // ES6 destructuring
  // a = 10, b = 20
  // var [a, b] = [10, 20];

  // [a, b] a = 값, b = 정정 함수
  // 문자, 숫자, array, object 다 저장가능
  // state를 사용하는 이유 = 웹이 App처럼 동작하게 만들고 싶어서
  // state에 저장된 데이터가 변경되면 html이 자동으로 재렌더링 한다
  // 하지만 그냥 변수는 변경되어도 자동 재렌더링이 안된담
  let [list, changeList] = useState(['고기 맛집 추천', '강남 우동 맛집']); 
  let [count, changeCount] = useState(0);

  let [modal, changeModal] = useState(false);

  let posts = '강남 고기 맛집';

  function changeName() {
    // 1. 기존 state의 카피본 생성
    // state를 수정할 때는 깊은 복사를 이용
    var newArray = [...list];
    // 2. 카피본에 수정사항 반영
    newArray[0] = '갈비 맛집 추천';
    // 3. 변경함수()에 집어넣기
    // 변경 함수(대체할 데이터)
    changeList(newArray);

  }

  function repeatableUI() {

    var array = [];

    for (var i=0; i<3; i++) {
      array.push(<div>안녕</div>)
    }

    return array
  }

  return (
    <div className="App">

      <div className="black-nav">
        <div>개발 Blog</div>
      </div>

      <button onClick={changeName}>버튼</button>

      <div className="list">
        <h3>{list[0]} <span onClick={ () => {changeCount(count + 1)} }>👍</span> {count} </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      <div className="list">
        <h3 onClick={ () => {changeModal(true)} }>{list[1]}</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      {/* 리엑트에선 UI를 만들 때 state 데이터를 이용 
          state 변경시 복사본은 reference 자료형만 해당, 나머지는 직접 수정 가능*/}
      <button onClick={ () => {changeModal(true) } }>버튼</button>

      <button onClick={ () => {changeModal(!modal)}}>열리고 닫히는 모달 버튼</button>
      {
        modal === true
        ? <Modal list={list} />
        : null
      }

      { repeatableUI() }

      {
        list.map(function (l) {
          return <div className="list">
                  <h3>{l} <span onClick={ () => {changeCount(count + 1)} }>👍</span> {count} </h3>
                  <p>2월 17일 발행</p>
                  <hr/>
                </div>
        }) 
      }

      
    </div>
  );
}

// Component의 이름은 대문자로 시작
// return() 안은 태그 하나로 묶어야한다
// <> </>도 사용 가능
// Compnent로 만들면 좋은 것들
// - 반복 출현하는 HTML 덩어리들
// - 자주 변경되는 HTML UL들
// - 다른 페이지를 만들 때도 컴포넌트를 사용
// state를 사용할 때 복잡하다(상위 Component에서 만든 state를 쓰려면 props 문법 사용 필요)
function Modal(props) {
  return (
    <>
      <div className="modal">
        <h2>{props.list[1]}</h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}

export default App;
