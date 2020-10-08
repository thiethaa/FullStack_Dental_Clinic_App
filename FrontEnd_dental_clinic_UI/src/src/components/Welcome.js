import React, { Component } from 'react'

import { Link } from "react-router-dom";
import {Carousel, Button,CardDeck,Card} from 'react-bootstrap';
//images
import dentist from'./carouselPics/dentist.jpg';
import dentalchair from'./carouselPics/dentalchair.jpg';
import smile from './carouselPics/smile.jpg';

export default class Welcome extends Component {
    render() {
        const style ={
            marginTop:'15%',marginBottom : '55px'
             };
        const first={
            maxWidth: '500px',
            right: '0',
            top: '30%',
            padding: '10px',
            height: '100%',
            zIndex:'10',
            textAlign:'center',
            left:'5%',
            bottom:'auto',
           
        }
        return (
            <div style={{style}}>
            <Carousel>
                <Carousel.Item>
                    <img 
                    src={smile}
                    className="d-block w-100"
                    alt="First slide"
                    style={{ height: 500, width: 100}}
                    />
                    <Carousel.Caption className="text-dark" style={first}>
                        <h3 style={{color:'navy'}}>An Experience You Will Enjoy, a Smile You Will Love.</h3>
                        <p style={{fontFamily:'cursive'}}>Welcome to our Website. We look forward to providing you with personalized, comprehensive dental care.
                       </p>
                        <Button variant="light"><Link to="/services">Make Appointment</Link></Button><br></br><br></br>
                        <Button variant="light"><Link to="/register">New Patient</Link></Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={dentalchair}
                    alt="Third slide"
                    style={{ height: 500, width: 100}}
                    />
    
                    <Carousel.Caption className="text-dark">
                    <h3>Creating The Healthy Smile You Want Through Science and Artistry.</h3>
                    <p>If your smile is not becoming to you, then you should be coming to me!</p>
                   </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={dentist}
                    alt="Third slide"
                    style={{ height:500, width: 100}}
                    />
    
                    <Carousel.Caption> 
                    <h3 class="header2">Excellence in Dentistry With Optimum Care.</h3>
                    <p>Modern dentistry in a calm and relaxed environment.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    
            <br></br>
            <br></br>
            <div className="d-flex justify-content-around">
            <CardDeck>
            <Card className="bg-light text-dark">
                        <Card.Body>
                        <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                        <h4 style={{fontFamily:'fantasy'}}>Location</h4>
                        <br></br>
                        <p style={{fontSize:'15px', fontFamily:' times'}}><i class="fas fa-map-marker-alt">  404 Boulevard Avenue, Lilburn, GA, 30056, USA</i></p>
                        </Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="bg-light text-dark">
                        <Card.Body>
                        <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                        <h4 style={{fontFamily:'fantasy'}}>Contact</h4>
                        <br></br>
                        <p style={{fontSize:'15px', fontFamily:' times'}}><i class="fas fa-phone">   +1 404 776 898</i> </p>
                        </Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="bg-light text-dark">
                        <Card.Body>
                        <Card.Title style={{textAlign:'center',fontSize:'15px'}}>
                        <h4 style={{fontFamily:'fantasy'}}>Hours</h4>
                        <br></br>
                        <p style={{fontSize:'15px', fontFamily:' times'}}><i class="fas fa-stopwatch">  Mon - Fri = 08.00 - 15.00</i></p>
                        <p style={{fontSize:'15px',fontFamily:' times'}}><i class="fas fa-stopwatch">  Saturday = 12.00 - 15.00</i></p>
                        </Card.Title>
                        </Card.Body>
                    </Card>
                    </CardDeck>
            </div>
        </div>
        )
    }
}

