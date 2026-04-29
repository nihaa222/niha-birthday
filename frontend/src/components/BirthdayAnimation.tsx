import  { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import UrlBox from "./UrlBox"

const BirthdayAnimation = ({ uniqueCode }: { uniqueCode: string }) => {

  const [done, setDone] = useState(false)

  return (
    <div className="h-screen w-full flex items-center justify-center  overflow-hidden">
      <AnimatePresence>
        {!done && (


          <motion.div key="animation"
            initial={{ opacity: 1, }}
            exit={{ opacity: 0, x: -1000 }}
            transition={{ duration: 0.8 }} className="relative w-[420px] h-[700px] flex justify-center">

            {/* ENVELOPE BACK (Flap + Back Body) */}
            <motion.div
              initial={{ y: 800, opacity: 0 }}
              animate={{ y: 180, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="relative w-[400px] h-[340px] z-0"
            >
              {/* FLAP */}
              <div
                className=" w-full h-[90px] bg-gray-100 border border-gray-300"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />

              {/* BACK BODY */}
              <div className="absolute bottom-0 w-full h-[250px] bg-gray-200 border border-gray-300" />
            </motion.div>

            {/* CARD */}
            <motion.div
              initial={{ y: 800, rotate: 0, opacity: 1 }}

              onAnimationComplete={() => setDone(true)}

              animate={{
                y: [250, -250, 200],
                rotate: [0, 0, -90],
                opacity: [1, 1, 1, 1]
              }}
              transition={{
                times: [0, 0.6, 1],
                duration: 3,
                ease: "easeInOut"
              }}
              className="absolute w-[270px] h-[300px] bg-white border shadow-md flex items-center justify-center z-10"
            >
              <div className="border-2 border-black p-3 text-center">
                <p className="text-xs font-bold m-0">BIRTHDAY</p>
                <h1 className="text-2xl text-blue-500 m-0">JORDAN</h1>
              </div>
            </motion.div>

            {/* ENVELOPE FRONT POCKET */}
            <motion.div
              initial={{ y: 800, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                clipPath: "polygon(0 0, 50% 35%, 100% 0, 100% 100%, 0 100%)"
              }}
              className="absolute w-[400px] h-[250px] bg-gray-100 border border-gray-300 z-20 top-[270px]"
            />

          </motion.div>
        )}
      </AnimatePresence>
      {done && (

        <div className="h-screen w-full flex items-center justify-center  overflow-hidden">

          <motion.div initial={{ y: 800, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}><UrlBox uniqueCode={uniqueCode} /></motion.div>
        </div>

      )}
    </div>
  )
}

export default BirthdayAnimation