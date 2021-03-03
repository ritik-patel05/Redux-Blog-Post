import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        /*postAdded({
          id: nanoid(), // Forcing component to calculate logic to prepare for payload.
          /* Maybe it is too complicated and not want to write in every component? 
          So, we should better write this logic in action creator.
          createSlice lets us define "prepare callback" when we write a reducer.
          Can take multiple arguments, generate random values like unique IDs, run
          any SYNCHRONOUS logic is needed to decide what values go into action object.
          Should return object with payload field inside.
          Can contain "meta" field(Add extra descriptive values to action)
          Can contain "error" field(Boolean indicating whether this action represents an error)
          
          title,
          content,
        })*/
        postAdded(title, content, userId)
      )
      setTitle('')
      setContent('')
    }
  }

  // If the value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""),
  // the object has an initial value of false.

  // NOTE: Any object of which the value is not [[undefined or null]], including a Boolean object whose value is false,
  // evaluates to true when passed to a conditional statement. For example, the condition in the following if statement evaluates to true:
  /*
  var x = new Boolean(false);
  if (x) {
    // this code is executed
  }
  
  BEST PRACTICE:
  Do not use a Boolean object to convert a non-boolean value to a boolean value. To perform this task, instead, use Boolean as a function, or a double NOT operator:

  var x = Boolean(expression);     // use this...
  var x = !!(expression);          // ...or this
  var x = new Boolean(expression); // don't use this!
  */
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
