import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"


const IndexPlaceBones = (bones) => {
  const [loaded, setLoaded] = useState(false)
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
    bones.bones.map(bone => {
      const sentence = <span>{bone.text} key={bone._id}</span>
      body.push(sentence)    
    })
    return (
      body
    )
  }

  return (
    compileBones()
  )
// }
}

export default IndexPlaceBones;