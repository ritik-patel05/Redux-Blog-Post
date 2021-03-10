import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'

export const UsersList = () => {
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    console.log('UsersList has mounted')
    return () => {
      console.log('Users List has unmounted')
    }
  })
  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}
