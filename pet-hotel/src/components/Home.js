import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faMapMarkerAlt, faCalendarAlt, faCheck, faComments, faChevronDown, faBed, faClock, faCut, faQuestion, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';
import baguioMapImage from '../assets/baguio-google-map.png';
import Chatbot from './Chatbot';
import ChatFrame from './ChatFrame';
import petBackground from '../assets/pet-background.svg';
import baguioLogo from '../assets/logo192.png';

const Home = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 3)));
  const [chatMessage, setChatMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [serviceType, setServiceType] = useState('overnight'); // 'overnight' or 'grooming'
  const [showChatbot, setShowChatbot] = useState(false);
  const [showFrameChat, setShowFrameChat] = useState(false);
  
  return (
    <div className="home-page">
      {/* Header Section */}
      <div className="header-section">
        <Container>
          <Row className="align-items-center">
            <Col md={12} className="text-center">
              <div className="logo-container">
                <h1 className="brand-name"></h1>
              </div>
              <div className="logo-image">
                <img 
                  src={baguioLogo} 
                  alt="Baguio Pet Boarding Logo" 
                  className="img-fluid"
                  style={{ opacity: 0.7 }}
                  
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Booking Section */}
      <div className="booking-section py-4">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={12} lg={10}>
              <Card className="booking-card">
                <Card.Body>
                  <div className="booking-header">
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" className="overnight-stays-btn">
                        {serviceType === 'overnight' ? 'Overnight Stays / DayCare' : 'Grooming'} <FontAwesomeIcon icon={faChevronDown} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setServiceType('overnight')}>
                        <FontAwesomeIcon icon={faBed} className="me-2" />Overnight Stays / DayCare
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setServiceType('grooming')}>
                          <FontAwesomeIcon icon={faCut} className="me-2" /> Grooming   
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  
                  <Row className="mt-4">
                    {serviceType === 'overnight' ? (
                      <>
                        <Col md={6}>
                          <div className="date-picker-container">
                            <h5><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Check-in Date</h5>
                            <DatePicker
                              selected={startDate}
                              onChange={date => setStartDate(date)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              minDate={new Date()}
                              className="form-control"
                              calendarClassName="calendar-start"
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="date-picker-container">
                            <h5><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Check-out Date</h5>
                            <DatePicker
                              selected={endDate}
                              onChange={date => setEndDate(date)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              className="form-control"
                              calendarClassName="calendar-end"
                            />
                          </div>
                        </Col>
                      </>
                    ) : (
                      <Col md={12}>
                        <div className="date-picker-container">
                          <h5><FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Schedule Date</h5>
                          <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                            className="form-control"
                            calendarClassName="calendar-start"
                          />
                        </div>
                      </Col>
                    )}
                    
                    <Col md={12} className="mt-3">
                      <div className="time-picker-container">
                        <h5><FontAwesomeIcon icon={faClock} className="me-2" />Select Time</h5>
                        <select 
                          className="form-control"
                          value={selectedTime || ''}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        >
                          <option value="">Choose a time...</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="text-center mt-4">
                    <Button 
                      variant="success" 
                      className="check-availability-btn"
                      onClick={() => {
                        // Pass date and time data to the next component
                        const dateTimeData = {
                          startDate: startDate,
                          endDate: serviceType === 'overnight' ? endDate : startDate,
                          selectedTime: selectedTime,
                          serviceType: serviceType
                        };
                        navigate(serviceType === 'overnight' ? '/services' : '/grooming-services', { state: dateTimeData });
                      }}
                      disabled={!startDate || !selectedTime || (serviceType === 'overnight' && !endDate)}
                    >
                      Check Availability
                    </Button>
                  </div>
                  
                  {/* Removing Date Picker Modal */}
                </Card.Body>
              </Card>
            </Col>
            

          </Row>
        </Container>
      </div>

      {/* About Us Section */}
      <div className="about-section py-5">
        <Container>
          <Row>
            <Col md={6}>
              <div className="about-header">
                <h2>About Us</h2>
              </div>
              <div className="about-content">
                <p>
                  <strong>About Baguio Pet Boarding (Martha's Pet Emporium)</strong> - where love for pets inspired the creation of a haven for your furry friends.
                </p>
                <p>
                  Our story began with Mimi and Marj (Martha's daughters), two friends who have recognized her special connection with pets, prompting them to extend that natural companionship to her care, leading to the establishment of Baguio Pet Boarding. As pet lovers and owners ourselves, we aim to provide an environment where your pets not only stay but feel truly at home. We treat every pet as an extension of our own family, ensuring they receive the love, care, and attention they deserve. Cuddles and playtime ahead!
                </p>
                <p>
                  Our team of loving pet sitters—Geri, Ate Mhen, Doc J, Kuya Marlo, Mimi, Marj, and Buff contribute their unique warmth and expertise. Together, they form a compassionate team committed to treating your pets with the utmost care and attention. Rest assured, your cherished companions are in good hands with our devoted pet-sitting team.
                </p>
                <p>
                  Communication is key, and we understand how much you care about your pets. That's why we're dedicated to sending regular updates and happily discussing your pets whenever you wish. Our dog-friendly environment ensures that your pets are not only comfortable but also safe during their stay with us.
                </p>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="location-section">
                <h2><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />Location</h2>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=186+Kenon+road+Camp+7+Baguio+City+Philippines+2600" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="location-link"
                >
                  <div className="map-container">
                    <img 
                      src={baguioMapImage} 
                      alt="Baguio Pet Boarding Location - 186 Kenon Road, Camp 7" 
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="address-container mt-3">
                    <p><strong>186 Kenon Road, Camp 7, Baguio City, Philippines, 2600</strong></p>
                  </div>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      

      {/* Help Button */}
      <div className="help-section">
        <Button 
          variant="light" 
          className="help-btn rounded-circle"
          onClick={() => setShowFrameChat(!showFrameChat)}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </Button>
        
        {/* Frame Chat */}
        {showFrameChat && (
          <div className="frame-chat-popup">
            <ChatFrame 
              onAskQuestions={() => setShowChatbot(true)} 
              onClose={() => setShowFrameChat(false)} 
            />
          </div>
        )}
        
        {/* Chatbot */}
        {showChatbot && (
          <div className="chatbot-popup">
            <Chatbot onClose={() => setShowChatbot(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
