export type Category = {
  id: string
  name: string
}
export type Product = {
  id: string
  name: string
  price: number
  description: string
  banner: string
  category_id: string
}
export type Order = {
  id: string
  table: number
  status: boolean
  draft: boolean
  name: string | null
  created_at?: string
  updated_at?: string
}
export type OrderDetails = {
  id: string
  amount: number
  order_id: string
  product_id: string
  created_at?: string
  updated_at?: string
  product: Product
  order: Order
}
