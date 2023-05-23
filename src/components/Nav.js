import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const Nav = () => {
  const [show, setShow] = useState(false);
  const {pathname} = useLocation(); // 검색하기 위한 input 생성
  const [searchValue, setSearchValue] = useState("");
  const navigate  = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // 유저에 대한 정보를 localStorage에서 가져와서 보여줌.
  const initialUserData = localStorage.getItem("userData") ?
  JSON.parse(localStorage.getItem("userData")) : {};

  const [userData, setUserData] = useState(initialUserData);
  
  // nav 컴포넌트는 모든 페이지에 있기에 인증된 유저인지 체크
  useEffect(() =>{
    onAuthStateChanged(auth,(user)=> {
      if(user) {
       if(pathname === "/")
         {
          navigate("/main");
         }
      }else{
        navigate("/");
      }
    })
  },[auth, navigate, pathname]);


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

  const handleSignout = () => {
    signOut(auth).then(()=> {
      setUserData({});
      navigate(`/`);
    }).catch((error)=> {
      console.log(error)
    })
  }

  const handleAuth = () => {
  
  signInWithPopup(auth,provider)
  .then(result =>{
    setUserData(result.user);
    localStorage.setItem('userData',JSON.stringify(result.user));
    // localStorage에 result.user를 문자열화 해서 넣어줌.
    // 이를 통해 새로고침이나 창을 닫아도 유저에 대한 정보가 남아있도록 함.

  })
  .catch(error => {
    console.error(error);
  });
  
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
      (<Login onClick = { handleAuth }>Login</Login>) : 
      <><Input
          value={searchValue}
          onChange={handleChange}
          className='nav__input'
          type="text"
          placeholder='영화를 검색해보세요' />
          <Signout>
            <UserImg src = {userData.photoURL} alt= {userData.displayName}/>
            <DropDown>
              <span onClick = {handleSignout}>Sign out</span>
            </DropDown>
          </Signout>
        </>
      }
    </NavWrapper>
      
    
  )
}

export default Nav

const DropDown = styled.div`
  position:absolute;
  top: 48px;
  right: 0px;
  background: rgb(19,19,19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size : 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
  transition-duration: .4s;
  
`;

const Signout= styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &: hover{
    ${DropDown}{
      opacity:1;
      transition-duration:1s;
    }
  }

`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 90%;
  height: 90%;
`;



const Login = styled.a`
  background-color : rgba(0,0,0,0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing:1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;
  cursor : pointer;

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