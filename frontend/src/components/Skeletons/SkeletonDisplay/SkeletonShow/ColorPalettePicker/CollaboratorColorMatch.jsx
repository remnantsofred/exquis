const CollaboratorColorMatch = (collaborators) => {

  const selected = []
  console.log('collaborators', collaborators)

  // 1
  const RoyalBlueClassyPalette = [
    "#3F5AA8",
    "#A9AABC",
    "#757687",
    "#A33948",
    "#DF6D78"
  ]

  // 2
  const OliveGreenClassyPalette = [
    "#3F5A2A",
    "#A5AE9D",
    "#717A6A",
    "#005E71",
    "#0C91A5"
  ]

  // 3
  const LavaMagentaClassyPalette = [
    "#A1085C",
    "#BDA5AD",
    "#877179",
    "#6C4E00",
    "#A47F03"
  ]

  // 4
  const DarkForestGreenClassyPalette = [        
    "#0A2C0F",
    "#A0AFA0",
    "#6D7B6D",
    "#002C41",
    "#005A71"
  ]

  // 5
  const GrapePurpleClassyPalette = [
    "#A113B2",
    "#4F4350",
    "#B5A7B6",
    "#B12F00",
    "#F16500"
  ]

  // 6
  const DirtRockClassyPalette = [
    "#775A18",
    "#4F4537",
    "#B5AA99",
    "#006E55",
    "#23A387"
  ]

  // 7
  const RoyalPurpleClassyPalette = [
    "#330045",
    "#B4A7B7",
    "#7F7382",
    "#450000",
    "#79300F"
  ]

  // 8
  const CadmiumOrangeClassyPalette = [ 
    "#9E4302",
    "#54433A",
    "#BCA79D",
    "#00701F",
    "#35A54F"
  ]

  // 9
  const BluebirdBlueClassyPalette = [
    "#4220F0",
    "#AFA8BA",
    "#7B7485",
    "#D10000",
    "#FF0004"
  ]

  // 10
  const RomanticRedClassyPalette = [
    "#C00018",
    "#56423E",
    "#BEA6A1",
    "#1E6E00",
    "#5BA200"
  ]

  // 11
  const NewMexicoTurquoiseClassyPalette = [
    "#11677E",
    "#344A53",
    "#97AFB9",
    "#735478",
    "#A786AC"
  ]

  // 12 
  const SeaGlassCyanClassyPalette = [    
    "#008892",
    "#00A997",
    "#5BC88D",
    "#A6E37C",
    "#F9F871"
  ]

  // 13 
  const RedWineClassyPalette = [
    "#4D0C12",
    "#50162D",
    "#492544",
    "#3C3353",
    "#313F59"
  ]

  const unshuffledPalettes = [
    RoyalBlueClassyPalette, 
    OliveGreenClassyPalette,
    LavaMagentaClassyPalette,
    DarkForestGreenClassyPalette,
    GrapePurpleClassyPalette,
    DirtRockClassyPalette,
    RoyalPurpleClassyPalette,
    CadmiumOrangeClassyPalette,
    BluebirdBlueClassyPalette,
    RomanticRedClassyPalette,
    NewMexicoTurquoiseClassyPalette,
    SeaGlassCyanClassyPalette,
    RedWineClassyPalette
  ]

  const shuffle = ([...arr]) => {
    let length = arr.length;
    while (length) {
      const i = Math.floor(Math.random() * length--);
      [arr[length], arr[i]] = [arr[i], arr[length]];
    }
    return arr;
  };

  const palettes = shuffle(unshuffledPalettes)

  console.log(palettes)

  const randomColor = (array) => {
    return (array[Math.floor((Math.random() * (array.length)))])
  };  

  const ColorAuthorArray = []
  console.log('selected', selected)
  console.log('selected length', selected.length)

  console.log('collaborators', collaborators)
  console.log('collaborators length', collaborators.length)
  for (var i = 0; selected.length < collaborators.length; i++) {
    if (i === palettes.length) {i = 0}
    var selectedColor = randomColor(palettes[i])
    console.log(selectedColor)
    if (!selected.includes(selectedColor)) {
      selected.push(selectedColor)
    } else {
    while (!selected.includes(selectedColor)) {
      selectedColor = randomColor(palettes[i])
    }
      selected.push(selectedColor)
    }
    // it does make a selectedColor
    console.log('selected color in function', selected)
  }

  for (var j = 0; j < selected.length; j++) {
    const author = collaborators[j]._id;
    const color = selected[j];
    ColorAuthorArray.push({
      author: author,
      color: color
    })
  }

  // console.log(randomColor(DarkForestGreenClassyPalette))

  return (
    ColorAuthorArray
  )
}

export default CollaboratorColorMatch;

