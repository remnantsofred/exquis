
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUsers, fetchUsers } from '../../../store/users'

const TempUsersIndex = () => {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const users = useSelector(getUsers)

  console.log(users)

  useEffect(() => {
    Promise.all([
      dispatch(fetchUsers)
    ]).then(()=>{
      setLoaded(true);
    })
  }, [dispatch])




  return (
    <h1>my disappointment is immeasurable and my day is ruined</h1>
  )
}

export default TempUsersIndex