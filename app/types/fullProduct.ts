export interface FullProduct {
  id: string
  name: string
  priceRegular: number
  priceDiscount: number
  screen: string
  capacityAvailable: string[]
  capacity: string
  colorsAvailable: string[]
  color: string
  ram: string
  images: string[]
  namespaceId: string
  description: { title: string; text: string[]; }[]
  resolution: string
  camera: string
  zoom: string
  cell: string[]
  processor: string
}
