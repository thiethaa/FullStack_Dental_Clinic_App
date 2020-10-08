import React, { Component } from 'react';
import { Button,Card,Form} from 'react-bootstrap';

import axios from 'axios';
import MyToast from './MyToast';

export default class DeleteEmployee extends Component {
    constructor(props){
        super(props);
            this.state = this.initialState;
            this.deleteService = this.deleteService.bind(this);
            this.findServiceById = this.findServiceById.bind(this);
            this.getServices=this.getServices.bind(this);
            this.serviceList = this.serviceList.bind(this);
    }
    initialState = {
        title: ' ', description:' ',file : null
    }
    componentDidMount() {
        this.getServices();
        const id = this.props.match.params.id;
        this.findServiceById(id);
    }

    getServices(){
        axios.get("http://localhost:8020/dentaltreatments/treatmentList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({services : data});
            });
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

    deleteService = event => {
        event.preventDefault();
        const serviceId = this.state.id;
        axios.delete("http://localhost:8020/dentaltreatments/remove/"+serviceId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    // refresing page
                   this.serviceList();
                   this.getServices();
                } else {
                    this.setState({"show":false});
                }
            });
        };
        
    serviceList =()=>{
        return this.props.history.push("/settingservice");
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
                            <Form onSubmit={this.deleteService} id="serviceForm" encType="multipart/form-data">
                                <Card.Body>

                                <p style={{color:'maroon',fontWeight:'bold'}}> Are You Sure Want to Delete this Treatment ?</p>

                                </Card.Body>
                            <Card.Footer className="border border-red text-white" style={{textAlign:'right'}}>
                                <Button type="submit" variant="danger" size="sm"> Yes</Button>
                                <Button type="submit" variant="success" size="sm" onClick={this.serviceList.bind()}> No</Button>
                            </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}