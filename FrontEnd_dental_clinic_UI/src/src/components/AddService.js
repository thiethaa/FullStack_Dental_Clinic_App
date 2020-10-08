import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

export default class addService extends Component {

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.textChange = this.textChange.bind(this);
        this.submitService = this.submitService.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.serviceList = this.serviceList.bind(this);
        this.state.show = false;
    }

    initialState = {
        title: ' ', description:' ',file : null
    }

    submitService = event => {
        event.preventDefault();

        const newService = new FormData();

        newService.append('title', this.state.title);
        newService.append('description',this.state.description);
        newService.append('file', this.state.file);

        console.log('data', newService);

        axios.post('http://localhost:8020/dentaltreatments/uploadTreatment', newService)
            .then(response => {
                this.setState({show:true});
                setTimeout (()=> this.setState({"show":false}),3000);
            });
        this.setState(this.initialState);
    }

    reset = () => {
        this.setState(()=> this.initialState);
    }

    textChange = event => {
        if (event.target.name === "title") {
            this.setState({
                title: event.target.value
            });
        }
        if (event.target.name === "description") {
            this.setState({
                description: event.target.value
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

    serviceList =()=>{
        return this.props.history.push("/settingservice");
    };


    render() {
        const formCss ={
            marginTop:'10%',marginBottom : '35px'
        };

        return (
            <div style={formCss}>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"new Dental service Saved Successfully!!!"} type = {"success"} />
                </div>

                <Link to="/setting"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-user-plus"></i></span>  Add/Edit Employee</Button></Link>
                <Link to="/schedule"><Button variant="warning" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-list"></i></span>  Appointment List</Button></Link>
                <Link to="/adminpage"><Button variant="info" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-backward"></i></span>  Back</Button></Link>
                <Link to="/signout"><Button variant="danger" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-out-alt"></i></span>  SignOut</Button></Link>
            

                <Card className="border border-light bg-info text-white">
                    <Card.Header><i className="fas fa-plus-square" style={{color:'cyan'}}>  Add New Dental Service</i></Card.Header>
                    <Form onReset={this.reset} onSubmit={this.submitService} id="serviceForm" encType="multipart/form-data">
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Title</Form.Label>
                                <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="title" name="title"  onChange={this.textChange}  placeholder="Enter the Tittle"  required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Description</Form.Label>
                                <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="description" name="description"  onChange={this.textChange}  placeholder="About the dental Service"  required/>
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
                            <Button type="submit" variant="warning" size="sm" onClick={this.serviceList.bind()}><i className="fas fa-list">  ServiceList</i></Button>{'  '}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
