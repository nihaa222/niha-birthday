import baloon from "./assets/baloon.png"

function App() {


  return (
    <>

      <div className="bg-yellow-50 relative h-screen w-screen ">
        <img className="absolute top-5 left-5" src={baloon}></img>
        <img className="absolute bottom-5 left-5" src={baloon}></img>
        <img className="absolute top-5 right-5" src={baloon}></img>
        <img className="absolute bottom-5 right-5" src={baloon}></img>
        <div className="absolute w-[70%] justify-between  mx-auto flex  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
          <div className="text-7xl">
            <p className="bg-orange-300 text-white text-nowrap text-center p-2">CREATE A</p>
            <p className="bg-red-700 text-white text-center">BIRTHDAY</p>
            <p className="bg-orange-300 text-white text-center p-2">CARD</p>
          </div>
          <div className="bg-white p-10 w-1/2 ">
            <p className=" text-center leading-5">Enter the birthday person's name, age, and a custom message that will appear after they blow out thei candles</p>
            <form className="pt-10">
              <div className="flex flex-col gap-2">
                <label>Name</label>
                <input placeholder="Name" className="bg-gray-100 mb-3 p-2"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label>Age</label>
                <input placeholder="Name" className="bg-gray-100 p-2 mb-3"></input>
              </div>
              <div className="flex flex-col gap-2">
                <label>Message</label>
                <input placeholder="Message" className="bg-gray-100 p-2 mb-3"></input>
              </div>
              <div className="flex justify-center">
                <button className="button rounded-2xl bg-purple-500 text-white px-2 py-2 mt-4 ">
                  CREATE
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
