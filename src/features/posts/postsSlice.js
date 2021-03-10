import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

/* A small state machine to track api call.{
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}*/
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

/* A thunk function is the one which have dispatch, getState as arguments.
1st => Create thunk
1st argument -> String: prefix for generated action types.
2nd argument -> "Payload Creator" Callback function: Return promise containing some data. OR
                                                     Return Promise with error */
export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // Payload creator recieves the partial `{title, content, user}` object
  async (initialPost) => {
    // Send the initial data to the server.
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
  }
)

// Then , handle actions in your reducer.
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // createSlice will generate an action creator for every reducer function we define in the reducers field,
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    [addNewPost.fulfilled]: (state, action) => {
      // we can directly add the new post object to our posts array.
      state.posts.push(action.payload)
    },
  },
  //extraReducers allows createSlice to respond to other action types besides the types it has generated.
  // Its keys are strings(Action type) => xyz
  // If we have "/" in that string => 'xyz'
  // Example :
  /*import { increment } from '../features/counter/counterSlice'

    const postsSlice = createSlice({
      name: 'posts',
      initialState,
      reducers: {
        // slice-specific reducers here
      },
      extraReducers: {
        [increment]: (state, action) => {
          // normal reducer logic to update the posts slice
        }
      }
    })  OORRR 
     extraReducers: builder => {
      builder.addCase('counter/decrement', (state, action) => {})
      builder.addCase(increment, (state, action) => {})
    }
    */
  extraReducers: {
    // [] => Means ES6 object literal computed properties,
    // Handle all three action types that could be dispatched by the thunk,
    // based on the Promise we return.
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array.
      // NOTE : concat used to join several arrays and RETURNS NEW array.
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// It's often a good idea to encapsulate data lookups by writing reusable selectors.
// Also, if we change the state object we dont have to change it in every component.
// You can also create "memoized" selectors that can help improve performance, which we'll look
// at in a later part of this tutorial.

// NOTE: Try starting w/o any selectors.
// Add more when many parts of our application need it.
export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
