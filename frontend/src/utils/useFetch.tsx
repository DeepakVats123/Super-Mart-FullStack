"use client"
import React, { useEffect, useState } from 'react'
import { BASE_URL } from "@/constants/baseURL"


const useFetch = (url: String) => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch(`${BASE_URL}${url}`)
    .then(res => res.json())
    .then(data =>setData(data.data))
  },[url])
  
  return (data)
}

export default useFetch