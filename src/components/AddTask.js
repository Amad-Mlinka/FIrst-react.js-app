import React,{ useState } from 'react'

export const AddTask = ({onAdd}) => {
    
    const[text,setText]=useState("")
    const[day,setDay]=useState("")
    const[reminder,setReminder]=useState(false)

    const onSubmit= (e) => {
        e.preventDefault();
        if(!text){
            alert("Please add task");
            return;
        }
        onAdd({text,day,reminder})
        setText("");
        setDay("");
        setReminder("");
    }


    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input type="text" placeholder="Add task" value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="">Day</label>
                <input type="text" placeholder="Add task" value={day} onChange={(e)=>setDay(e.target.value)}/>
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>
            <div className="form-control">
                <input type="submit" value="Save Task" className="btn btn-black"/>
            </div>
        </form>
    )
}
