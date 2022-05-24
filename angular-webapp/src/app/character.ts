import { Achievement } from "./achievement"
export interface Character {
  id: Number,
  account_id: Number,
  name: String,
  coins: Number,
  created_at: Date
  achievements: Achievement[]
}
