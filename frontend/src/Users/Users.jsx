import axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from '../User/User';
import { Container,Row } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const URL = "https://dummyapi.io/data/v1/user?limit=10";
    (async () => {
      const { data } = (await axios.get(URL, { headers: { "app-id": "623f19872934031e5b0d8089" } })).data;
      setUsers(data)
    })()

  }, [])

  return (
    <Container fluid>
      <Row>
        {users.map(user => <User key={user.id} user={user} />)}
      </Row>
    </Container>
  )
}

export default Users