import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDish, showInfoBar, submitDish } from '../slices/dishSlice'
import PizzaConfig from './PizzaConfig'
import SandwichConfig from './SandwichConfig'
import SoupConfig from './SoupConfig'
import InfoBar from './InfoBar'
import SharedConfig from './SharedConfig'

const Form = () => {
  const formRef = useRef(null)
  const { dish, infoBar, formSubmited } = useSelector(getDish)
  const dispatch = useDispatch()

  // console.log(dish, infoBar, formSubmited)

  const validateForm = () => {
    const inputs = [...formRef.current.querySelectorAll('input')]

    let dishIsValid = true

    inputs.forEach(input => {
      if (input.checkValidity()) return

      input.closest('fieldset').classList.add('not-valid')
      setTimeout(() => {
        input.closest('fieldset').classList.remove('not-valid')
      }, 2500)
      dishIsValid = false
    })

    return dishIsValid
  }

  const handleSubmit = evt => {
    evt.preventDefault()

    if (!validateForm()) {
      dispatch(showInfoBar({ message: 'Invalid inputs', level: 'ERROR' }))
      return
    }

    const dishConfig = {
      name: dish.name,
      preparation_time: dish.duration,
      type: dish.dish_type,
    }

    if (dish.dish_type === 'pizza') {
      dishConfig.no_of_slices = Number(dish.pizza_config.no_of_slices)
      dishConfig.diameter = Number(dish.pizza_config.diameter)
    } else if (dish.dish_type === 'soup') {
      dishConfig.spiciness_scale = Number(dish.soup_config.spiciness_scale)
    } else if (dish.dish_type === 'sandwich') {
      dishConfig.slices_of_bread = Number(dish.sandwich_config.slices_of_bread)
    }

    dispatch(submitDish(dishConfig))
  }

  return (
    <form autoComplete="off" ref={formRef}>
      <SharedConfig />
      {dish.dish_type === 'pizza' && <PizzaConfig />}
      {dish.dish_type === 'soup' && <SoupConfig />}
      {dish.dish_type === 'sandwich' && <SandwichConfig />}
      <button className="submit-dish" onClick={handleSubmit} disabled={formSubmited || !!infoBar}>
        Submit
      </button>
      {infoBar && <InfoBar />}
    </form>
  )
}

export default Form
