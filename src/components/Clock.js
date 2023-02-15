import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [day,setDay] = useState(new Date())
  
  const week = ["일","월", "화", "수","목","금","토"]
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    for(let i=0; i<week.length; i++){
      setDay(week[day.getDay(i)])
      console.log([week.getDay(i)])
    }
    
    }, 1000);
    return () => clearInterval(id);
  }, []);
  
  
  return (
    <>
      <span>{time.toLocaleDateString()+day}</span><br></br>
      <span>{time.toLocaleTimeString()}</span>
    </>
  );
}

export default Clock;
