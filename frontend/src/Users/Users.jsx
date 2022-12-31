import axios from 'axios';
import React, { useEffect, useState } from 'react'
import User from '../User/User';
import { Container, Row } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { loadingAction } from '../reducers/userReducer';


function Users({user}) {
  const [users, setUsers] = useState([]);
  const [searchQuery] = useSearchParams();

  const {friendList} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = "https://dummyapi.io/data/v1/user?limit=10";
    (async () => {
      dispatch(loadingAction(true));
      const { data } = (await axios.get(URL, { headers: { "app-id": "623f19872934031e5b0d8089" } })).data;
      dispatch(loadingAction(false));
      console.log(data);
      setUsers(data)
    })()

  }, []);

  const searchTerm = searchQuery.get("search");
  console.log(searchTerm);
  return (
    <Container fluid>
      <Row>
        {users.filter(({ firstName, lastName }) => !searchTerm || (firstName + lastName).
        toLowerCase().includes(searchTerm)).
          map(user => {
            const isFriend = friendList.includes(user?.id);
            return <User key={user.id} user={user} isFriend = {isFriend} dispatch = {dispatch} />
          
          })}
      </Row>
    </Container>
  )
}

export default Users