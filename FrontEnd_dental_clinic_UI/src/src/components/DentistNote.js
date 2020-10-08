import React, { Component } from 'react';
import { Button,Card,Form,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';


export default class DentistNote extends Component {
    constructor(props){
        super(props);
        
           this.state = this.initialState;
            this.state.show = false;
            this.addDentistNote = this.addDentistNote.bind(this);
            this.textChange = this.textChange.bind(this);
            this.services = this.services.bind(this);
            this.findPatientByUsername=this.findPatientByUsername.bind(this);
    }

    initialState = {
      odontogram:'',unCompromised:'',note:'',username:'',lastTreatment:'',lastDentist:'',lastVisit:''
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

    addDentistNote = event =>{
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
        });
      this.setState(this.initialState);
    }
        
    
    textChange = event => {
   
        if (event.target.name === "odontogram") {
            this.setState({
            odontogram: event.target.value
            });
        }
        if (event.target.name === "unCompromised") {
            this.setState({
            unCompromised: event.target.value
            });
        }
        if (event.target.name === "note") {
            this.setState({
            note: event.target.value
            });
        }
        console.log(this.state);
    }

    services =()=>{
        return this.props.history.push("/patienthistory");
    };


    render() {
        const formCss ={
            marginTop:'10%',
            marginBottom : '35px'
             };
            
        return (
            
        <div style={formCss}>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Patient's Medical History has been updated"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i class="fas fa-calendar-check" style={{color:'cyan'}}>   Treatment Description</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.addDentistNote} id="patientForm" encType="multipart/form-data">
                                <Card.Body>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Patient FirstName</Form.Label>
                                    <Col sm="4">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="firstname" name="firstName" value={this.state.firstName} placeholder="Enter Username" required />
                                    </Col>
                                    <Form.Label column sm="2">Patient LastName</Form.Label>
                                    <Col sm="4">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="lastName" name="lastName" value={this.state.lastName} placeholder="Enter Password" required />
                                    </Col>
                                </Form.Group>  

                                <hr style={{border:'1px solid white'}}></hr>
                                <h4 style={{color:'navy'}}>Last Treatment Record:</h4>
                                    <Form.Group as={Row}>
                                        <Form.Label style={{color:'navy'}} column sm="2">Last Visit</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="lastVisit" name="lastVisit" value={this.state.lastVisit} required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label style={{color:'navy'}} column sm="2">Last Treatment</Form.Label>
                                        <Col sm="4">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="lastTreatment" name="lastTreatment" value={this.state.lastTreatment} required />
                                        </Col>
                                        <Form.Label style={{color:'navy'}} column sm="2">Last Dentist</Form.Label>
                                        <Col sm="4">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="lastDentist" name="lastDentist" value={this.state.lastDentist} required />
                                        </Col>
                                    </Form.Group>  
                                <hr style={{border:'1px solid white'}}></hr>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Odontogram</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="eodontogram" name="odontogram" value={this.state.odontogram} onChange={this.textChange}  placeholder="Enter Description"  required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                    <Form.Label column sm="2">Uncompromised Conditions</Form.Label>
                                    <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="unCompromised" name="unCompromised" value={this.state.unCompromised} onChange={this.textChange}  placeholder="Enter Description"  required />
                                    </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                    <Form.Label column sm="2">Notes</Form.Label>
                                    <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="note" name="note" value={this.state.note} onChange={this.textChange}  placeholder="Notes"  required />
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

