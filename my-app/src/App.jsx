import { useState, useEffect } from "react";
import './App.css';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

 export default function App() {
    const[tasks, setTasks] = useState ([])

    const [status, setStatus] = useState( "Carregando...")

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/tasks")
                if (!response.ok) {
                    throw new Error("Erro ao buscar tarefas")
                }

                const data = await response.json()

                setTasks(data)
                setstatus("")
            }catch (error) {
                console.error("Error: ", error )
                setStatus("Error ao conectar com o servidor. Verifique se o backend está rodando")
                
            }
        }
        fetchTasks()

    }, [])

    const onAddTask = async (taskText) => {
        try {
            const response = await fetch("http;//localhost:5000/api/tasks", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({text: taskText}),

            })
            if (response.ok) {
                throw new Error("Error ao adicionar tarefa.")

            }

            const newTask = await response.json()
            setTasks([...tasks, newTask])

        }catch (error){
            console.error("Erro:", error)
            setStatus("Erro adicionar tarefa.")
        }
    }

    const ToggleTask = async (id) => {
        try{
            const taskToggle = tasks.find((task) => task.id === id)

            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    completed: !taskToToggle.completed
                }),
            })

            if (!response.ok) {
                throw new Error("Error ao atualizar tarefa.")
            }


             setTasks(tasks.map((task) => (task.id === id ? {...task, completed:
                ! task.completed} : task )))

            } catch (error) {
                console.error("Error:", error)
                setStatus("Erro ao atualizar tarefa.")
            }
        }

        return (

            <div className="app-container">

                <h1>Lista de tarefas </h1>
                <p className="subtitle">React + Node.js</p>
                <TaskForm onAddTask={addTask}  />

                {status && <p className="status-message">{status}</p>}

                <TaskList tasks={tasks} 
                onToggleTask={toggleTask}/>


            </div>
        )


    }



