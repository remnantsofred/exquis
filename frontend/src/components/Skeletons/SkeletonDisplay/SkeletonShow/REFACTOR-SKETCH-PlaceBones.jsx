import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"

// import CollaboratorColorMatch from "./ColorPalettePicker/CollaboratorColorMatch"

const NewPlaceBones = ({colorArr, skellie}) => {
  const [loaded, setLoaded] = useState(false)

  const body = []
  console.log('skellie here', skellie)
  console.log('colorArr in place bones', colorArr)
  const bones = skellie.bones

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

  const findColor = (bone) => {
    const collaborator = bone.author._id
    const colorObj = colorArr.find(color => color.author === collaborator)
    const color = colorObj.color
    console.log('find color in place bones', color)
    return (
      color
    )
  }
  
  const compileBones = () => {
    bones.forEach(bone => {
      const color = findColor(bone)
      console.log(bone.text)
      let sentence = <span style={{color: `${color}`}}> {bones.text} </span> 
      body.push(sentence)
      console.log(sentence)
    })
    console.log('body', body)
    return (
      body.flat()

    )
  }

  return (
    compileBones()
  )
}

export default NewPlaceBones;