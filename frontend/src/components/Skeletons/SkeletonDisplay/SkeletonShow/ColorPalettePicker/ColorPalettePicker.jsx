const ColorPalettePicker = () => {
  const p1 = [
    "#4C3A51",
    "#774360",
    "#B25068",
    "#E7AB79"
  ]

  const p2 = [
    "#2C3639",
    "#3F4E4F",
    "#A27B5C",
    "#DCD7C9"
  ]

  const p3 = [
    "#420516",
    "#7D1935",
    "#B42B51",
    "#E63E6D"
  ]

  const p4 = [
    "#261C2C",
    "#3E2C41",
    "#5C527F",
    "#6E85B2"
  ]

  const p5 = [
    "#041C32",
    "#04293A",
    "#064663",
    "#ECB365"
  ]

  const p6 = [    
    "#7B2869",
    "#9D3C72",
    "#C85C8E",
    "#FFBABA"
  ]

  const p7 = [
    "#0A2647",
    "#144272",
    "#205295",
    "#2C74B3"
  ]

  const p8 = [
    "#16213E",
    "#0F3460",
    "#533483",
    "#E94560"
  ]

  const palettes = [p1, p2, p3, p4, p5, p6, p7, p8]

  const randomPalette = (array) => {
    return (
      array[Math.floor((Math.random() * (array.length)))]
    )
  };  

  const palette = randomPalette(palettes)

  return (
    palette
  )
}

export default ColorPalettePicker;