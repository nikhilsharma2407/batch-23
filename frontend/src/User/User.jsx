
import React from 'react'
import "./User.css"
import Card from 'react-bootstrap/Card';
import { Button, Col } from 'react-bootstrap';

function User(props) {
  // {
  //     "id": "60d0fe4f5311236168a109ca",
  //     "title": "ms",
  //     "firstName": "Sara",
  //     "lastName": "Andersen",
  //     "picture": "https://randomuser.me/api/portraits/women/58.jpg"
  // }
  const { id, title, firstName, lastName, picture } = props.user;
  return (
    <Col lg={4} md={6} sm={10}>
      <Card>
        <Card.Body>
          <img src={picture} height="100px" />
          <div className='info'>
            <div>{title} {firstName} {lastName}</div>
            <Button variant="primary">Add Friend</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default User