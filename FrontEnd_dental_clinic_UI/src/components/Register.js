import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class EditEmployee extends Component {

    constructor(props){
        super(props);
            this.state = this.initialState;
            this.selectChange = this.selectChange.bind(this);
            this.state.show = false;
            this.addNewPatient = this.addNewPatient.bind(this);
            this.textChange = this.textChange.bind(this);
            this.onClick= this.onClick.bind(this);
            this.getEmployees=this.getEmployees.bind(this);
            this.getTreatments=this.getTreatments.bind(this);
    }

    initialState = {
        firstName :'', 
        lastName: '', 
        username : '', 
        dob:'',
        gender:'', 
        password:'',
        email:'',
        phone:'',
        address:'',
        date:'',
        time:'',
        dentist:'',
        treatment:'',

        employees :[], 
        treatmenList:[],
    }

    componentDidMount() {
        this.getTreatments();
        this.getEmployees();
  
    }

       addNewPatient = event => {
           event.preventDefault();
            const newPatient ={
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                dob: this.state.dob,
                gender:this.state.gender,
                phone: this.state.phone,
                address:this.state.address,
                treatment: this.state.treatment,
                dentist: this.state.dentist,
                date: this.state.date,
                time:this.state.time
            }
                console.log('data', newPatient);
    
                axios.post('http://localhost:8040/newPatient', newPatient)
                    .then(response => {
                        this.setState({"show":true});
                        setTimeout (()=> this.setState({"show":false}),5000);
                        });
                    this.setState(this.initialState);
            }
        
    getEmployees (){
        axios.get("http://localhost:8030/dentalemployee/employeeList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({employees : data});
            });
    }

    getTreatments(){
        axios.get("http://localhost:8020/dentaltreatments/treatmentList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({treatmenList : data});
            });
    }

    textChange = event => {
   
        if (event.target.name === "firstName") {
            this.setState({
            firstName: event.target.value
            });
        }
        if (event.target.name === "lastName") {
            this.setState({
            lastName: event.target.value
            });
        }
        if (event.target.name === "username") {
            this.setState({
            username: event.target.value
            });
        }
        if (event.target.name === "dob") {
            this.setState({
            dob: event.target.value
            });
        }
        if (event.target.name === "password") {
            this.setState({
            password: event.target.value
            });
        }
        if (event.target.name === "phone") {
            this.setState({
            phone: event.target.value
            });
        }
        if (event.target.name === "address") {
            this.setState({
           address: event.target.value
            });
        }
        if (event.target.name === "email") {
            this.setState({
            email: event.target.value
            });
        }
        if (event.target.name === 'date') {
            this.setState({
              date : event.target.value
            });
          }
        console.log(this.state);
        
    }

    onClick = event =>{
        if (event.target.name === 'gender') {
            this.setState({
              gender: event.target.value
            });
          }
    }

    selectChange = event => {
        if (event.target.name === 'dentist') {
          this.setState({
            dentist: event.target.value
          });
        }
        if (event.target.name === 'treatment') {
            this.setState({
                treatment : event.target.value
            });
          }
       if (event.target.name === 'time') {
            this.setState({
              time : event.target.value
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
                <MyToast show = {this.state.show} message = {"Register Successfully and Appointment has been Scheduled, Please come 10 Minutes Earlier, Thank You"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i class="fas fa-calendar-check" style={{color:'cyan'}}>   Register</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.addNewPatient} id="employeeFormId" encType="multipart/form-data">
                                <Card.Body>

                                    
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">FirstName</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.textChange}  placeholder="Enter Your FirstName" required />
                                        </Col>
                                    </Form.Group>  

                                   
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">LastName</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.textChange}  placeholder="Enter Your LastName" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Email</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="email" id="email" name="email" value={this.state.email} onChange={this.textChange}  placeholder="Enter Your Email" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Username</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="username" name="username" value={this.state.username} onChange={this.textChange}  placeholder="Enter Your Username" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Password</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="password" id="password" name="password" value={this.state.password} onChange={this.textChange}  placeholder="Enter Your Password" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Date of Birth</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="date" id="dob" name="dob" value={this.state.dob} onChange={this.textChange} required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label as="legend" column sm={2}>
                                        Gender
                                        </Form.Label>
                                        <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="male"
                                            id="male"
                                            onClick={this.onClick}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            id="female"
                                            onClick={this.onClick}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Other"
                                            name="gender"
                                            value="other"
                                            id="other"
                                            onClick={this.onClick}
                                        />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Phone</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="phone" name="phone" value={this.state.phone} onChange={this.textChange}  placeholder="Enter Your Phone Number" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Address</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="address" name="address" value={this.state.address} onChange={this.textChange}  placeholder="Enter Your Address" required />
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Choose Treatment</Form.Label>
                                            <Col sm="10">
                                                <Form.Control as="select" size="sm" type="text" id="treatment" name="treatment" value={this.state.treatment} onChange={this.selectChange}  required>
                                                <option>Choose Treatment</option>
                                                {this.state.treatmenList.map((treatment) => ( 
                                                    <option >{treatment.title}</option>
                                                ))}
                                                </Form.Control>
                                            </Col>
                                    </Form.Group>
                                   
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Choose Your Dentist</Form.Label>
                                        <Col sm="10">
                                            <Form.Control as="select" size="sm" type="text" id="dentist" name="dentist" value={this.state.dentist} onChange={this.selectChange} required>
                                            <option>Choose Your Dentist</option>
                                            {this.state.employees.map((employee) => ( 
                                                <option value={employee.employeeName}>{employee.employeeName}</option>
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
                                            <Form.Control as="select"  size="sm" id="time" name="time" value={this.state.time} onChange={this.selectChange} required>
                                            <option>Select Time</option>
                                            <option>09.00</option>
                                            <option>11.00</option>
                                            <option>13.00</option>
                                            <option>15.00</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                </Card.Body>


                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="success" size="sm"><i class="fas fa-fa-save"> Submit</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.services.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
