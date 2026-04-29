import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";

  type BirthdayUser = {
    _id: string
    name: string
    age: number
    message: string
    uniqueCode: string
  }
function BirthdayPage() {

  const { id } = useParams();
  const [user, setUser] = useState<BirthdayUser | null>(null)
  const [invalid, setInvalid] = useState(false)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/birthdayData/getuser/${id}`);
        setUser(res.data.birthdayUser)  
      } catch (error) {
        setInvalid(true)
      }
    }
    fetchUser()
  }, [id])

  useEffect(() => {
    const getMicAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log("Microphone access granted", stream)
      } catch (error) {
        if (error instanceof Error) {
          error.message
        }
        else {
          console.log("Something went wrong", error)
        }
      }
    }
    getMicAccess()
  }, [])

  if (invalid) {
    return (
      <h2>Invalid or expired birthday link</h2>
    )


  }

  if (user) {
    return (
      // <div>{user.name}
      //   <div className="flex flex-col items-center">

      //     {/* Flame */}
      //     <div className="flex flex-col items-center justify-center h-64 ">
      //       {/* 1. THE FLAME */}
      //       {flame &&
      //         <div
      //           className="w-[64px] h-[96px] bg-gradient-to-t from-orange-600 to-yellow-300"
      //           style={{
      //             // Fixed: The numbers now match the width/height of the div
      //             clipPath: "path('M 32,0 C 32,0 64,32 64,64 A 32,32 0, 1,1 0,64 C 0,32 32,0 32,0')"
      //           }}
      //         ></div>
      //       }


      //       {/* 2. THE WICK */}
      //       <div className="w-1 h-3 bg-gray-800"></div>

      //       {/* 3. THE CANDLE BODY */}
      //       <div className="relative w-16 h-32 bg-red-600 rounded-b-lg">
      //         {/* The 3D Top (Ellipse Clip) */}
      //         <div
      //           className="absolute top-0 w-full h-4 bg-red-400"
      //           style={{ clipPath: "ellipse(50% 50% at 50% 50%)" }}
      //         ></div>
      //       </div>

      //       {/* 4. THE GLOW (Optional) */}
      //       <div className="absolute w-20 h-20 bg-orange-500 rounded-full blur-3xl opacity-20 transform -translate-y-24"></div>
      //     </div>

      //   </div>

      /* CardOpen */

      <div className=" h-screen no-scrollbar flex justify-center items-center">
        <Card user={user}/>
      </div>



      // </div>
    )
  }

}

export default BirthdayPage
