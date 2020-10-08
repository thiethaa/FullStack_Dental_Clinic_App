import React from 'react';

import {Card, Button, CardDeck,Carousel} from 'react-bootstrap';
import axios from "axios/index";
import smile from './carouselPics/smile2.jpg';
import smile2 from './carouselPics/dental.jpg';
import { Link } from "react-router-dom";


export default class Features extends React.Component {
  
    state = {
        apifile: []
    }
  
    componentDidMount() {
        axios.get(`http://localhost:8020/dentaltreatments/treatmentList`)
            .then(res => {
                const apifile = res.data;
                this.setState({apifile});
                console.log(apifile);
            })
    }
    render(){
        const style ={
           marginBottom : '55px'
             };
        const first={
            maxWidth: '500px',
            left: '60%',
            top: '25%',
            padding: '2px',
            height: '100%',
            zIndex:'10',
            textAlign:'center',
            bottom:'auto',
        
    }
        return(
            <div style={style}>
                <div>
                <Carousel>
                    <Carousel.Item>
                        <img 
                        src={smile}
                        className="d-block w-100"
                        alt="First slide"
                        style={{ height: 500, width: 100}}
                        />
                        <Carousel.Caption className="text-dark" style={first}>
                        <h3 style={{ textAlign:'center', fontFamily:'cursive'}}>DENTAL SERVICES</h3>
                            <br></br>
                            <p style={{textAlign:'justify',color:'navy'}}>
                                Ourteam is always at the forefront of the latest research in 
                                dentistry and incorporates the most up-to-date methods and technology to help patients achieve 
                                their desired smiles, it takes a holistic approach to all facets of dentistry, emphasizing 
                                the benefits of a healthy smile to overall well being. 
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img 
                        src={smile2}
                        className="d-block w-100"
                        alt="First slide"
                        style={{ height: 500, width: 100}}
                        />
                        <Carousel.Caption style={{ textAlign:'center', fontFamily:'cursive'}} className="text-dark">
                            We Provide What You Need
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                </div>
            <CardDeck style={{marginLeft:'5%'}}>
                {this.state.apifile.map(file =>
                <div className="d-flex align-content-center flex-wrap center bd-highligh">
                    <div className="p-2 bd-highlight align-content-center">
                        <Card className="border border-light text-dark" style={{ background:'#01459A', width: '18rem', height:'30rem' }}>
                        <Card.Header style={{ background:'#A0D3ED',textAlign:'center', fontFamily:'cursive', fontSize:'20px', color:'navy'}}>{file.title}</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={file.thumbnailUrl} style={{width: '16rem', height:'10rem'}}/>
                                <br></br>
                                <br></br>
                                <Card.Text style={{textAlign:'center', fontFamily:'comicsans',color:'white'}}>{file.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer style={{textAlign:'right',background:'#A0D3ED'}}>
                                <Link to= {"appt/"+file.id}><Button type="submit"  variant="info" ><i class="fas fa-calendar-check"></i>  Make Appointment</Button></Link>
                            </Card.Footer>
                            </Card>
                         </div>
                    </div>
                )}
            </CardDeck> 
        </div> 
            
        )
    }
}
