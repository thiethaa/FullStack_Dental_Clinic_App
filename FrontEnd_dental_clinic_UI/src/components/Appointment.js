import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

export default class EditEmployee extends Component {

    constructor(props){
        super(props);
            this.state = this.initialState;
            this.findTreatmentById = this.findTreatmentById.bind(this);
            this.selectChange = this.selectChange.bind(this);
            this.state.show = false;
            this.addAppointment = this.addAppointment.bind(this);
            this.getEmployees = this.getEmployees.bind(this);
            this.findPatientByUsername=this.findPatientByUsername.bind(this);
    }

    initialState = {
       treatment: '',time:'',date:'',dentist:'', employees : [], username:'',password:''
    }

    componentDidMount() {
        const fileId = this.props.match.params.id;
            this.findTreatmentById(fileId);
            this.getEmployees();
                console.log(fileId);

        const username = this.props.match.params.username;
            this.findPatientByUsername(username);
                console.log(username);
    }
    
    findTreatmentById = (fileId) => {
      
        axios.get("http://localhost:8020/dentaltreatments/treatmentbyid/"+fileId)
        .then(response => response.data)
        .then ((data)=> {
                this.setState({
                treatment : data.title
            })
        })
    }

    getEmployees(){
        axios.get("http://localhost:8030/dentalemployee/employeeList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({employees : data});
            });

        }

    findPatientByUsername= (username) =>{
        axios.get("http://localhost:8040/patient/"+username)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    username: response.data.username,
                    password: response.data.password,
                    dob: response.data.dob,
                    gender:response.data.gender,
                    phone: response.data.phone,
                    address: response.data.address,
                    treatment: response.data.treatment,
                    dentist: response.data.dentist,
                    date: response.data.date,
                    time:response.data.time,
                    lastTreatment:response.data.lastTreatment,
                    lastDentist:response.data.lastDentist,
                    lastVisit:response.data.lastVisit,
                    odontogram:response.data.odontogram,
                    unCompromised:response.data.unCompromised,
                    note:response.data.note
                })
                console.log(this.state);
            }) 
        }

    addAppointment = event =>{
        event.preventDefault();
            console.log("comee here");
            
            const username = this.state.username;
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                dob: this.state.dob,
                gender:this.state.gender,
                phone: this.state.phone,
                address: this.state.address,
                treatment: this.state.treatment,
                dentist: this.state.dentist,
                date: this.state.date,
                time:this.state.time,
                lastTreatment:this.state.lastTreatment,
                lastDentist:this.state.lastDentist,
                lastVisit:this.state.lastVisit,
                odontogram:this.state.odontogram,
                unCompromised:this.state.unCompromised,
                note:this.state.note
            }
            console.log("data"+ username);
            console.log(data);
            
            
        axios.put("http://localhost:8040/updatePatient/"+username, data)
            .then (response => {
                this.setState({show:true});
                setTimeout (()=> this.setState({"show":false}),5000);
            })
            .catch((error) => {
                alert("Username Not Found!!!try again or Register as New Patient");
            })
            this.setState(this.initialState);
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
        if (event.target.name === "date") {
            this.setState({
            date: event.target.value
            });
        }
        console.log(this.state);
    }

    selectChange = event => {
        if (event.target.name === 'dentist') {
          this.setState({
            dentist: event.target.value
          });
        }
        if (event.target.name === 'time') {
            this.setState({
              time: event.target.value
            });
          }
        console.log(this.state);
      }

    services =()=>{
        return this.props.history.push("/services");
    };

    render() {
        const formCss ={
            marginTop:'10%',
            marginBottom : '35px'
             };
            
        return (
            
        <div style={formCss}>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Appointment Scheduled, Please come 10 Minutes Earlier, Thank You"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i class="fas fa-calendar-check" style={{color:'cyan'}}>  Make Appointment</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.addAppointment} id="patientForm" encType="multipart/form-data">
                                <Card.Body>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Treatment</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="treatment" name="treatment" value={this.state.treatment} required />
                                        </Col>
                                    </Form.Group> 
                                   
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Choose Your Dentist</Form.Label>
                                        <Col sm="10">
                                        <Form.Control as="select" size="sm" type="text" id="dentist" name="dentist" value={this.state.dentist} onChange={this.selectChange} required>
                                            <option>Choose Your Dentist</option>
                                            {this.state.employees.map((employee) => ( 
                                                <option>{employee.employeeName}</option>
                                            ))}
                                        </Form.Control>
                                        </Col>
                                    </Form.Group>
                                 
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Choose Date</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="date" id="date" name="date" value={this.state.date} onChange={this.textChange} required />
                                        </Col>
                                    </Form.Group>  

                                    <Form.Group as={Row}>
                                    <Form.Label column sm="2">Choose Time</Form.Label>
                                        <Col sm="10">
                                        <Form.Control as="select"  size="sm" name ="time" value={this.state.time} onChange={this.selectChange}>
                                        <option>Select Time</option>
                                          <option>09.00</option>
                                          <option>11.00</option>
                                          <option>13.00</option>
                                          <option>15.00</option>
                                        </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                    <Form.Label column sm="2">UserName</Form.Label>
                                    <Col sm="4">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="username" name="username" value={this.state.username} onChange={this.textChange}  placeholder="Enter Username" required />
                                    </Col>
                                    <Form.Label column sm="2">Password</Form.Label>
                                    <Col sm="4">
                                    <Form.Control autoComplete="off" size="sm" type="password" id="password" name="password" value={this.state.password} onChange={this.textChange}  placeholder="Enter Password" required />
                                    </Col>
                                </Form.Group>  
                                </Card.Body>


                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Link to= {"/register"}><Button type="submit"  size="sm" variant="warning" >New Patient</Button></Link>
                                <Button type="submit" variant="success" size="sm"><i class="fas fa-fa-calender"> Schedule Appointment</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.services.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
