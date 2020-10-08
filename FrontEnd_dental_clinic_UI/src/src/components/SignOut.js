import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default class SignOut extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token");
        localStorage.removeItem("token2")
    }
    render() {
        const formCss ={
            marginTop:'20%',
            marginBottom : '35px',
            marginLeft :'28%',
            width:' 50%',
            background:'rgba(171, 205, 239, 0.6)',
            padding:'30px',
            borderRadius:'5%',
            fontSize:'24px'
             };
        return (
            <div style={formCss}>
                <h1>You have been Logged Out!!!</h1>
                <Link to="/signin"><Button variant="success" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-in-alt"></i></span>  SignIn</Button></Link>
            </div>
        )
    }
}
