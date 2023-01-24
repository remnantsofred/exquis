
import { Link } from "react-router-dom"

const CollaboratorsListMap = ({colorArr, skellie}) => {

  const listie = []

  skellie.collaborators.forEach((collaborator) => {
    const colorObj = colorArr.find(color => color.author === collaborator._id)
    const color = colorObj.color
    listie.push(
    <Link to={`/users/${skellie.owner._id}`} class="skeleton-show-profile-link">
      <h2 key={collaborator._id} style={{color: `${color}`}}> {collaborator.username} </h2>
    </Link>
  )
  })

  return (
    listie
  )

}
export default CollaboratorsListMap