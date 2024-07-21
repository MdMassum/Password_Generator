import { useState, useEffect, useRef } from 'react'
// useRef is used for reference 
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [size, setSize] = useState(15);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const onChange = (e) =>{
    setText(e.target.value)
  }
  const onChangeScroll=(e) =>{
    setSize(e.target.value);
    // textGenerator();  // we have used useEffect so not needed this
  }
  const textGenerator = () =>{
    let str = "AaBbCcDdEeFfGgHhIijJKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    console.log(numAllowed);
    if(numAllowed) str += "1234567890";
    if(charAllowed) str += "!@#$%^&*()-_=+{}[]?"

    let txt = "";
    for(let i=0; i<size; i++){
      let r = (Math.random()*(str.length-1)).toFixed(0);
      txt += str[r];
    }
    setText(txt);
  }
  const numFunc=()=>{
    setNumAllowed(!numAllowed);
    // textGenerator();   // we have used useEffect so not needed this
  }
  const charFunc = () =>{
    setCharAllowed(!charAllowed);
    // textGenerator();   // we have used useEffect so not needed this
  }

  // copy to clipboard 

  const textRef = useRef(null);
  const handleCopy = () =>{
    // can do this way -->
    // try {
    //    navigator.clipboard.writeText(text);
    //    alert('Text copied successfully!')

    // } catch (e) {
    //   alert('Failed to copy!')
    // }

    // or if we want to add some functionality like select the text copied.. etc then use useRef hook

         textRef.current?.select();  // text gets selected
         navigator.clipboard.writeText(text);

  }
  useEffect(() => {
    textGenerator();
  }, [size,charAllowed,numAllowed]) // here in this array we use states i.e if any states changes then useEffect will run
  
  return (
    <>
      <div className="container p-3 w-60vh h-30vh flex justify-center item-center flex-col bg-gray-300 rounded-md">
        <h2 className='p-1 text-black'><b>Password Generator</b></h2>
        <div className='flex '>
          <textarea ref={textRef} onChange={onChange} value = {text} name="" id="" cols="60" rows="1" readOnly className=' p-3 text-blue-700 bg-white rounded-l-3xl outline-none'></textarea>
          <button onClick={handleCopy} className='bg-blue-700 h-12 rounded-r-3xl rounded-l-none'>Copy</button>
        </div>
        <div>
        <div className="flex items-center">

            <input onChange={onChangeScroll} id="minmax-range" min={5} max={25} type="range" value={size} className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
            <label for="minmax-range" className=" p-1 block mb-2  font-medium text-blue-600 ">Length({size})</label>

            <div className="flex items-center p-2">
              <input onClick={numFunc} id="link-checkbox" type="checkbox" value={numAllowed} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-blue-600 ">Numbers</label>
           </div>
          
            <div className="flex items-center ">
              <input onClick={charFunc} id="link-checkbox" type="checkbox" value={charAllowed} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-blue-600">Characters</label>
          </div>

        </div>
        </div>
        
      </div>
    </>
  )
}

export default App
