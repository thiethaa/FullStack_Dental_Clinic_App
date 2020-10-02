import React, { Component } from 'react';
import { Button,Card,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';


export default class Editpatient extends Component {
    constructor(props){
        super(props);
        
            this.state = this.initialState;
            this.state.show = false;
            this.updatePatient = this.updatePatient.bind(this);
            this.textChange = this.textChange.bind(this);
            this.onClick= this.onClick.bind(this);
            this.services = this.services.bind(this);
            this.findPatientByUsername=this.findPatientByUsername.bind(this);
    }

    initialState = {
     firstName:'',lastName:'',dob:'',gender:'',email:'',phone:'',  address:''
    }

    componentDidMount() {
        const username = this.props.match.params.username;
            this.findPatientByUsername(username);
                console.log(username);
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
                address:response.data.address,
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

    updatePatient = event =>{
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
            address:this.state.address,
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
        });
      this.setState(this.initialState);
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
        if (event.target.name === "dob") {
            this.setState({
            dob: event.target.value
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
        console.log(this.state);
    }

    onClick = event =>{
        if (event.target.name === 'gender') {
            this.setState({
              gender: event.target.value
            });
          }
    }


    services =()=>{
        return this.props.history.push("/schedule");
    };
    render() {
        const formCss ={
            marginTop:'10%',
            marginBottom : '35px'
             };
            
        return (
            
        <div style={formCss}>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Patient Information has been Updated"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i class="fas fa-calendar-check" style={{color:'cyan'}}>   Patient Information</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.updatePatient} id="employeeFormId" encType="multipart/form-data">
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

                                </Card.Body>


                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="success" size="sm"><i class="fas fa-fa-save"> Update</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.services.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}

