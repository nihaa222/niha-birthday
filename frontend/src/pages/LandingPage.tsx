import { useState } from "react"
import baloon from "../assets/baloon.png"
function LandingPage() {

const [birthdayData, setbirthdayData] = useState({
  name: "",
  age: "",
  message: ""
})

const handleSubmit = (e: React.SyntheticEvent) => {
  e.preventDefault();
  console.log({
    ...birthdayData,
    age: Number(birthdayData.age)
  })
}
  return (
   <div className="bg-yellow-50 relative h-screen w-screen ">
        <img className="absolute top-5 left-5" src={baloon}></img>
        <img className="absolute bottom-5 left-5" src={baloon}></img>
        <img className="absolute top-5 right-5" src={baloon}></img>
        <img className="absolute bottom-5 right-5" src={baloon}></img>
        <div className="absolute gap-10 w-[80%] justify-between  mx-auto flex flex-col lg:flex-row  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <div className="text-5xl lg:text-7xl">
            <p className="bg-orange-300 text-white text-nowrap text-center p-2">CREATE A</p>
            <p className="bg-red-700 text-white text-center">BIRTHDAY</p>
            <p className="bg-orange-300 text-white text-center p-2">CARD</p>
          </div>
          <div className="bg-white p-10 w-full lg:w-1/2  ">
            <p className=" text-center leading-5">Enter the birthday person's name, age, and a custom message that will appear after they blow out thei candles</p>
            <form className="pt-10" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label >Name</label>
                <input value={birthdayData.name} onChange={(e) => setbirthdayData({...birthdayData, name:e.target.value})} type="text" name="name" placeholder="Name" className="bg-gray-100 mb-3 p-2"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="age">Age</label>
                <input type="number" value={birthdayData.age} onChange={(e)=> setbirthdayData({...birthdayData, age:e.target.value})} name="age" placeholder="Name" className="bg-gray-100 p-2 mb-3"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <textarea onChange={(e) => setbirthdayData({...birthdayData, message:e.target.value})} value={birthdayData.message} name="message" rows={4} placeholder="Message" className="bg-gray-100 p-2 mb-3"></textarea>
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
  )
}

export default LandingPage
