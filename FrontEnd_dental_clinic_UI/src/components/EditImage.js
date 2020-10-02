import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class EditEmployee extends Component {

    constructor(props){
        super(props);
            this.state = this.initialState;
            this.editEmp = this.editEmp.bind(this);
            this.findEmployeeByID = this.findEmployeeByID.bind(this);
            this.state.show = false;
    }

    initialState = {
        id :'', file:null
    }

    componentDidMount() {
        const employeeID =  this.props.match.params.id;
            this.findEmployeeByID(employeeID);
                console.log(employeeID);
    }
    
    findEmployeeByID = (employeeID) =>{
        axios.get("http://localhost:8030/dentalemployee/employee/"+employeeID)
        .then(response => {
                this.setState({
                id: response.data.employeeID,
                file: response.data.thumbnailUrl
            })
        })
    }

    editEmp = event => {
        event.preventDefault();
        
        const id = this.state.id;
        const newImage = new FormData();
            newImage.append('file', this.state.file);
        
          axios.put("http://localhost:8030/dentalemployee/updateEmployeeImage/"+id, newImage)
          .then (response => {
            this.setState({show:true});
            setTimeout (()=> this.setState({"show":false}),3000);
        });
        this.setState(this.initialState);
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
        const formCss ={
            marginTop:'10%',
            marginBottom : '35px',
            width:'550px',
            marginLeft:'30%'
             };

        return (
        <div style={formCss}>
            <div style={{"display": this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Image Updated Successfully!!!"} type = {"success"} />
            </div>
                <Card className="border border-light bg-info text-white">
                    <Card.Header><i className="fas fa-pen-square" style={{color:'cyan'}}>  Update Employee Image</i></Card.Header>
                            <Form onSubmit={this.editEmp} id="employeeFormId" encType="multipart/form-data">
                                <Card.Body>

                                <Form.Group as={Row}>
                                <Form.Label column sm="6">Image Upload</Form.Label>
                                <Col sm="6">
                                <input type="file" name='file' onChange={this.selectChange} required/>
                                </Col>
                                </Form.Group> 

                                </Card.Body>
                            <Card.Footer className="border border-white bg-info text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="success" size="sm"><i className="fas fa-pen-square"> Update</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.employeeList.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}

