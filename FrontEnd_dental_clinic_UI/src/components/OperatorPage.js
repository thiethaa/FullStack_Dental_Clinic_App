import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom';
import {Button,Card,CardDeck} from 'react-bootstrap';

export default class OperatorPage extends Component {
    constructor(props){
        super(props);

        const token2 = localStorage.getItem("token2")
        let loggedInOperator = true
            if(token2 == null){
                loggedInOperator=false
            }
            this.state={
                loggedInOperator
            }
        }

    render() {
        if(this.state.loggedInOperator === false){
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
                <h2 style={{color:'navy',textAlign:'center'}}> You have been Logged in as Operator</h2><br></br>
                <div  className="d-flex justify-content-around">
                <CardDeck>
                <Card className="bg-light text-dark">
                            <Card.Body>
                            <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                            <h4 style={{fontFamily:'fantasy'}}>Edit Employee</h4>
                            <br></br>
                            <Link to="/settingopt"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-user-edit"></i></span>  Edit Employee</Button></Link>
                            </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="bg-light text-dark">
                            <Card.Body>
                            <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                            <h4 style={{fontFamily:'fantasy'}}>Patients Medical History</h4>
                            <br></br>
                            <Link to="/patienthistory"><Button variant="warning" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-list"></i></span>  Patients Medical History</Button></Link>
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
