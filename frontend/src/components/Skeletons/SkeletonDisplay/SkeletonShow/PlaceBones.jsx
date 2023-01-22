import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"

const PlaceBones = ({colorArr, skellie}) => {
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
    return (
      color
    )
  }
  
  const compileBones = () => {
    for (var i = 0; i < bones.length; i ++) {
      const color = findColor(bones[i])
      let sentence = <span style={{color: `${color}`}}> {bones[i].text} </span> 
      body.push(sentence)
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