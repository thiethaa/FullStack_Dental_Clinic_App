import React, { Component } from 'react';
import { Button,Card,Form} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class DeleteEmployee extends Component {
    constructor(props){
        super(props);
            this.state = this.initialState;
            this.deleteEmp = this.deleteEmp.bind(this);
            this.findEmployeeByID= this.findEmployeeByID.bind(this);
            this.getEmployees=this.getEmployees.bind(this);
            this.employeeList=this.employeeList.bind(this);
    }
    initialState = {
        name: '',position: '',employees :[]
    }
    componentDidMount() {
        this.getEmployees();
        const id = this.props.match.params.id;
        this.findEmployeeByID(id);
    }

    getEmployees(){
        axios.get("http://localhost:8030/dentalemployee/employeeList")
        // axios.get("http://localhost:8050/dentalemployee/employeeList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({employees : data});
            });
    }

    findEmployeeByID = (id) =>{
        axios.get("http://localhost:8030/dentalemployee/employee/"+id)
        .then(response => {
                this.setState({
                id: response.data.employeeID,
                name: response.data.employeeName,
                position: response.data.position,
                email: response.data.email,
                fb: response.data.fb,
                twitter: response.data.twitter,
                ig: response.data.ig,
                phone:response.data.phone
            })
        })
    }

    deleteEmp = event => {
        event.preventDefault();
        const employeeID = this.state.id;
        axios.delete("http://localhost:8030/dentalemployee/removeEmployee/"+employeeID)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    // refresing page
                   this.employeeList();
                   this.getEmployees();
                } else {
                    this.setState({"show":false});
                }
            });
        };
    employeeList =()=>{
        return this.props.history.push("/setting");
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
                <MyToast show = {this.state.show} message = {"Employee Deleted Successfully!!!"} type = {"danger"} />
            </div>
                <Card style={formCss} className="border border-light">
                    <Card.Header><i className="fas fa-exclamation-triangle" style={{color:'maroon'}}>  Warning!!!</i></Card.Header>
                            <Form onSubmit={this.deleteEmp} id="employeeFormId" encType="multipart/form-data">
                                <Card.Body>

                                <p style={{color:'maroon',fontWeight:'bold'}}> Are You Sure Want to Delete this Employee ?</p>

                                </Card.Body>
                            <Card.Footer className="border border-red text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="danger" size="sm"> Yes</Button>
                                <Button type="submit" variant="success" size="sm" onClick={this.employeeList.bind()}> No</Button>
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}