import React, { Component } from 'react'

import {Navbar, Container,Col} from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="bottom"bg="light">
                <Container>
                <Col lg={12} className="text-center text-muted">
                <div> Welcome to our Official Website DentalClinic@2020</div>
                </Col>
                </Container>
                </Navbar>
            </div>
        )
    }
}
