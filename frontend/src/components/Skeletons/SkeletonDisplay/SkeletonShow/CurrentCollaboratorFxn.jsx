

function CurrentCollaboratorFxn ({skellie, collaborators}) {
  const roundAmt = collaborators.length
  const currentRounds = skellie.bones.length
  const currentAmount = () => {
    let baseNum
    if (currentRounds === 0) {
      baseNum = 0
      return (baseNum)
    } else if (currentRounds < roundAmt) {
      baseNum = roundAmt - currentRounds
      return (baseNum);
    } else {
      baseNum = currentRounds % roundAmt;
      return (baseNum);

    }
  }
  const turnNum = currentAmount()

  return (collaborators[turnNum])
}

export default CurrentCollaboratorFxn