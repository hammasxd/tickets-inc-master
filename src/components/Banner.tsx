import React from 'react'

function Banner() {
  return (
    <div className=' flex flex-col rounded-2xl border border-primary shadow-xl w-full'>
        <div className='banner-inner flex flex-row justify-between  gap-52 px-28 py-10'>
            <div className='leftSide flex flex-col justify-center align-middle'>
                <h1 className='text-4xl font-bold text-primary'><span className='text-lg font-bold text-foreground'>Welcome to</span> <br></br>Tickets Inc.</h1>
                <p className='text-lg'>The best place to find and create events</p>
            </div>
            <div className='rightSide flex-col justify-center items-center align-middle'>
                    <h1 className=' font-bold text-2xl text-primary'>Events Include</h1>
                    <ul className=' text-foreground'>
                        <li className=''>Concerts</li>
                        <li>Conferences</li>
                        <li>Workshops</li>
                        <li>Parties</li>
                    </ul>
            </div>
        </div>
    </div>
  )
}

export default Banner