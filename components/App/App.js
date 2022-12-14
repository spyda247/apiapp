import React, {useState, useEffect, useRef} from "react";
import { getList, setItem } from "../../services/list";
import "./App.css";


export default function App() {
  const [alert, setAlert] = useState(false);
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState('');
  let mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    if(list.length && !alert) {
      return
    }
    getList().then(items => {
      if(mounted.current) {
        setList(items);
      }
    })
      return () => mounted.current = false;
    }, [alert, list]);
    
    useEffect(() => {
      if(alert) {
        setTimeout(() => {
          if(mounted.current) {
           setAlert(false);
          }
        }, 1000)
      }
    }, [alert])
    
   const handleSubmit = (event) => {
     event.preventDefault();
     setItem(itemInput).then(() => {
       if(mounted.current){
         setItemInput('');
         setAlert(true);
       }
     })
   }
  return (
    <div className="wrapper">
    <h1>My Grocery List</h1>
    <ul>
      {list.map(item => <li key={item.id}>{item.item}</li>)}
    </ul>
    {alert && <h2>Submit Successful</h2>}
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="New item" onChange={event => setItemInput(event.target.value)} value={itemInput} />
       </label>
       <button type="submit">Submit</button>
     </form>
    </div>
  )
}

