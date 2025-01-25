import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
const List = ({token}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id },{headers:{token}});
      if (response.data.success) {
        toast.success('Product removed successfully');
        await fetchList();
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchList();
  }, [])
  return (
    <>
      <p className='mb-2'>All products list</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* Product List */}
        {
          list.map((product, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm' key={index}>
              <img className='w-12' src={product.image[0]} alt="" />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{currency}{product.price}</p>
              <p onClick={()=>removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          )
          )
        }
      </div>
    </>
  )
}

export default List
