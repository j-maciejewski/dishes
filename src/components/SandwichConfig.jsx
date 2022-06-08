import { useDispatch, useSelector } from 'react-redux'
import { getDish, changeDishProperty } from '../slices/dishSlice'
import FieldWrapper from './FieldWrapper'

const SandwichConfig = () => {
  const { dish } = useSelector(getDish)
  const dispatch = useDispatch()

  return (
    <div id="sandwich-config">
      <FieldWrapper label="Slices of bread">
        <input
          type="number"
          value={dish.sandwich_config.slices_of_bread}
          min={1}
          max={8}
          onChange={evt =>
            dispatch(
              changeDishProperty({
                itemProperty: 'sandwich',
                property: 'slices_of_bread',
                value: evt.target.value,
              }),
            )
          }
          placeholder="Enter number of slices of bread..."
          required
        />
      </FieldWrapper>
    </div>
  )
}

export default SandwichConfig
