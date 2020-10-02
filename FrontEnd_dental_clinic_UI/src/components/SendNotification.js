import React, { Component } from 'react';
import { Button,Card,Form,Table} from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';


export default class SendNotification extends Component {
    constructor(props){
        super(props);
        
            this.state = this.initialState;
            this.state.show = false;
            this.SendNotification = this.SendNotification.bind(this);
            this.services = this.services.bind(this);
            this.findPatientByUsername=this.findPatientByUsername.bind(this);
    }

    initialState = {
     firstName:'',lastName:'',dob:'',gender:'',dentist:'',treatement:'',date:'',time:''
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

    SendNotification = event =>{
        event.preventDefault();
        
        const username = this.state.username;
        
          axios.get("http://localhost:8040/sendNotification/"+username)
          .then (response => {
            this.setState({show:true});
            setTimeout (()=> this.setState({"show":false}),5000);
        });
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
                <MyToast show = {this.state.show} message = {"Notification Sent"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i class="fas fa-calendar-check" style={{color:'cyan'}}>   Patient Appointment Detail</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.SendNotification} id="employeeFormId" encType="multipart/form-data">
                            <Card.Body>

                                <Table striped bordered hover size="sm" variant="primary">
                                    <tbody>
                                        <tr>
                                        <td>Patient Name</td>
                                        <td>{this.state.firstName} {this.state.lastName}</td>
                                        </tr>
                                        <tr>
                                        <td>Gender</td>
                                        <td>{this.state.gender}</td>
                                        </tr>
                                        <tr>
                                        <td>Date Of Birth</td>
                                        <td>{this.state.dob}</td>
                                        </tr>
                                        <tr>
                                        <td>Treatment</td>
                                        <td>{this.state.treatment}</td>
                                        </tr>
                                        <tr>
                                        <td>Dentist</td>
                                        <td>{this.state.dentist}</td>
                                        </tr>
                                        <tr>
                                        <td>Date</td>
                                        <td>{this.state.date}</td>
                                        </tr>
                                        <tr>
                                        <td>Time</td>
                                        <td>{this.state.time}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>

                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="primary" size="sm"><i class="fas fa-envelope"> Send Notification</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.services.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}

