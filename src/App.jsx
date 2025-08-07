import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [password, setpassword] = useState("")
  const [isnum, setnum] = useState(false)
  const [ischar, setchar] = useState(false)
  const passref = useRef(null)

  const genpass = useCallback(()=>{
    let pass=''
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (isnum) {
      str += "0123456789"
    }
    if (ischar) {
      str += "!@#$%^&*()_+[]{}|<>?/~`"
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setpassword(pass)
  },[length,ischar,isnum])

  useEffect(()=>{
    genpass()
  },[length,ischar,isnum])

  const copytoclip=()=>{
    window.navigator.clipboard.writeText(password)
    passref.current.select()
    alert("Password copied to clipboard")
  }

  return (
    <div className='w-full h-screen bg-gray-900 flex justify-center items-center'>
      <div className='flex justify-center  border-2 w-fit h-fit  rounded-3xl flex-col p-3 bg-gray-700'>
        <h1 className='m-4 font-bold text-amber-50 flex justify-center'>Password Generator</h1>
        <div>
          <input type="text" name="" id="" className='bg-yellow-50 rounded-2xl mr-1 p-1 pl-4 w-120' value={password} ref={passref} />
          <button className='bg-blue-400 rounded-xl p-1.5 hover:bg-blue-600 text-amber-50' onClick={copytoclip}>Copy</button>
        </div>
        <div className='flex flex-row p-3 m-3 gap-5'>
          <div>
            <input type="range" min={8} max={24} onChange={(e) => { setlength(e.target.value) }} value={length} />
            <label htmlFor="length" className='text-amber-50 ml-1.5'>Lenght:{length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={isnum} onChange={() => { setnum((isnum)=>!isnum) }} className='mr-2' />
            <label htmlFor="Numbers" className='text-amber-50'>Numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={ischar} onChange={() => { setchar((ischar)=>!ischar)}} className='mr-2' />
            <label htmlFor="Char" className='text-amber-50'>Char</label>
          </div>

        </div>
      </div>


    </div>
  )
}

export default App
