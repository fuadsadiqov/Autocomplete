import { useEffect, useRef, useState } from 'react';
import './App.css';

const data = [
  {
    id: 1,
    title: "test 1"
  },
  {
    id: 2,
    title: "Test 1"
  },
  {
    id: 3,
    title: "deneme 1"
  },
  {
    id: 4,
    title: "Deneme 2"
  },
]

function App() {

  const [search, setSearch] = useState('')
  const [result, setResult] = useState(false)
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/, '').length > 0

  useEffect(() => {
     if(isTyping){
      const filteredResult = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      setResult(filteredResult.length > 0 ? filteredResult : false)
     }
     else{
      setResult(false)
     }

     const getData = setTimeout(() => {
        fetch(`http://localhost/frontendaily.php?query=${search}`)
     }, 500);
     return () => {
      clearTimeout(getData)
     }

  }, [search])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e) =>{
    if(searchRef.current && !searchRef.current.contains(e.target)){
      setSearch('')
    }
  }
  

  return (
    <>
      <div className='search' ref={searchRef}>
        <input type="text" className={isTyping ? 'typing' : null} placeholder='Axtar' value={search} onChange={(e) => setSearch(e.target.value)}/>
      {isTyping && (
        <div className='search-result'>
          {result && result.map(item => (
            <div key={item.id} className='search-result-item'>{item.title}</div>
          ))}
        {!result && (
              <div className='result-not-found'>"{search}" ilə bağlı nəticə tapılmadı</div>
        )}
        </div>
      )}
      </div>
    </>
);
}

export default App;