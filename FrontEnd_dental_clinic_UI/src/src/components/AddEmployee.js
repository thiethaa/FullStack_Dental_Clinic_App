import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class AddEmployee extends Component {

    constructor(props){
        super(props);
            this.state = this.initialState;
            this.textChange = this.textChange.bind(this);
            this.submitEmp = this.submitEmp.bind(this);
            this.selectChange = this.selectChange.bind(this);
            this.state.show = false;
    }

    initialState = {
        name: '',position: '',email: '',fb: '',twitter: '',ig: '',phone: '',file : null
    }

    submitEmp = event => {
        event.preventDefault();

        const newEmp = new FormData();

            newEmp.append('name', this.state.name);
            newEmp.append('position',this.state.position);
            newEmp.append('email', this.state.email);
            newEmp.append('fb', this.state.fb);
            newEmp.append('twitter', this.state.twitter);
            newEmp.append('ig', this.state.ig);
            newEmp.append('phone',this.state.phone);
            newEmp.append('file', this.state.file);

            console.log('data', newEmp);

            axios.post('http://localhost:8030/dentalemployee/employeeList', newEmp)
                 .then(response => {
                this.setState({show:true});
                setTimeout (()=> this.setState({"show":false}),3000);
                });
            this.setState(this.initialState);
        }

    resetEmp = () => {
        this.setState(()=> this.initialState);
    }

    textChange = event => {
        if (event.target.name === "name") {
            this.setState({
            name: event.target.value
            });
        }
        if (event.target.name === "position") {
            this.setState({
            position: event.target.value
            });
        }
        if (event.target.name === "email") {
            this.setState({
            email: event.target.value
            });
        }
        if (event.target.name === "fb") {
            this.setState({
            fb: event.target.value
            });
        }
        if (event.target.name === "twitter") {
            this.setState({
            twitter: event.target.value
            });
        }
        if (event.target.name === "ig") {
            this.setState({
            ig: event.target.value
            });
        }
        if (event.target.name === "phone") {
            this.setState({
            phone: event.target.value
            });
        }
    }

    selectChange = event => {
        if (event.target.name === 'file') {
          this.setState({
           file: event.target.files[0]
          });
        }
      }

    employeeList =()=>{
        return this.props.history.push("/setting");
    };


    render() {
        const {name,position,email,fb,twitter,ig,phone} = this.state;
        const formCss ={
            marginTop:'10%',marginBottom : '35px'
             };

        return (
        <div style={formCss}>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Employee Saved Successfully!!!"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i className="fas fa-user-plus" style={{color:'cyan'}}>  Add New Employee</i></Card.Header>
                            <Form onReset={this.resetEmp} onSubmit={this.submitEmp} id="employeeFormId" encType="multipart/form-data">
                                <Card.Body>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Name</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="employeeName" name="name" value={name} onChange={this.textChange}  placeholder="Enter Name"  required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Position</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="position" name="position" value={position} onChange={this.textChange}  placeholder="Position"  required/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">E-mail</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm"  type="text" id="email" name="email" value={email} onChange={this.textChange}  placeholder="E-mail Address"  required/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">FaceBook</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm"  type="text" id="fb" name="fb" value={fb} onChange={this.textChange}  placeholder="FaceBook"  required />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Twitter</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="twitter" name="twitter" value={twitter} onChange={this.textChange}  placeholder="Twitter"  required/>
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Instagram</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm"  type="text" id="ig" name="ig" value={ig} onChange={this.textChange} placeholder="Instagram"  required/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Phone</Form.Label>
                                        <Col sm="10">
                                        <Form.Control autoComplete="off" size="sm" type="text" id="phone" name="phone" value={phone} onChange={this.textChange}  placeholder="Phone Number"  required/>
                                        </Col>
                                    </Form.Group> 

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Image Upload</Form.Label>
                                        <Col sm="8">
                                        <input type="file" name='file' onChange={this.selectChange} required/>
                                        </Col>
                                    </Form.Group> 
                                </Card.Body>
                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Button type="reset" variant="success" size="sm"><i className="fas fa-undo-alt" style={{color:'white'}}>  Reset</i></Button>{'  '}
                                <Button type="submit" variant="primary" size="sm"><i className="far fa-save">  Submit</i></Button>{'  '}
                                <Button type="submit" variant="warning" size="sm" onClick={this.employeeList.bind()}><i className="fas fa-list">  EmployeeList</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
