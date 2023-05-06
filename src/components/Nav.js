import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const Nav = () => {
  const [show, setShow] = useState(false);
  const {pathname} = useLocation; // 검색하기 위한 input 생성
  const [searchValue, setSearchValue] = useState("");
  const navigate  = useNavigate();

  // ** 맨 위에 네비게이션 바 투명도 조절하기
  useEffect(() => {  // useEffects : 랜더링을 하면, 이 함수가 call 된다.
    window.addEventListener('scroll', handleScroll);  // 만약, scroll 이벤트가 실행되면,
    // 이 컴포넌트를 사용하지 않는데 이 리스너가 계속 등록되어있으면 안되기에 제거한다.
    // 계속 쌓이면 여러번 호출되기에 오류가 날 수 있음.
    
    return () => {
      window.removeEventListener('scroll',handleScroll);
    }
  
  },[])

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value); // 타이핑 한 즉시 그 값을 가져옴
    navigate(`/search?q=${e.target.value}`);
  }

  return (
    <NavWrapper show = {show}>
      <Logo>
        <img 
        alt = "Disney Plus Logo"
        src = "./images/logo_disney.svg"
        onClick = {() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/" ? 
      (<Login>Login</Login>) : 
      <Input 
        value = {searchValue}
        onChange={handleChange}
        className = 'nav__input' 
        type="text" 
        placeholder='영화를 검색해보세요'/>}
    </NavWrapper>
      
    
  )
}

export default Nav

const Login = styled.a`
  background-color : rgbs (0,0,0,0.6);
  padding: 8px, 16px;
  text-transform: uppercase;
  letter-spacing:1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color : #f9f9f9;
    color: #000;
    border-color:transparent;
  } 
  
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform:translate(-50%, 0);
  background-color: rgba(0,0,0,0.582);
  border-radius: 5px;
  color:white;
  padding:5px;
  border: none;
`;



const NavWrapper = styled.nav`
  position : fixed;
  top : 0;
  left: 0;
  right : 0;
  height: 70px;
  background-color : ${props => props.show ? "#090b13" : "transparent"};
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