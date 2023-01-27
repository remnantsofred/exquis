
import { Link } from "react-router-dom"

const CollaboratorsListMap = ({colorArr, skellie}) => {

  const listie = []

  skellie.collaborators.forEach((collaborator) => {
    const colorObj = colorArr.find(color => color.author === collaborator._id)
    const color = colorObj.color
    listie.push(
    <Link to={`/users/${collaborator._id}`} className="skeleton-show-profile-link" key={collaborator._id}>
      <h2 style={{color: `${color}`}}> {collaborator.username} </h2>
    </Link>
  )
  })

  return (
    listie
  )

}
export default CollaboratorsListMap