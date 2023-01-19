import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"

import ColorPalettePicker from "./ColorPalettePicker/ColorPalettePicker"

const PlaceBones = (bones) => {
  console.log(bones)
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

  
  const compileBones = () => {
    console.log("i'm not here shhhhhh")
    console.log(bones)
    const bonesLength = bones.component.length
    console.log('BONES LENGTH')
    console.log(bonesLength)

    var pNum = 0

    const resetPNum = () => {
      if (pNum >= palette.length) {
        pNum -= pNum;
      }
    }

    for (var i = 0; i < bonesLength; i ++) {
      console.log("WHY HELLO JOHNNY BOOTH")
      console.log(bones.component[i].text)
      resetPNum();
      let sentence = <span style={{color: `${palette[pNum]}`}}>{bones.component[i].text} </span> 
      body.push(sentence)
      pNum++
    }
    return (
      body
    )
  }
  // const bonesCompiled = bones.map((bone, idx)=> <span style={{color: `${palette[idx]}`}}>{bone.text} </span>)
  // useEffect(() => {
  //   Promise.all([
  //     bones
  //   ]).then(() =>{
  //     setLoaded(true)
  //   })

  // }, [bones])

  // if (!loaded) {
  //   return (
  //     <Loading />
  //   )  
  // } else if (loaded && bones) {
  return (
    // bones.map((bone, idx)=> <span style={{color: `${palette[idx]}`}}>{bone.text} </span>)
    compileBones()
  )
// }
}

export default PlaceBones;