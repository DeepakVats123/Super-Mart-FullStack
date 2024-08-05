"use client"
import React from 'react'


const Filters = ({setsorting}: any) => {

  function handleSort(e:any){
    console.log(e.target.value)
   if(e.target.value == "sort-by"){
      setsorting(()=> ()=> (a:any,b:any)=>{})
      
      
   }
   else if(e.target.value == "low-high"){
    setsorting(() => (a:any, b:any) => a.price - b.price)
    }
    else if(e.target.value == "high-low"){
      setsorting(() => (a:any,b:any) => b.price - a.price)
      }
  
    else if(e.target.value == "backToDefault"){
      setsorting(()=> ()=> (a:any,b:any)=>{})
      }
  
      else if(e.target.value == "a-z"){
        setsorting(() => (a:any,b:any)=> {
          if (a.brand < b.brand) {
            return -1;
          }
          if (a.brand > b.brand) {
            return 1;
          }
          return 0;
        
        })
        }
        else if(e.target.value == "z-a"){
          setsorting(() => (a:any,b:any)=> {
            if (a.brand > b.brand) {
              return -1;
            }
            if (a.brand < b.brand) {
              return 1;
            }
            return 0;
          
          })
          }
        
  
  }
   
  return (
    <div>
         <select className='border p-3 m-5 sm:mx-10 rounded-lg'  onChange={handleSort} >
            <option value="sort-by">Sort-By</option>
            <option value="low-high">Price (Low - High)</option>
            <option value="high-low">Price (High - Low)</option>
            <option value="a-z">Brand (A - Z)</option>
            <option value="z-a">Brand (Z - A)</option>
            
        </select>
    </div>
  )
}

export default Filters