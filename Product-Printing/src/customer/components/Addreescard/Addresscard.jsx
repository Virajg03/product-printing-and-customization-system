import React, { useEffect, useState } from 'react'
import Deleiveryaddressform from '../Checkout/Deleiveryaddressform'
import { api } from '../../../Config/apiconfig';

const Addresscard = ({address}) => {
  // const [address, setAddress] = useState(null);

  // useEffect(() => {
  //   getAddress();
  // }, []);

  // const getAddress =  async () => {
  //     const {data} = await api.get('/api/users/addresses');
  //     setAddress(data);
  //     console.log('address..............', data);
  // }

  useEffect(() => {
    console.log(address);
  }, [address]);
  
  return (
    <div className='lg:grid grid-cols-2'>
      <div className='space-y-2'>
        <p className='font-semibold'>{`${address?.firstName ?? ''} ${address?.lastName ?? ''}`}</p>
        
        <p> {`${address?.streetAddress ?? ''} ${address?.city ?? ''} ${address?.state ?? ''} ${address?.zipcode ?? ''}`}</p>
       <div className='space-y-1'>
        <p className='font-semibold'>Phone number</p>
        <p>{address?.mobile ?? ''}</p>
        {/* {Address.firstName+""+Address.lastName} */}
        {/* {Address.state},{Address.stateAddress},{Address.zipCode} */}
        {/* {Address.mobile} */}
       </div>
      </div>
    </div>
  )
}

export default Addresscard
