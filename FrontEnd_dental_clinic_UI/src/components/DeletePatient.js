import React, { Component } from 'react';
import { Button,Card,Form} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class DeletePatient extends Component {
    constructor(props){
        super(props);
            this.state = this.initialState;
            this.state.show = false;
            this.deletePatient = this.deletePatient.bind(this);
            this.findPatientByUsername = this.findPatientByUsername.bind(this);
            this.getSchedule=this.getSchedule.bind(this);
            this.services = this.services.bind(this);
    }
    initialState = {
        firstName:'',lastName:'',dob:'',gender:'',email:'',phone:'',  address:''
       }

    componentDidMount() {
        this.getSchedule();
        const username = this.props.match.params.username;
            this.findPatientByUsername(username);
                console.log(username);
    }


    getSchedule(){
        axios.get('http://localhost:8050/patientList')
        .then(response => response.data)
        .then((data)=>{
            this.setState({schedules: data});
        })
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

    deletePatient = event => {
        event.preventDefault();
        const username = this.state.username;
        axios.delete("http://localhost:8040/deletePatient/"+username)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    // refresing page
                   this.getSchedule();
                   this.services();
                } else {
                    this.setState({"show":false});
                }
            });
        };
        
    services =()=>{
        return this.props.history.push("/schedule");
    };
    
    render() {
        const formCss ={
            marginTop:'10%',
            marginBottom : '35px',
            width:'550px',
            marginLeft:'30%',
            background:'rgba(255,0,0,0.6)'
             };

        return (
        <div >
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Patient Deleted Successfully!!!"} type = {"danger"} />
            </div>
                <Card style={formCss} className="border border-light">
                    <Card.Header><i className="fas fa-exclamation-triangle" style={{color:'maroon'}}>  Warning!!!</i></Card.Header>
                            <Form onSubmit={this.deletePatient} id="serviceForm" encType="multipart/form-data">
                                <Card.Body>

                                <p style={{color:'maroon',fontWeight:'bold'}}> Are You Sure Want to Delete this Patient's Data ?</p>

                                </Card.Body>
                            <Card.Footer className="border border-red text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="danger" size="sm"> Yes</Button>
                                <Button type="submit" variant="success" size="sm" onClick={this.services.bind()}> No</Button>
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}