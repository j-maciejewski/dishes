import { useDispatch, useSelector } from 'react-redux'
import { getDish, changeDishProperty } from '../slices/dishSlice'
import FieldWrapper from './FieldWrapper'

const SharedConfig = () => {
  const { dish } = useSelector(getDish)
  const dispatch = useDispatch()

  return (
    <>
      <FieldWrapper label="Name">
        <input
          value={dish.name}
          onChange={evt =>
            dispatch(changeDishProperty({ property: 'name', value: evt.target.value }))
          }
          minLength={3}
          maxLength={100}
          placeholder="Enter dish name..."
          required
        />
      </FieldWrapper>
      <FieldWrapper label="Preparation time">
        <input
          type="time"
          step="15"
          value={dish.duration}
          onChange={evt =>
            dispatch(changeDishProperty({ property: 'duration', value: evt.target.value }))
          }
          required
        />
      </FieldWrapper>
      <FieldWrapper label="Dish type">
        <select
          value={dish.dish_type}
          onChange={evt =>
            dispatch(changeDishProperty({ property: 'dish_type', value: evt.target.value }))
          }
        >
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </FieldWrapper>
    </>
  )
}

export default SharedConfig
