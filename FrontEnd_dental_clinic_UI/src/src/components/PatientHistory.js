import React, { Component } from 'react';
import {Button,Table} from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';

export default class PatientHistory extends Component {
    constructor(props){
        super(props);
        const token2 = localStorage.getItem("token2")
        let loggedInOperator = true
            if(token2 == null){
                loggedInOperator=false
            }
        this.getSchedule = this.getSchedule.bind(this);
        this.state={
            schedules:[],
            loggedInOperator
        }
    }

    componentDidMount() {
        this.getSchedule()
    }

    getSchedule(){
        axios.get('http://localhost:8040/patientList')
        // axios.get('http://localhost:8050/patientList')
        .then(response => response.data)
        .then((data)=>{
            this.setState({schedules: data});
        })
    }
   
    render() {
        if(this.state.loggedInOperator === false){
            return <Redirect to="/signin"></Redirect>
        }
        const formCss ={
            marginTop:'7%',
            marginBottom : '35px',
            fontSize:'11px'};
            
        return (
        <div style={formCss}>
            <Link to="/settingopt"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-user-edit"></i></span>  Edit Employee</Button></Link>
            <Link to="/operatorpage"><Button variant="info" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-backward"></i></span>  Back</Button></Link>
            <Link to="/signout"><Button variant="danger" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-out-alt"></i></span>  SignOut</Button></Link>
            
            <h1>Patients Medical History</h1>
            <Table striped bordered hover size="sm" variant="primary">
            <thead>
                <tr>
                <th>PatientName</th>
                <th>Gender</th>
                <th>DateOfBirth</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Appt-Treatment</th>
                <th>LastTreatment</th>
                <th>LastDentist</th>
                <th>LastVisit</th>
                <th>Odontogram</th>
                <th>unCompromised-Condition</th>
                <th>Note</th>
                <th>MedicalHistory</th>
                </tr>
            </thead>
            <tbody> {this.state.schedules.map((schedule) => (
                <tr>
                    <td>{schedule.firstName} {schedule.lastName}</td>
                    <td>{schedule.gender}</td>
                    <td>{schedule.dob}</td>
                    <td >{schedule.phone}</td>
                    <td>{schedule.address}</td>
                    <td>{schedule.treatment}</td>
                    <td>{schedule.lastTreatment}</td>
                    <td>{schedule.lastDentist}</td>
                    <td>{schedule.lastVisit}</td>
                    <td>{schedule.odontogram}</td>
                    <td>{schedule.unCompromised}</td>
                    <td>{schedule.note}</td>
                    <td><Link to={"/dentistnote/"+schedule.username}><Button variant="success" style={{fontSize:'10px'}} onClick={this.getSchedule.bind(this,schedule.username)}><span><i className="fas fa-edit"></i></span>  Edit</Button></Link></td>
                </tr>
                ))}
            </tbody>
        
            </Table>
        </div>
    )
}
}
