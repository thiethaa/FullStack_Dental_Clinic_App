import React, { Component } from 'react'
import {Card, CardDeck,Button,ButtonGroup,OverlayTrigger,Tooltip} from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';

import MyToast from './MyToast';
export default class SettingService extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem("token")
        let loggedIn = true
            if(token == null){
                loggedIn=false
            }
        this.state={
                services:[],
                loggedIn
            }
        }

    componentDidMount() {
        this.getServices();
    }

    getServices(){
        axios.get("http://localhost:8020/dentaltreatments/treatmentList")
            .then(response => response.data)
            .then ((data)=> {
                this.setState ({services : data});
            });
    }

    deleteService = (id) => {
        axios.delete("http://localhost:8020/dentaltreatments/remove/"+id)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    // refresing page
                    this.setState({
                        services : this.state.services.filter(file => file.id !== id)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
        };

    render() {
        if(this.state.loggedIn=== false){
            return <Redirect to="/signin"></Redirect>
        }
        const formCss ={
            marginTop:'7%',marginBottom : '55px'
             };
       
        const btnCss={
            paddingLeft : '15px',
            fontSize:'8px',
            textAlign:'center'
        }
        return (
            <div style={formCss}>

                <Link to="/addemployee"><Button variant="primary" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-user-plus"></i></span>  Add Employee</Button></Link>
                <Link to="/addservice"><Button variant="success" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i className="fas fa-plus-square"></i></span>  Add Service</Button></Link>
                <Link to="/schedule"><Button variant="warning" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-list"></i></span>  Appointment List</Button></Link>
                <Link to="/adminpage"><Button variant="info" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-backward"></i></span>  Back</Button></Link>
                <Link to="/signout"><Button variant="danger" style={{boxShadow: ' 4px 4px navy', marginTop:'10px',marginBottom:'15px'}}><span><i class="fas fa-sign-out-alt"></i></span>  SignOut</Button></Link>
            {
                this.state.services.length === 0 ?
                <h1 className="center">No Record Available</h1> :

            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Service Deleted Successfully!!!"} type = {"danger"} />
                </div>

                <CardDeck style={{marginLeft:'5%'}}>
                {this.state.services.map(file =>
                <div className="d-flex align-content-center flex-wrap center bd-highligh">
                    <div className="p-2 bd-highlight align-content-center">
                        <Card className="border border-light text-dark" style={{ background:'#01459A', width: '18rem', height:'30rem' }}>
                        <Card.Header style={{ background:'#A0D3ED',textAlign:'center', fontFamily:'cursive', fontSize:'20px', color:'navy'}}>{file.title}</Card.Header>
                            <Card.Body>

                            <Link to={"editimage/"+file.id}><OverlayTrigger key='bottom' placement='bottom' overlay={
                                <Tooltip id={`tooltip-bottom`}>
                                  <strong>Edit Image</strong>.
                                </Tooltip>}>
                                <i style={{ marginLeft:'95%',cursor:'pointer',color:'#01459A'}} className="fas fa-ellipsis-h"></i>
                            </OverlayTrigger></Link>

                                <Card.Img variant="top" src={file.thumbnailUrl} style={{width: '16rem', height:'10rem'}}/>
                                <br></br>
                                <br></br>
                                <Card.Text style={{textAlign:'center', fontFamily:'comicsans',color:'white'}}>{file.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer style={{textAlign:'right',background:'#01459A'}}>
                                <ButtonGroup>
                                <Button style={btnCss} type="submit" variant="danger" size="sm" onClick={this.deleteService.bind(this,file.id)} ><i className="fas fa-trash-alt"></i></Button>
                                </ButtonGroup>
                                </Card.Footer>
                            </Card>
                         </div>
                    </div>
                )}
            </CardDeck> 
            </div>
            }
        </div>
        )
    }
}
