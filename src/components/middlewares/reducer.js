import { createSlice } from '@reduxjs/toolkit';
import {callFilter} from './middlewares.js';

let allItems = { 
    categories: [],
    formats: [],
    pageIndex: 1,
    pageSize: 6,
    search: ""
};

let afterFiltered =  callFilter();

export const reqBody = createSlice({
  name: 'requestBody',
  initialState: {
    allItems
  },
  reducers: { 
    body: state => {state.allItems = {...afterFiltered}}
  }
})

export const {  body  } = reqBody.actions

export default reqBody.reducer;
