import tasks from './Tasks.json';

function printTasks() {
    return (
    <>
        <div className='task'>
            <h2>{tasks.length}</h2>
            {tasks.map(item => (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.desc}</p>
                    {item.subtask.length!==0 && printSubTasks(item.subtask)}
                </div>
            ))}
        </div>
    </>)
}

function printSubTasks(subtasks) {
    return(
        <>
        <div className='subTasks'>
            {subtasks.map(sub => (
                <div key={sub.id}>
                    <h1>{sub.name}</h1>
                </div>
            ))}
        </div>
        </>
    )
}
/* eslint-disable no-unused-vars */
export default function ShowTask() {
    
    var taskFinished = false;
    var taskSubs = 0;
    var taskDescription;
    return(
    <>
    <h1>ЗАГОЛОВОК</h1>
    {printTasks()}
    </>
    )
}