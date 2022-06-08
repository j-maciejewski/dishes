import { configureStore } from '@reduxjs/toolkit'
import dishSlice from './slices/dishSlice'

export const store = configureStore({
  reducer: {
    dish: dishSlice,
  },
})
