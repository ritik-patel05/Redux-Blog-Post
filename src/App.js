import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <>
              <AddPostForm />
              <PostsList />
            </>
          </Route>
          <Route exact path="/posts/:postId">
            <SinglePostPage />
          </Route>
          <Route exact path="/editPost/:postId">
            <EditPostForm />
          </Route>
          <Route exact path="/users">
            <UsersList />
          </Route>
          <Route exact path="/users/:userId">
            <UserPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
