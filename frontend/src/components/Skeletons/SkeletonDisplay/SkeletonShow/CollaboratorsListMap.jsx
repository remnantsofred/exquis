
const CollaboratorsListMap = ({colorArr, skellie}) => {

  const listie = []

  skellie.collaborators.forEach((collaborator) => {
    const colorObj = colorArr.find(color => color.author === collaborator._id)
    const color = colorObj.color
    listie.push(<h2 key={collaborator._id} style={{color: `${color}`}}> {collaborator.username} </h2>)
  })

  return (
    listie
  )

}
export default CollaboratorsListMap