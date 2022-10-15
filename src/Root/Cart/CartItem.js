import React from 'react'
import { faAngleUp, faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function CartItem({ item, handleRemove, handleDecreament, handleIncreament }) {
    return (
        <div className="card bg-base-100 my-2 shadow-md lg:max-w-[50%] md:max-w-[75%] hover:border-2 hover:border-purple-600">
            <div className='flex items-center max-h-[105px] justify-center'>
                <img src={item?.img} className='w-[22%] pr-1' />
                <div className='min-w-[38%] md:min-w-[50%]' title={item.name}>
                    <p className=' py-2 text-xs whitespace-nowrap md:hidden'>{item?.name?.length > 20 ? item?.name.slice(0, 18) + '...' : item?.name}</p>
                    <p className=' py-2 text-base  hidden md:block'>{item?.name}</p>
                    <p>${item.price}</p>
                </div>
                <div className='flex items-center justify-between mx-4 w-full'>
                    <div className='flex border-2 h-10 mx-1 pl-3 items-center justify-between w-[80px]'>
                        <p className='cursor-pointer' onClick={() => handleIncreament(item.id, item?.quantity)}><FontAwesomeIcon icon={faAngleUp} /></p>
                        <p>{item?.quantity}</p>
                        <p className='cursor-pointer' onClick={() => handleDecreament(item.id, item?.quantity)}><FontAwesomeIcon icon={faAngleDown} /></p>
                    </div>
                    <p className='text-red-500 cursor-pointer md:pl-2' onClick={() => handleRemove(item.id)}><FontAwesomeIcon icon={faTrash} /></p>
                </div>

            </div>
        </div>
    )
}

export default CartItem;