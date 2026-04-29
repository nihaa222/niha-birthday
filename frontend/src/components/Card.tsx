import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type BirthdayUser = {
  _id: string
  name: string
  age: number
  message: string
  uniqueCode: string
}

function Card({ user }: { user: BirthdayUser }) {
  console.log(user)

  const [open, setOpen] = useState(false)

  const candleCount = Math.min(user.age, 100)

  const [candles, setCandles] = useState<{ x: number; y: number }[]>([])
  const [flames, setFlames] = useState<boolean[]>([])

  const blowCooldown = useRef(false)

  const [flamesOff, setFlamesOff] = useState(false)
  console.log(flamesOff)


  useEffect(() => {

    if (flames.length === 0) return

    const allFlamesOff = flames.every(f => !f)

    if (allFlamesOff) {
      setFlamesOff(true)
      console.log("All candles blown 🎉")
    }

  }, [flames])
  /* initialize flames */


  useEffect(() => {
    setFlames(Array.from({ length: candleCount }, () => true))
  }, [candleCount])



  /* generate candle positions */
  useEffect(() => {

    const positions: { x: number; y: number }[] = []

    const radiusX = 45
    const radiusY = 18
    const minDistance = 6

    let attempts = 0
    const maxAttempts = 5000

    while (positions.length < candleCount && attempts < maxAttempts) {

      attempts++

      const x = Math.random() * 100
      const y = Math.random() * 100

      const dx = x - 50
      const dy = y - 50

      if ((dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1) {

        let overlap = false

        for (const c of positions) {

          const dist = Math.sqrt((c.x - x) ** 2 + (c.y - y) ** 2)

          if (dist < minDistance) {
            overlap = true
            break
          }

        }

        if (!overlap) positions.push({ x, y })

      }

    }

    setCandles(positions)

  }, [candleCount])

  /* microphone listening */
  const startListening = async () => {

    try {

      // allow microphone

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // mic + analyser -- audio tools
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()

      // connect mic to analyser

      const source = audioContext.createMediaStreamSource(stream)

      source.connect(analyser)

      // create data storage

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const detectBlow = () => {

        analyser.getByteFrequencyData(dataArray)

        let sum = 0

        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }

        const volume = sum / dataArray.length

        if (volume > 30 && !blowCooldown.current) {

          blowCooldown.current = true

          extinguishCandles(volume)

          setTimeout(() => {
            blowCooldown.current = false
          }, 1200)

        }

        requestAnimationFrame(detectBlow)

      }

      detectBlow()

    } catch (err) {

      console.log("Microphone permission denied")

    }

  }

  const extinguishCandles = (volume: number) => {

    if (flames.every(f => !f)) return   // ✅ stop if already blown

    let candlesToBlow = 0

    if (volume > 88) candlesToBlow = 15
    else if (volume > 72) candlesToBlow = 12
    else if (volume > 65) candlesToBlow = 8
    else if (volume > 50) candlesToBlow = 4
    else candlesToBlow = 2

    candlesToBlow += Math.floor(Math.random() * 3)

    let blown = 0

    const interval = setInterval(() => {

      setFlames(prev => {

        // ✅ if already all false, stop
        if (prev.every(f => !f)) {
          clearInterval(interval)
          return prev
        }

        const updated = [...prev]

        for (let i = 0; i < updated.length; i++) {
          if (updated[i]) {
            updated[i] = false
            blown++
            break
          }
        }

        return updated

      })

      if (blown >= candlesToBlow) clearInterval(interval)

    }, 90)

  }

  return (
    <>


      <div className="hidden md:flex relative  w-[40%] xl:w-[35%] h-[70%] my-auto perspective-[1200px]">

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 2 }}
            className="absolute left-1/2 top-0 h-full w-[4px] blur-sm bg-gray-400 z-10"
          />
        )}

        <motion.div
          animate={{ translateX: open ? "50%" : 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full  p-4 flex flex-col justify-between pb-20 items-center bg-gray-300"
        >

          <div>
            <p className="text-6xl font-bold">BLOW!</p>
            <p className="text-center">For a surprise</p>
          </div>

          <div className="relative flex flex-col items-center w-full">

            {/* Candles */}
            <motion.div animate={{ rotateX: 20 }} className="absolute h-16 w-[90%] z-50">

              {candles.map((c, i) => (

                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >

                  {flames[i] && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.4 }}
                      className="w-2 h-2 bg-yellow-400 rounded-full mx-auto -mb-1"
                    />
                  )}

                  <div className="h-5 w-1.5 bg-red-500"></div>

                </div>

              ))}

            </motion.div>

            {/* Cake top */}
            <div
              style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              className="w-[90%] h-16 bg-pink-300 relative z-10"
            />

            {/* Cake layers */}
            <div className="w-[90%] h-14 bg-yellow-300 -mt-8"></div>
            <div className="w-[90%] h-6 bg-white"></div>
            <div className="w-[90%] h-12 bg-yellow-300"></div>

          </div>

        </motion.div>

        <motion.div
          // onClick={() => {
          //   setOpen(true)
          //   startListening()
          // }}
          animate={{
            rotateY: open ? -180 : 0,
            translateX: open ? "50%" : 0
          }}
          transition={{ duration: 1 }}
          style={{ transformOrigin: "left" }}
          className={`absolute w-full h-full z-50 bg-gray-300 flex flex-col items-center cursor-pointer ${open ? "p-10" : "justify-center"
            }`}
        >

          <motion.div initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.5 }}  className="">
            
            <motion.p
              style={{
                clipPath: "polygon(0 0 , 95% 0 , 100% 100% , 5% 100%)",

              }}
              className={`text-5xl bg-purple-500 p-8 mb-20 w-[100%] mx-auto ${open ? "hidden" : ""
                }`}
            >
              Happy Birthday!
            </motion.p>
            <motion.p

              style={{ display: open ? "none" : "block" }}
              className="text-8xl font-bold text-center "
            >
              {user.name}
            </motion.p>
            <div onClick={() => {
            setOpen(true)
            startListening()
          }} className={` ${open ? "hidden" : "block"} absolute bottom-5 right-5`}>Click Here</div>
          </motion.div>

          <div>
            {flamesOff && <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: open ? 1 : 0, rotateY: open ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl text-center  "
            >
              {user.message}
            </motion.p>}

          </div>


        </motion.div>

      </div>
      <div className="flex md:hidden relative w-[80%] xl:w-[35%] h-[90%] items-center my-auto perspective-[1200px]">

        {/* {open && (
        <motion.div
          initial={{ opacity: 0 }}a
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 2 }}
          className="absolute left-1/2 top-0 h-full w-[4px] blur-sm bg-gray-400 z-10"
        />
      )} */}

        <motion.div
          animate={{ translateY: open ? "50%" : 0 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-[50%] p-4 flex flex-col justify-between items-center bg-gray-300"
        >

          <div>
            <p className="text-6xl font-bold">BLOW S!</p>
            <p className="text-center">For a surprise</p>
          </div>

          <div className="relative flex flex-col items-center w-full">

            {/* Candles */}
            <motion.div animate={{ rotateX: 20 }} className="absolute h-16 w-[90%] z-50">

              {candles.map((c, i) => (

                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    transform: "translate(-50%, -100%)"
                  }}
                >

                  {flames[i] && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.4 }}
                      className="w-2 h-2 bg-yellow-400 rounded-full mx-auto -mb-1"
                    />
                  )}

                  <div className="h-5 w-1.5 bg-red-500"></div>

                </div>

              ))}

            </motion.div>

            {/* Cake top */}
            <div
              style={{ clipPath: "ellipse(50% 40% at 50% 50%)" }}
              className="w-[90%] h-16 bg-pink-300 relative z-10"
            />

            {/* Cake layers */}
            <div className="w-[90%] h-14 bg-yellow-300 -mt-8"></div>
            <div className="w-[90%] h-6 bg-white"></div>
            <div className="w-[90%] h-12 bg-yellow-300"></div>

          </div>

        </motion.div>

        <motion.div
          onClick={() => {
            setOpen(true)
            startListening()
          }}
          animate={{
            rotateX: open ? 180 : 0,
            translateY: open ? "50%" : 0
          }}
          transition={{ duration: 1 }}
          style={{ transformOrigin: "top" }}
          className="absolute w-full h-[50%] z-50 bg-gray-300 flex flex-col items-center justify-center cursor-pointer"
        >

          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            style={{
              clipPath: "polygon(0 0 , 95% 0 , 100% 100% , 5% 100%)"
            }}
             className={`text-5xl bg-purple-500 p-8 mb-20 w-[100%] mx-auto ${open ? "hidden" : ""
                }`}
          >
            Happy Birthday!
          </motion.p>

          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.5 }}
              style={{ display: open ? "none" : "block" }}
              className="text-8xl font-bold text-center "
          >
            {user.name}
          </motion.p>

          {flamesOff && <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0, rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{
              clipPath: "polygon(0 0 , 95% 0 , 100% 100% , 5% 100%)"
            }}
            className="text-xl p-3  w-[95%] text-center mx-auto"
          >
            {user.message}
          </motion.p>}



        </motion.div>

      </div>

    </>

  )

}

export default Card