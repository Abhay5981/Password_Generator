import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

//useRef hook
const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char);
    }
    setPassword(pass);


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const handleClick = () =>{
      passwordGenerator();
  }

  // useEffect(() => {
  //   passwordGenerator()
  // }, [length, numberAllowed, charAllowed, passwordGenerator])

  return ( 
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-700 mt-20'>
     <h1 className='text-4xl text-center text-white'>Password generator</h1> 
     <div className='flex  shadow overflow-hidden rounde-lg mb-4 mt-4 rounded-lg'>
      <input
       type="text" 
       value={password}
       className='outline-none w-full py-1 px-3 '
       placeholder='Password'
       readOnly
       ref={passwordRef}
       />
       <button  
       onClick={copyPasswordToClipboard}
       className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '> 
       copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={20}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(Number(e.target.value));}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    <div className='flex items-center justify-center mt-3'>
    <button type="button" className='bg-blue-800 p-2 rounded-2xl'
    onClick={handleClick}
    >Generate Password</button>
    </div>
     </div>
     
    </>
  )
}

export default App
