import React from 'react'
import RotatedTriangle from './ui/rotatedTriangle';

const HomePageSteps = () => {
    return (
        <div className='bg-[#fcfcfc]'>
            <div className='flex justify-center'>
                <RotatedTriangle size={25} color='black' />
            </div>

            <h1 className='flex justify-center font-canvaSans font-semibold text-[35px] mt-10'>Get a job offer in 3 easy steps 😍</h1>
            <img src="./src/assets/JobFlow.svg" alt="Steps" className='mx-auto -mt-5 pointer-events-none' />

            <div className='flex justify-center'>
                <h1 className='font-canvaSans font-semibold text-[27px] text-center w-1/2 mt-10'>“Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.”</h1>
            </div>
        </div>
    )
}

export default HomePageSteps;