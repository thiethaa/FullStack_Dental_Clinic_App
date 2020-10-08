import React, { Component } from 'react';
import {Button,Table} from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

export default class Schedule extends Component {
    constructor(props){
        super(props);
  
        const token = localStorage.getItem("token")
        let loggedIn = true
            if(token == null){
                loggedIn=false
            }
        this.getSchedule = this.getSchedule.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.state={
            schedules:[],
            show : false,
            loggedIn
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

    sendNotification(){
        this.setState({show:true});
        setTimeout (()=> this.setState({"show":false}),5000);
    }

    render() {
        if(this.state.loggedIn=== false){
            return <Redirect to="/signin"></Redirect>
        }
        const formCss = {
                marginTop:'7%',
                marginBottom : '30px',
                fontSize:'15px',
            }
        
            return (
                <div style={formCss}>

                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Notification Sent"} type = {"success"} />
                </div>
                       
                <Link to="/setting"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-user-plus"></i></span>  Add/Edit Employee</Button></Link>
                <Link to="/addservice"><Button variant="success" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-plus-square"></i></span>  Add Service</Button></Link>
                <Link to="/adminpage"><Button variant="info" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-backward"></i></span>  Back</Button></Link>
                <Link to="/signout"><Button variant="danger" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-out-alt"></i></span>  SignOut</Button></Link>
            
                <h1>Appointment List</h1>
                <Table striped bordered hover size="sm" variant="primary">
                <thead>
                    <tr>
                    <th>PatientName</th>
                    <th>Gender</th>
                    <th>DateOfBirth</th>
                    <th>EmailAddress</th>
                    <th>PhoneNumber</th>
                    <th>Address</th>
                    <th>Treatment</th>
                    <th>Dentist</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reminder</th>
                    <th>Edit</th>
                    </tr>
                </thead>
                <tbody> {this.state.schedules.map((schedule) => (
                    <tr>
                        <td>{schedule.firstName} {schedule.lastName}</td>
                        <td>{schedule.gender}</td>
                        <td>{schedule.dob}</td>
                        <td>{schedule.email}</td>
                        <td>{schedule.phone}</td>
                        <td>{schedule.address}</td>
                        <td>{schedule.treatment}</td>
                        <td>{schedule.dentist}</td>
                        <td>{schedule.date}</td>
                        <td>{schedule.time}</td>
                        <td><Link to={"/sendNotification/"+schedule.username}><Button variant="primary" style={{fontSize:'15px',marginLeft:'5px'}} onClick={this.getSchedule.bind(this,schedule.username)}><span><i class="fas fa-envelope"></i></span></Button></Link></td>
                        <td><Link to={"/editpatient/"+schedule.username}><Button variant="success" style={{fontSize:'15px',marginLeft:'5px'}} onClick={this.getSchedule.bind(this,schedule.username)}><span><i className="fas fa-edit"></i></span></Button></Link></td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
        )
    }
}
