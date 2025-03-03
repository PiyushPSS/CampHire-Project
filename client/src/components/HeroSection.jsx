import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-[url("./src/assets/HeroBG.svg")] bg-cover bg-center bg-no-repeat h-screen flex justify-center'>

            <div>
                <img src="./src/assets/HeroMain3.svg" alt="Hero Rectangle" className='mx-auto mt-10 pointer-events-none' />
            </div>

        </div>
    )
}

export default HeroSection


{/* <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
<input
    type="text"
    placeholder='Find your dream jobs'
    onChange={(e) => setQuery(e.target.value)}
    className='outline-none border-none w-full'

/>
<Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
    <Search className='h-5 w-5' />
</Button>
</div> */}