import { Image } from '@nextui-org/react'

import img1 from '../assets/2800e9d2f0c3779e5e866d8fcc5734cb.png'
import img2 from '../assets/1c4224a67b9cf43cfbdb253c88d924e6.png'

import img3 from '../assets/evaluation.png'
import img4 from '../assets/agreetoterms.png'



const HowToSell = () => {

    return (
        <div className='flex flex-col ml-10 my-6 '>
            <div className=' mb-4 font-semibold text-2xl'>How To Sell</div>
            <div className=' flex mb-4 '>
                <Image
                    width={200}
                    height={200}
                    src={img1}

                />
                <div className='ml-4'>
                    <h3 className=' font-bold'>1.Enter your detail</h3>
                    <p>You can register yourself as a dealer or an indvisual</p>
                </div>
            </div>
            <div className=' flex  mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img2}

                />
                <div className='ml-4'>
                    <h3 className=' font-bold'>2.Provide vehicle info</h3>
                    <p>Provide a detailed info of your vehicle</p>
                </div>
            </div>
            <div className=' flex  mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img3}

                />
                <div className='ml-4'>
                    <h3 className=' font-bold' >3.Evaluation</h3>
                    <p>Schedule an envaluation for your car and our experts willl come to you to conduct a thorough inspection </p>
                </div>
            </div>
            <div className=' flex  mb-4'>
                <Image
                    width={200}
                    height={200}
                    src={img4}

                />
                <div className='ml-4'>
                    <div className=' font-bold' >4.List your vehicle</div>
                    <div>Agree to our terms and conditions and list your vehicle up for an auction</div>
                </div>
            </div>
        </div>
    )
}


export default HowToSell