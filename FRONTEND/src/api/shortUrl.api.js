
import axios from 'axios'

export const createShortUrl = async ({ url }) => {  // ✅ destructure here
   const { data } = await axios.post("/api/create", { url })
   return data
}