import { useDispatch, useSelector } from 'react-redux'
import { getDish, changeDishProperty } from '../slices/dishSlice'
import FieldWrapper from './FieldWrapper'

const SoupConfig = () => {
  const { dish } = useSelector(getDish)
  const dispatch = useDispatch()

  return (
    <div id="soup-config">
      <FieldWrapper label="Spiciness">
        <input
          type="range"
          value={dish.soup_config.spiciness_scale}
          min={1}
          max={10}
          onChange={evt =>
            dispatch(
              changeDishProperty({
                itemProperty: 'soup',
                property: 'spiciness_scale',
                value: evt.target.value,
              }),
            )
          }
          required
        />
        <output>{dish.soup_config.spiciness_scale} / 10</output>
      </FieldWrapper>
    </div>
  )
}

export default SoupConfig
