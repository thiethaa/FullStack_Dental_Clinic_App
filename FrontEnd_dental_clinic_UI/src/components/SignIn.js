import React, { Component } from 'react';
import {Button,Form,Row,Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class SignIn extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true
            if(token == null){
                loggedIn=false
            }

     const token2 = localStorage.getItem("token2")
        let loggedInOperator = true
            if(token2 == null){
                loggedInOperator=false
            }

        this.state = {
            username:'',
            password:'',
            loggedIn,
            loggedInOperator
        }
    }
    componentDidMount() {
    }

    adminLogin = event=>{
        event.preventDefault();
        const {username, password } = this.state
        if(username === "admin" && password === "password"){
            localStorage.setItem("token","admin")
            this.setState({
                loggedIn:true,
                show:false
            })
        }else if(username === "operator" && password === "password"){
        localStorage.setItem("token2","operator")
            this.setState({
                loggedIn:true,
                show:false
            })
        }else{
          alert("Invalid Password & Username, Try again!")
        }
    }

    textChange = event => {
        if (event.target.name === "username") {
            this.setState({
            username: event.target.value
            });
        }
        if (event.target.name === "password") {
            this.setState({
            password: event.target.value
             });
            
        }
    }

    render() {
        if(this.state.loggedIn){
            return <Redirect to ="/adminpage"></Redirect>
        }else if(this.state.loggedInOperator){
            return <Redirect to ="/operatorpage"></Redirect>
        }

        const formCss ={
            marginTop:'20%',
            marginBottom : '35px',
            marginLeft :'28%',
            width:' 50%',
            background:'rgba(171, 205, 239, 0.6)',
            padding:'30px',
            borderRadius:'5%'
             };
            
        return (
        <div >
        <Form style={formCss} onSubmit={this.adminLogin}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="username" value={this.state.username} onChange={this.textChange} placeholder="Username" />
          </Col>
        </Form.Group>
      
        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" name="password" value={this.state.password} onChange={this.textChange} placeholder="Password" />
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>
      
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" variant="primary" >Sign In</Button>
          </Col>
        </Form.Group>
      </Form>
      </div>
        )
    }
}
