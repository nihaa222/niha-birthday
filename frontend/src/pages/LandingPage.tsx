import { useState } from "react"
import baloon from "../assets/baloon.png"
import axios from "axios"


import BirthdayAnimation from "../components/BirthdayAnimation"
function LandingPage() {
  let [animate, setAnimate] = useState(false)
  const [uniqueCode, setUniqueCode] = useState()
  console.log(animate)

  const [birthdayData, setbirthdayData] = useState({
    name: "",
    age: "",
    message: ""
  })

  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      // const res = await axios.post("http://localhost:5000/birthdayData/create", birthdayData)
    const res = await axios.post("/api/birthdayData/create", birthdayData)

      console.log(res)
      setUniqueCode(res.data.uniqueCode)
      setAnimate(true)
      console.log(animate)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {animate && (<div className="h-screen w-full z-20 bg-white/30 backdrop-blur-sm absolute"></div>)}
      <div className="bg-yellow-50 overflow-hidden relative h-screen w-screen ">
        <img className="absolute top-5 left-5" src={baloon}></img>
        <img className="absolute bottom-5 left-5" src={baloon}></img>
        <img className="absolute top-5 right-5" src={baloon}></img>
        <img className="absolute bottom-5 right-5" src={baloon}></img>
        <div className="absolute gap-8 md:gap-10 w-[80%] py-10 justify-between  mx-auto flex flex-col lg:flex-row  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <div className="text-3xl md:5xl lg:text-7xl">
            <p className="bg-orange-300 text-white text-nowrap text-center p-2">CREATE A</p>
            <p className="bg-red-700 text-white text-center">BIRTHDAY</p>
            <p className="bg-orange-300 text-white text-center p-2">CARD</p>
          </div>
          <div className="bg-white p-6 md:p-10 w-full lg:w-1/2  ">
            <p className=" text-center text-sm md:text-[16px] leading-5">Enter the birthday person's name, age, and a custom message that will appear after they blow out thei candles</p>
            <form className="md:pt-10 pt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label >Name</label>
                <input value={birthdayData.name} onChange={(e) => setbirthdayData({ ...birthdayData, name: e.target.value })} type="text" name="name" placeholder="Name" className="bg-gray-100 mb-3 p-2"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="age">Age</label>
                <input type="number" value={birthdayData.age} onChange={(e) => setbirthdayData({ ...birthdayData, age: e.target.value })} name="age" placeholder="Age" className="bg-gray-100 p-2 mb-3"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <input onChange={(e) => setbirthdayData({ ...birthdayData, message: e.target.value })} value={birthdayData.message} name="message" placeholder="Message" className="bg-gray-100 p-2 mb-3"></input>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="button rounded-2xl bg-purple-500 text-white px-2 py-2 mt-4 ">
                  CREATE
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
      {/* {animate &&
        <> */}
      {uniqueCode &&
        < div className="z-30 absolute inset-0">

          <BirthdayAnimation uniqueCode={uniqueCode} />
        </div >
      }
      {/* </>

      } */}



    </>
  )
}

export default LandingPage
