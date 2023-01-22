

function CurrentCollaboratorFxn ({skellie, collaborators}) {
  console.log('current collab fxn collabs', collaborators)
  const roundAmt = collaborators.length
  const currentRounds = skellie.bones.length
  console.log('currentRounds', currentRounds)
  const currentAmount = () => {
    let baseNum
    if (currentRounds === 0) {
      baseNum = 0
      return (baseNum)
    } else if (currentRounds < roundAmt) {
      baseNum = roundAmt - currentRounds
      console.log(baseNum)
      return (baseNum);
    } else {
      baseNum = currentRounds % roundAmt;
      console.log(baseNum)
      return (baseNum);

    }
  }
  const turnNum = currentAmount()

  return (collaborators[turnNum])
}

export default CurrentCollaboratorFxn