import { BASE_URL } from "@/constants/baseURL"
const getData = async (path: String) =>{
    const res = await fetch(`${BASE_URL}${path}`)
    const res2 = await res.json()
     return res2.data
  }

export {getData}