import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  dish: {
    name: '',
    duration: '00:00:00',
    dish_type: 'pizza',
    pizza_config: {
      no_of_slices: 8,
      diameter: 30,
    },
    soup_config: {
      spiciness_scale: 3,
    },
    sandwich_config: {
      slices_of_bread: 1,
    },
  },
  infoBar: null,
  formSubmited: false,
}

export const submitDish = createAsyncThunk(
  'users/submitDish',
  async (dish, { rejectWithValue }) => {
    try {
      const response = await fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dish),
      })

      if (!response.ok) return rejectWithValue()

      const data = await response.json()

      return data
    } catch (err) {
      return rejectWithValue()
    }
  },
)

export const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    changeDishProperty: (state, action) => {
      if (action.payload.itemProperty) {
        switch (action.payload.itemProperty) {
          case 'pizza':
            state.dish.pizza_config[action.payload.property] = action.payload.value
            break
          case 'soup':
            state.dish.soup_config[action.payload.property] = action.payload.value
            break
          case 'sandwich':
            state.dish.sandwich_config[action.payload.property] = action.payload.value
            break
          default:
            break
        }
      } else {
        state.dish[action.payload.property] = action.payload.value
      }
    },
    showInfoBar: (state, action) => {
      state.infoBar = {
        message: action.payload.message,
        level: action.payload.level,
      }
    },
    hideInfoBar: (state, action) => {
      state.infoBar = null
    },
  },
  extraReducers: {
    [submitDish.pending]: state => {
      // console.log('pending')
      state.formSubmited = true
    },
    [submitDish.fulfilled]: state => {
      // console.log('fulfilled')
      state.infoBar = { message: 'Dish submited', level: 'SUCCESS' }
      state.formSubmited = false
    },
    [submitDish.rejected]: state => {
      console.log('rejected')
      state.infoBar = { message: 'Something went wrong', level: 'ERROR' }
      state.formSubmited = false
    },
  },
})

export const { changeDishProperty, showInfoBar, hideInfoBar } = dishSlice.actions

export const getDish = state => state.dish

export default dishSlice.reducer
