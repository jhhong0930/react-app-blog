
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// history.goBack(); 뒤로가기
// history.push('url'); 특정 url로 이동
import styled from 'styled-components';
import './Detail.scss';

let Box = styled.div`
    padding : 20px;
`;

let Title = styled.h4`
    font-size: 25px;
    color: ${ props => props.color }
`;

function Detail(props) {

    let [alert, changeAlert] = useState(true);
    let [inputData, changeInputData] = useState();

    // useEffect 훅
    // 컴포넌트가 mount 되었을 때, update될 때
    // 특정 코드를 실행할 수 있다
    useEffect(() => {
        let timer = setTimeout(() => {changeAlert(false)}, 2000)
        return () => { clearTimeout(timer) }
    }, []);


    // useEffect 훅2
    // 컴포넌트가 사라질 때 코드를 실행할 수 있다
    // useEffect(() => {
    //     return function 어쩌구() { /*실행할 코드*/ }
    // });

    let { id } = useParams();

    let 찾은상품 = props.shoes.find(function(상품) {
        return 상품.id == id;
    })

    let history = useHistory();

    return (
        <div className="container">
            <Box>
                <Title className="red">title</Title>
            </Box>

            { inputData }
            <input onChange={(e) => {changeInputData(e.target.value)} }/>

            {
                alert === true
                ? (<div className="my-alert2">
                        <p>재고가 얼마 남지 않았습니다</p>
                    </div>)
                : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <Info stock={props.stock}></Info>
                    <button className="btn btn-danger" onClick={ () => { props.setStock() }}>주문하기</button>
                    <button className="btn btn-danger" onClick={ () => {
                        history.goBack();
                    } }>뒤로가기</button>
                </div>
            </div>
        </div>
    )
}

function Info(props) {
    return (
        <p>재고 : {props.stock}</p>
    )
}

export default Detail;