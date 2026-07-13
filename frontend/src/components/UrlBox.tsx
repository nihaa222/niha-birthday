
import { FaRegCopy } from "react-icons/fa6";


type UrlBoxProps = {
  uniqueCode: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  close: boolean
};
function UrlBox({ uniqueCode, setClose, close}: UrlBoxProps) {
    const frontendPort = import.meta.env.VITE_FRONTEND_PORT
    console.log(import.meta.env)
    console.log(frontendPort)
    const url = `${frontendPort}/${uniqueCode}`
    console.log(url)

    const handleCopy = async () => {
        try{
            await navigator.clipboard.writeText(url)
            alert("Link copied!")
        }catch (err) {
            console.log("Copy failed", err)
        }
    }
    return (
        <>
           {!close && (
            <>
            <div className=' rounded-tl-xl rounded-tr-xl h-32 w-80 p-4 shadow-xl bg-white '>
                <p className='text-xl mb-6'>Send this link</p>
                <div className='flex gap-4'>

                    <button><FaRegCopy size={22} onClick={handleCopy} /></button>
                    <p>{url}</p>
                </div>
            </div>
            <div className=' rounded-bl-xl  rounded-br-xl w-80 bg-blue-400 p-3 text-white bold text-center'>
                <button onClick={() => setClose(true)}>Close</button>
            </div>
            </>
           )}
           
        </>
    )
}

export default UrlBox
