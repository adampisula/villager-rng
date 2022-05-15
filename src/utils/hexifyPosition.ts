import { mapNumber } from "./mapNumber"

interface PosXZ {
  x: number,
  z: number,
}

const hexifyPosition = (data: PosXZ) => {
  const mappedX = Math.round(mapNumber(data.x, -0.5, 16.5, 0, 15))
  const mappedZ = Math.round(mapNumber(data.z, -0.5, 16.5, 0, 15))

  const concatBinary = (mappedX << 4) + mappedZ

  return `0${concatBinary.toString(16)}`.slice(-2).toUpperCase()
}

export default hexifyPosition