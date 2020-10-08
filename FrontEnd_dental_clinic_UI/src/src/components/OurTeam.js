import React, { Component } from 'react'
import {Card, CardDeck,Button,ButtonGroup,OverlayTrigger,Tooltip} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

import MyToast from './MyToast';

export default class Ourteam extends Component {

    constructor(props){
        super(props);
        this.state={
            employees : []
        }
    }

    componentDidMount() {
        this.getEmployees();
    }
    
    getEmployees(){
        axios.get("http://localhost:8030/dentalemployee/employeeList")
        // axios.get("http://localhost:8050/dentalemployee/employeeList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({employees : data});
            });
    }

    render() {
        const formCss ={
            marginTop:'7%',marginBottom : '55px'
             };
        const iconCss={
            paddingTop:'10px',color:'#01459A', fontSize:'15px', cursor:'pointer'
        };
        const btnCss={
            paddingLeft : '15px',
            fontSize:'8px',
            textAlign:'center',
            display:'none'
        }
        return (
            <div style={formCss}>
            <Link to="/addemployee"><Button variant="primary" style={{marginLeft:'42%',boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px',display:'none'}}><span><i className="fas fa-user-plus"></i></span>  Add Employee</Button></Link>

            {
                this.state.employees.length === 0 ?
                <h1 className="center">No Record Available</h1> :

            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Employee Deleted Successfully!!!"} type = {"danger"} />
                </div>

                <CardDeck>
                {this.state.employees.map((employee) => (
                    <div className="d-flex align-content-center flex-wrap center bd-highligh">
                        <div className="p-2 bd-highlight align-content-center">
                            <Card className="border border-light"  style={{background:'#A1D4EC', width: '20rem',height:'35rem'}}>
                            <Card.Header style={{background:'#01459A',color:'cyan',fontSize:'10',fontFamily:'cursive', textAlign:'center'}}> We Promise You Better Smile</Card.Header>
                                <Card.Body>

                                <Link to={"editimage/"+employee.employeeID}><OverlayTrigger key='bottom' placement='bottom' overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                      <strong>Edit Image</strong>.
                                    </Tooltip>}>
                                    <i style={{ marginLeft:'95%',cursor:'pointer',color:'#01459A',display:'none'}} className="fas fa-ellipsis-h"></i>
                                </OverlayTrigger></Link>
                               

                                <Card.Img variant="top" src={employee.thumbnailUrl} style={{width: '17.5rem', height:'15rem',marginBottom:'25px' }}/>
                                <Card.Title style={{fontFamily : 'cursive',textAlign:'center',fontSize:'20px',fontWeight:'bold',color: 'navy'}}>{employee.employeeName}<br></br><br></br>
                                <Card.Subtitle> {employee.position} </Card.Subtitle>
                                <Card.Text>
                                <a href="https://mail.google.com/"><i style={iconCss} className="fas fa-envelope">    {employee.email}</i></a><br></br>
                                <i style={iconCss} className="fas fa-phone-square">    {employee.phone}</i>
                                <br></br>
                                <div className="d-flex justify-content-around">
                                    <a href={employee.fb}><i className="fab fa-facebook-square"></i></a>
                                    <a href={employee.twitter}><i className="fab fa-twitter-square"></i></a>
                                    <a href={employee.ig}><i className="fab fa-instagram-square"></i></a>
                                </div>
                                </Card.Text>
                                </Card.Title>
                                </Card.Body>
                                <Card.Footer style={{textAlign:'right',background:'#01459A'}}>
                                    <ButtonGroup>
                                        <Link to= {"edit/"+employee.employeeID}><Button style={btnCss} type="submit"  variant="success" ><i className="fas fa-user-edit"></i></Button></Link>
                                        <Link to= {"delete/"+employee.employeeID}><Button style={btnCss} type="submit"  variant="danger" ><i className="fas fa-trash-alt"></i></Button></Link>
                                    </ButtonGroup>
                                </Card.Footer>
                            </Card>
                        </div>
                    </div>
                ))}
                </CardDeck>
            </div>
            }
        </div>
        )
    }
}
