import { useEffect, useState } from "react"
import baloon from "../assets/baloon.png"
import axios from "axios"
import BirthdayAnimation from "../components/BirthdayAnimation"


type LandingPageProps = {
  birthdayData: {
    name: string;
    age: string;
    message: string;

  };
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  close: boolean;

  setbirthdayData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      age: string;
      message: string;
    }>
  >
}
function LandingPage({ birthdayData, setClose, close, setbirthdayData }: LandingPageProps) {
  let [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(false);
  // let [close, setClose] = useState(false)
  console.log("close", close)
  const [uniqueCode, setUniqueCode] = useState()

  const BASE_URL = import.meta.env.VITE_BACKEND_PORT;

  // const [birthdayData, setbirthdayData] = useState({
  //   name: "",
  //   age: "",
  //   message: ""
  // })

  useEffect(() => {
    if (close) {
      setbirthdayData({
        name: "",
        age: "",
        message: ""
      })
    }
  }, [close])




  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true)
      // const res = await axios.post("http://localhost:5000/birthdayData/create", birthdayData)
      const res = await axios.post(`${BASE_URL}/birthdayData/create`, birthdayData);

      console.log(res)
      setClose(false);
      setUniqueCode(res.data.uniqueCode)
      setAnimate(true)
      console.log(animate)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  // ss
  return (
    <>
      {animate && !close && (<div className="h-screen w-full z-20 bg-white/30 backdrop-blur-sm absolute"></div>)}
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
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>
                <input     maxLength={300} onChange={(e) => setbirthdayData({ ...birthdayData, message: e.target.value })} value={birthdayData.message} name="message" placeholder="Message" className="bg-gray-100 p-2 mb-3"></input>
              </div> */}

              <div className="flex flex-col gap-2">
                <label htmlFor="message">Message</label>

                <textarea
                  name="message"
                  value={birthdayData.message}
                  onChange={(e) =>
                    setbirthdayData({
                      ...birthdayData,
                      message: e.target.value,
                    })
                  }
                  maxLength={300}
                  rows={5}
                  placeholder="Write your birthday message..."
                  className="bg-gray-100 p-2 resize-none"
                />

                <p
                  className={`text-sm text-right ${300 - birthdayData.message.length <= 20
                      ? "text-red-500"
                      : "text-gray-500"
                    }`}
                >
                  {300 - birthdayData.message.length} characters remaining
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-2xl px-2 py-2 mt-4 text-white ${loading
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                    }`}
                >
                  {loading ? "Creating..." : "CREATE"}
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

          <BirthdayAnimation setClose={setClose} close={close} birthdayData={birthdayData} uniqueCode={uniqueCode} />
        </div >
      }
      {/* </>

      } */}



    </>
  )
}

export default LandingPage
