import ColorPalettePicker from "./ColorPalettePicker/ColorPalettePicker"

const CurrentCollaboratorSketch = ({skellie}) => {
  // so first need to get the bone and for each bone, fetch the author/user
  // then set a color for both bone and author

  const AuthorColorArray = []
  // this array will have objects of the author id and the corresponding color assigned
  // but this doesn't really solve how to figure out the current collaborator
  const collaborators = skellie.collaborators
  const roundAmt = collaborators.length()
  const currentRounds = skellie.bones.length
  let currentAmt
  if (currentRounds < roundAmt) {
    currentAmt = roundAmt - currentRounds;
    return (currentAmt);
  } else {
    currentAmt = currentRounds % roundAmt;
    return (currentAmt);
  }

}

export default CurrentCollaboratorSketch