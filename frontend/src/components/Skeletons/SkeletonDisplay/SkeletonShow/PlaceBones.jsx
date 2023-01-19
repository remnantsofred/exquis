import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import ColorPalettePicker from "./ColorPalettePicker/ColorPalettePicker"
import bonesReducer, { getBone, fetchBone } from "../../../../store/bones"

function PlaceBones (bones) {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const palette = ColorPalettePicker()
  // const bonesObjArray = []
  const bonesLength = bones.length
  const body = []
  var pNum = 0
  

  // TODO: 01/18/2023 - figure out getting bones text

  // bones.forEach(boneId => {
  //   var bone = useSelector(getBone(boneId))
  //     useEffect(() => {
  //       Promise.all([
  //         dispatch(fetchBone(boneId))
  //       ])
  //     })
  //     bonesObjArray.push(bone)
  //     if (bonesObjArray.length() === bones.length) {
  //       setLoaded(true)
  //     }
  //   }, [dispatch]
  // )

  

  const resetPNum = () => {
    if (pNum >= palette.length) {
      pNum -= pNum;
    }
  }

  // for (var i = 0; i < bonesLength; i ++) {
  //   resetPNum();
  //   let sentence = <span style={{color: `${palette[pNum]}`}}>{bones[i]} </span> 
  //   body.push(sentence)
  //   pNum++
  // }

  const bonesCompiled = bones.map( (bone, idx)=> <span style={{color: `${palette[idx]}`}}>{bone} </span>)
  
  return (
    bonesCompiled
  )
}

export default PlaceBones;