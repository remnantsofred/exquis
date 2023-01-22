import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"

import ColorPalettePicker from "./ColorPalettePicker/ColorPalettePicker"

const PlaceBones = (bones) => {
  const [loaded, setLoaded] = useState(false)
  const palette = ColorPalettePicker()
  const body = []
  


  useEffect(() => {
    const onPageLoad = () => {
      setLoaded(true)
    }

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad)
    }

  }, [])
  
  const compileBones = () => {
    const bonesLength = bones.component.length
    var pNum = 0

    const resetPNum = () => {
      if (pNum >= palette.length) {
        pNum -= pNum;
      }
    }

    for (var i = 0; i < bonesLength; i ++) {
      resetPNum();
      let sentence = <span style={{color: `${palette[pNum]}`}}>{bones.component[i].text} </span> 
      body.push(sentence)
      pNum++
    }
    return (
      body
    )
  }

  return (
    compileBones()
  )
}

export default PlaceBones;