import { useState,useEffect, useRef } from "react";
import { TextField, Input, Icon } from "@mui/material";
import "./css/Login.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const [idf,setIdv] = useState();
    useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const navigate = useNavigate();

  const navigateSignin = () => {
    navigate("/Signin");
  };

  //로그인 기능
  const idRef = useRef();
  const pwRef = useRef();
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(idRef.current.value);
    console.log(pwRef.current.value);

    axios
      .post("http://127.0.0.1:3001/Login", {
        id: idRef.current.value,
        pw: pwRef.current.value,
      })
      // axios로 보낼 위치에 데이터 보내기를 성공하면 then
      .then((result) => {
        console.log("데이터 보내기 성공!", result.data.result);
        console.log("id", result.data.id);
        console.log("co2",result.data.co2);
        localStorage.setItem("id",result.data.id)
        localStorage.setItem("co2",result.data.co2)
        nav("/Main");
      }) // axios로 보낼 위치에 데이터 보내기를 실패하면 catch
      .catch((err) => {
        console.log("데이터 보내기 실패!");
        console.log("Test",err)
      });
  };
  
  return (
    <form onSubmit={handleLogin} method="post">
      <div className="login4" data-animate-on-scroll>
        <div className="container">
          <div className="rec">
            <section className="rec-child" id="LoginContainer" />
          </div>
          <button className="logbtn" type="submit">
            <button className="logbtn-child" />
            <div className="login5">login</div>
          </button>
          <button className="signbtn" onClick={navigateSignin}>
            <button className="signbtn-child" />
            <div className="singin">Singin</div>
          </button>
          <TextField
            className="id"
            sx={{ width: 365.3948669433594 }}
            color="primary"
            variant="standard"
            type="text"
            label="ID"
            placeholder="ID"
            size="medium"
            margin="none"
            id="ID"
            name="ID"
            inputRef={idRef}
          />
          <TextField
            className="pw"
            sx={{ width: 365.3946228027344 }}
            color="primary"
            variant="standard"
            type="password"
            label="PW"
            placeholder="PW"
            size="medium"
            margin="none"
            id="PW"
            name="PW"
            inputRef={pwRef}
          />

          <div className="ltext">
            <div className="login6">Login</div>
          </div>
          <img className="Loginicon" alt="" src="../icon.svg" />
        </div>
      </div>
    </form>
  );
};

export default Login;
