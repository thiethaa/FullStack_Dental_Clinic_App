import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom';
import {Button,Card,CardDeck} from 'react-bootstrap';

export default class OperatorPage extends Component {
    constructor(props){
        super(props);

        const token = localStorage.getItem("token")
        let loggedIn = true
            if(token == null){
                loggedIn=false
            }
            this.state={
                loggedIn
            }
        }

    render() {
        if(this.state.loggedIn=== false){
            return <Redirect to="/signin"></Redirect>
        }
    
        const formCss = {
                marginTop:'20%',
                marginBottom : '35px',
                marginLeft :'10%',
                background:'rgba(171, 205, 239, 0.6)',
                padding:'30px',
                borderRadius:'5%',
                fontSize:'24px'
            }
        
            return (
                <div style={formCss}>
                <h2 style={{color:'navy',textAlign:'center'}}> You have been Logged in as Admin</h2><br></br>
                <div className="d-flex justify-content-around">
                <CardDeck>
                <Card className="bg-light text-dark">
                            <Card.Body>
                            <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                            <h4 style={{fontFamily:'fantasy'}}>Add/Edit Employee</h4>
                            <br></br>
                            <Link to="/setting"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-user-edit"></i></span>  add/Edit Employee</Button></Link>
                            </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="bg-light text-dark">
                            <Card.Body>
                            <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                            <h4 style={{fontFamily:'fantasy'}}>Appointment List</h4>
                            <br></br>
                            <Link to="/schedule"><Button variant="warning" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-list"></i></span>  Appointmen List</Button></Link>
                            </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="bg-light text-dark">
                            <Card.Body>
                            <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                            <h4 style={{fontFamily:'fantasy'}}>GoodBye..</h4>
                            <br></br>
                            <Link to="/signout"><Button variant="danger" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-out-alt"></i></span>  SignOut</Button></Link>
                            </Card.Title>
                            </Card.Body>
                        </Card>
                        </CardDeck>
                </div>
            </div>
            )
        }
    }
