import { configureStore } from '@reduxjs/toolkit'
import reqBodyReducer from './components/middlewares/reducer.js'

export default configureStore({
  reducer: {
    reqBody: reqBodyReducer
  }
})