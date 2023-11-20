import React, {Fragment, Component, useState} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Slider from "react-slick";

import bg1 from '../../assets/utils/images/originals/city.jpg';
import bg2 from '../../assets/utils/images/originals/citydark.jpg';
import bg3 from '../../assets/utils/images/originals/citynights.jpg';
import logo from '../../assets/utils/images/logo-inverse.png';

import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';


async function loginUser(credentials) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/auth/token/",
        data: credentials,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
          //handle success
          console.log(response.data.refresh);
          sessionStorage.setItem('token', response.data.access);
          sessionStorage.setItem('tokenRefresh', response.data.refresh);
          
          window.location.href = '/dashboard';
        return response.data.refresh;
        }).catch(function (response) {
          //handle error
          console.log(response);
        });
}
export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      sessionStorage.setItem('username', username);
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
    };
    
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        initialSlide: 0,
        autoplay: true,
        adaptiveHeight: true

    };
    
        
        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="12" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                {/* <div className="app-logo"
                                             style={{
                                                background: 'url(' + logo + ')',
                                             }}/> */}
                                <h4 className="mb-0">
                                    <div>Welcome back,</div>
                                    <span>Please sign in to your account.</span>
                                </h4>
                                {/* <h6 className="mt-3">
                                    No account?{' '}
                                    <a href="{undefined}" className="text-primary">Sign up now</a>
                                </h6> */}
                                <Row className="divider"/>
                                <div>
                                    <Form onSubmit={handleSubmit}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Username</Label>
                                                    <Input type="text" name="username" id="username" onChange={e => setUserName(e.target.value)}
                                                           placeholder="Username here..."/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}
                                                           placeholder="Password here..."/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/* <FormGroup check>
                                            <Input type="checkbox" name="check" id="exampleCheck"/>
                                            <Label for="exampleCheck" check>Keep me logged in</Label>
                                        </FormGroup> */}
                                        <Row className="divider"/>
                                        <div className="d-flex align-items-center">
                                            <div className="ml-auto">
                                                {/* <a href="{undefined}" className="btn-lg btn btn-link">Recover
                                                    Password</a>{' '}{' '} */}
                                                <Button color="primary" size="lg">Login to Dashboard</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };