import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDish, hideInfoBar } from '../slices/dishSlice'
import { ReactComponent as CircleCheckSvg } from '../assets/circle-check.svg'
import { ReactComponent as CircleExclamationSvg } from '../assets/circle-exclamation.svg'

const InfoBar = () => {
  const infoBarRef = useRef(null)
  const { infoBar } = useSelector(getDish)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      infoBarRef.current.classList.add('visible')
    }, 100)

    setTimeout(() => {
      infoBarRef.current.classList.remove('visible')
      setTimeout(() => dispatch(hideInfoBar()), 500)
    }, 1900)
  }, [dispatch])

  console.log(CircleCheckSvg, CircleExclamationSvg)

  return (
    <div
      ref={infoBarRef}
      className={[
        'info-bar',
        ...(infoBar.level === 'SUCCESS' ? ['success'] : []),
        ...(infoBar.level === 'ERROR' ? ['error'] : []),
      ].join(' ')}
    >
      {infoBar.level === 'SUCCESS' && <CircleCheckSvg />}
      {infoBar.level === 'ERROR' && <CircleExclamationSvg />}
      {infoBar.message}
    </div>
  )
}

export default InfoBar
