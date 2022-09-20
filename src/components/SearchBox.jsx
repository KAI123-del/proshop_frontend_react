import React,{useState} from "react";
import { BsSearch } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'

function SearchBox() {
    const navigate=useNavigate();

    const searchHandler =(data)=>{
     if(!data.length){
        navigate('/')
     }else{
        navigate(`/search/${data}`)
     }
    }
     
   

  return (
    <div style={{ width: "40vw" }} className=" w-3/4 ">
      <div className="flex  rounded-lg border w-full pl-2 items-center space-x-3  border-zinc-500 shadow-xl shadow-black">
        <p className="text-zinc-500 text-2xl">
          <BsSearch />
        </p>
        <input
          onChange={(e)=>searchHandler(e.target.value)}
          style={{ width: "50vw" }}
          list="products"
          placeholder="Search for a product !"
          className="py-2  bg-transparent outline-none text-white font-nezto tracking-wider px-1"
        />
       
      </div>
    </div>
  );
}

export default SearchBox;
