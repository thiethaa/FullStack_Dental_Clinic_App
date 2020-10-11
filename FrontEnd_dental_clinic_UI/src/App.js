import React from 'react';

import Navigation from'./components/Navigation';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import OurTeam from './components/OurTeam';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import { Container,Row,Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Services from './components/Services';
import SettingService from './components/SettingService';
import EditService from './components/EditService';
import DeleteService from './components/DeleteService';
import AddService from './components/AddService';
import EditImage from './components/EditImage';
import DeleteEmployee from './components/DeleteEmployee';
import Appointment from './components/Appointment';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Setting from './components/Setting';
import SignOut from './components/SignOut';
import PatientHistory from './components/PatientHistory'
import SettingOpt from './components/SettingOpt';
import OperatorPage from './components/OperatorPage';
import AdminPage from './components/AdminPage';
import Schedule from './components/Schedule';
import DentistNote from './components/DentistNote';
import Editpatient from './components/EditPatient';
import DeletePatient from './components/DeletePatient';
import SendNotification from './components/SendNotification';

function App() {
  return (
      <Router>
        <Navigation/>
        <Container>
          <Row>
            <Col lg={12} style={{marginTop:'20px'}}>
              <Switch>
                <Route path="/" component={Welcome} exact />
                <Route path="/add" component={AddEmployee}/>
                <Route path="/ourteam" component={OurTeam}/>
                <Route path="/services" component={Services}/>
                <Route path="/addservice" component={AddService}/>
                <Route path="/editservice/:id" component={EditService} exact/>
                <Route path="/deleteservice/:id" component={DeleteService} exact/>
                <Route path="/settingservice" component={SettingService}/>
                <Route path="/addemployee" component={AddEmployee} exact />
                <Route path="/edit/:id" component={EditEmployee} exact/>
                <Route path="/delete/:id" component={DeleteEmployee} exact/>
                <Route path="/editimage/:id" component={EditImage} exact/>
                <Route path="/appt/:id" component={Appointment} exact/>
                <Route path="/register" component={Register} exact/>
                <Route path="/signin" component={SignIn} exact/>
                <Route path="/setting" component={Setting} exact/>
                <Route path="/signout" component={SignOut} exact/>
                <Route path="/patienthistory" component={PatientHistory} exact/>
                <Route path="/settingopt" component={SettingOpt} exact/>
                <Route path="/operatorpage" component={OperatorPage} exact/>
                <Route path="/adminpage" component={AdminPage} exact/>
                <Route path="/schedule" component={Schedule} exact/>
                <Route path="/dentistnote/:username" component={DentistNote} exact/>
                <Route path="/editpatient/:username" component={Editpatient} exact/>
                <Route path="/deletepatient/:username" component={DeletePatient} exact/>
                <Route path="/sendNotification/:username" component={SendNotification} exact/>
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
