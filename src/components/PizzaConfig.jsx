import { useDispatch, useSelector } from 'react-redux'
import { getDish, changeDishProperty } from '../slices/dishSlice'
import FieldWrapper from './FieldWrapper'

const PizzaConfig = () => {
  const { dish } = useSelector(getDish)
  const dispatch = useDispatch()

  return (
    <div id="pizza-config">
      <FieldWrapper label="Slices">
        <input
          type="number"
          value={dish.pizza_config.no_of_slices}
          onChange={evt =>
            dispatch(
              changeDishProperty({
                itemProperty: 'pizza',
                property: 'no_of_slices',
                value: evt.target.value,
              }),
            )
          }
          min={1}
          max={50}
          required
          placeholder="Enter number of slices..."
        />
      </FieldWrapper>
      <FieldWrapper label="Diameter">
        <input
          type="range"
          value={dish.pizza_config.diameter}
          onChange={evt =>
            dispatch(
              changeDishProperty({
                itemProperty: 'pizza',
                property: 'diameter',
                value: evt.target.value,
              }),
            )
          }
          step={2.5}
          min={30}
          max={60}
          required
        />
        <output>{dish.pizza_config.diameter} cm</output>
      </FieldWrapper>
    </div>
  )
}

export default PizzaConfig
