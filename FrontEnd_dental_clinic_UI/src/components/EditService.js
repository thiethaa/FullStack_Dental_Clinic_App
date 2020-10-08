import React, { Component } from 'react'
import { Button,Card,Form,Row,Col} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class editService extends Component {

    constructor(props){
        super(props);
            this.state = this.initialState;
            this.textChange = this.textChange.bind(this);
            this.selectChange = this.selectChange.bind(this);
            this.editService = this.editService.bind(this);
            this.findServiceById = this.findServiceById.bind(this);
            this.resetService = this.resetService.bind(this);
            this.state.show = false;
    }

    initialState = {
        title: ' ', description:' ',file : null
    }

    componentDidMount() {
        const serviceId = this.props.match.params.id;
            this.findServiceById(serviceId);
                console.log(serviceId);
    }
    
    findServiceById = (serviceId) =>{
        axios.get("http://localhost:8020/dentaltreatments/treatmentbyid/"+serviceId)
        .then(response => {
                this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                file: response.data.thumbnailUrl
            })
        })
    }

    editService = event => {
        event.preventDefault();
        
        const id = this.state.id;
        const newData = new FormData();
                newData.append ('title',this.state.title);
                newData.append ('description',this.state.description);
                newData.append('file', this.state.file);

        console.log("data"+ id);
        
          axios.put("http://localhost:8020/dentaltreatments/update/"+id, newData)
          .then (response => {
            this.setState({show:true});
            setTimeout (()=> this.setState({"show":false}),3000);
        });
        this.setState(this.initialState);
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

    resetService = () => {
        this.setState(()=> this.initialState);
    }

    serviceList =()=>{
        return this.props.history.push("/settingservice");
    };

    render() {
        const {title,description} = this.state;
        const formCss ={
            marginTop:'10%',marginBottom : '35px'
        };

        return (
            <div style={formCss}>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Service Information Updated Successfully!!!"} type = {"success"} />
                </div>


                <Card className="border border-light bg-info text-white">
                    <Card.Header><i className="fas fa-plus-square" style={{color:'cyan'}}>  Add New Dental Service</i></Card.Header>
                    <Form onReset={this.resetService} onSubmit={this.editService} id="serviceForm" encType="multipart/form-data">
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Title</Form.Label>
                                <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="title" name="title" value={title} onChange={this.textChange}  placeholder="Enter the Tittle"  required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Description</Form.Label>
                                <Col sm="10">
                                    <Form.Control autoComplete="off" size="sm" type="text" id="description" name="description" value={description} onChange={this.textChange}  placeholder="About the dental Service"  required/>
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
                                <Button type="submit" variant="success" size="sm"><i className="fas fa-pen-square"> Update</i></Button>{'  '}
                                <Button type="submit" variant="light" size="sm" onClick={this.serviceList.bind()}><i className="fas fa-backward">  Back</i></Button>{'  '}
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}
