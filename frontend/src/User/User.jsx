
import React from 'react'
import "./User.css"
import Card from 'react-bootstrap/Card';
import { Button, Col } from 'react-bootstrap';
import { addFriendAction, removeFriendAction } from '../reducers/userReducer';

function User(props) {
  // const { id, title, firstName, lastName, picture } = props.user;
  // const { username,dispatch, isFriend } = props;
  const {dispatch, isFriend, user: { id, title, firstName, lastName, picture } } = props;

  const addFriend = () => {
    const payload = {id,name:firstName};
    dispatch(addFriendAction(payload));
  };

  const removeFriend = () => {
    const payload = {id,name:firstName};
    dispatch(removeFriendAction(payload));
  }
  return (
    <Col lg={4} md={6} sm={10}>
      <Card className='user mb-3'>
        <Card.Body className='d-flex justify-content-between'>
          <img src={picture} height="100px" />
          <div className='d-flex flex-column justify-content-around'>
            <div className='mb-3'>{title} {firstName} {lastName}</div>
            {isFriend ? <Button onClick={removeFriend} variant="danger">Remove Friend</Button> : <Button onClick={addFriend} variant="primary">Add Friend</Button>}

          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default User