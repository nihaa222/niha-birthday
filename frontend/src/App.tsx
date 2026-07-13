import { useState } from "react"
import BirthdayPage from "./pages/BirthdayPage"
import LandingPage from "./pages/LandingPage"
import { Routes, Route } from "react-router"


function App() {
 const [birthdayData, setbirthdayData] = useState({
    name: "",
    age: "",
    message: ""
  })

   let [close, setClose] = useState(false)

  return (
    <>
      <Routes>
        <Route index element={<LandingPage  close={close} setClose={setClose} setbirthdayData={setbirthdayData} birthdayData={birthdayData}/>}/>
        <Route  path="/:id" element={<BirthdayPage />}/>
      </Routes>
       
    </>
  )
}

export default App

