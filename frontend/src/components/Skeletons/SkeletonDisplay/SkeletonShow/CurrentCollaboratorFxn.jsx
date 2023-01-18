

function currentCollaborator ({skellie}) {
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