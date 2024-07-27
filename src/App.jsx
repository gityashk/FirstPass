import { useState, useEffect, useRef } from "react";
import rotate_right from "./assets/rotate_right.svg"
import copy from "./assets/copy.svg"

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeDigit, setIncludeDigit] = useState(true);
  const [includeSpecialChar, setIncludeSpecialChar] = useState(true);

  const passwordRef = useRef(null);

  function generatePassword() {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeDigit) charset += "0123456789";
    if (includeSpecialChar) charset += "`~!@#$%^&*()-_=+[]{}\\|;:'\",./<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  }

  function copyPasswordToClipboard() {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  useEffect(() => {
    generatePassword();
  }, [length, includeDigit, includeSpecialChar])

  return (
    <>
      <div className="flex justify-center m-8">
        <div className="w-[90vw] sm:w-[800px]">

          <div className="border-2 border-gray-400 border-b-8 border-b-green-600 rounded-t-xl px-6 py-4 flex justify-between gap-6 bg-slate-50">
            <input ref={passwordRef} className="w-full text-3xl bg-inherit tracking-widest font-mono focus:outline-none" type="text" value={password} readOnly />
            <div className="flex gap-4">
              <button onClick={generatePassword}><img src={rotate_right} /></button>
              <button onClick={copyPasswordToClipboard}><img src={copy} /></button>
            </div>
          </div>

          <div className="border-2 border-gray-400 border-t-0 rounded-b-xl">
            <p className="mx-2 px-4 py-4 text-2xl border-b border-b-gray-400">Customize your password</p>
            <div>
              <div className="mx-2 p-4 pb-0 flex gap-8 flex-wrap">
                <div className="text-sm">Password Length</div>
                <div className="flex gap-8">
                  <input type="range" min={12} max={32} step={2} value={length} onChange={(e) => setLength(e.target.value)} />
                  <input className="w-12 border rounded-md pl-2" type="number" min={12} max={32} step={2} value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
                </div>
              </div>
              <div className="m-2 p-4 flex gap-8 flex-wrap">
                <div className="flex gap-2">
                  <input type="checkbox" checked={includeDigit} onChange={() => setIncludeDigit((prev) => !prev)} />
                  <label className="text-sm">Numbers</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" checked={includeSpecialChar} onChange={() => setIncludeSpecialChar((prev) => !prev)} />
                  <label className="text-sm">Special Characters</label>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
