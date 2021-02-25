import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'
import styled from 'styled-components'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import db from './firebase'
import { auth, provider } from './firebase'


function App() {

  const [rooms, setRooms] = useState ([]) 
  const [user, setUser]  = useState (JSON.parse (localStorage.getItem ('user')))


  const getChannels = () => {
    db.collection ('rooms').onSnapshot ((snapshot) => {
      setRooms (snapshot.docs.map ((doc) => {
        return { id: doc.id, name: doc.data().name }
      }))
    })
  }

  const signOut = () => {
    auth.signOut ().then (() => {
      localStorage.removeItem ('user');
      setUser (null)
    })
  }

  useEffect (() => {
    getChannels ();
  }, [])
  
  console.log (rooms);

  return (
    <div className="App">
      <Router>
        {
          !user ? 
          <Login setUser = {setUser}/>
          :
          <Container>
            <Header signOut = {signOut} user = {user}/>
            <Main>
              <Sidebar rooms = {rooms}/>
              <Switch>
                <Route path = '/room/:channelId'>
                  <Chat user = {user}/>
                </Route>
                <Route path = '/'>
                  Select or Create Channel
                </Route>
              </Switch>
            </Main>
          </Container>
        }
      </Router>
    </div>
  );
}

export default App;


// container is whole div or box
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`

// main is also a container of some sort which contains sidebar and chat window
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto
`