import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../../../Loading/Loading"


const IndexPlaceBones = (bones) => {
  const [loaded, setLoaded] = useState(false)
  const body = []
  
  console.log(bones)

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

  // if (!bones.length) {
  //   return []
  // }

  
  const compileBones = () => {
    bones.bones.map(bone => {
      const sentence = <span>{bone.text} </span>
      body.push(sentence)    
    })
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

export default IndexPlaceBones;