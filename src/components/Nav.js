import React, {useEffect, useState} from 'react'
import styled from 'styled-components'


const Nav = () => {
  const [show, setShow] = useState(false);

  // ** 맨 위에 네비게이션 바 투명도 조절하기
  useEffect(() => {  // useEffect : 랜더링을 하면, 이 함수가 call 된다.
    window.addEventListener('scroll', () => {  // 만약, scroll 이벤트가 실행되면,
      if(window.scrollY > 50) {
        setShow(true);
      }
      else {
        setShow(false);
      }
    });
    // 이 컴포넌트를 사용하지 않는데 이 리스너가 계속 등록되어있으면 안되기에 제거한다.
    // 계속 쌓이면 여러번 호출되기에 오류가 날 수 있음.
    return () => {
      window.removeEventListener('scroll',() => {});
    }
  
  })

  return (
    <NavWrapper show = {show}>
      <Logo>
        <img 
        alt = "Disney Plus Logo"
        src = "./images/logo_disney.svg"
        onClick = {() => (window.location.href = "/")}
        />
      </Logo>
    </NavWrapper>
      
    
  )
}

export default Nav

const NavWrapper = styled.nav`
  position : fixed;
  top : 0;
  left: 0;
  right : 0;
  height: 70;
  background-color ; ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items : center;
  padding : 0 36px;
  letter-spacing : 16px;
  z-index : 3;
`;

const Logo = styled.a `
  padding : 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%
  }
`;