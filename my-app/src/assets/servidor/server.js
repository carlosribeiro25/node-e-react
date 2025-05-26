import express from 'express';
import cors from 'cors';
import { v4 as uuid4 } from 'uuid';

const app = express()
const PORT = 5000;

app.use(cors());

app.use(express.json());

let tasks = [
    { id: '1' , text:'Aprender React', completed: true},
    { id: '2' , text: 'Aprender Node.js', completed: false},
    { id: '3', text: 'Criar uma aplicação Fulstack ', completed:false },

];

app.get('/api/tasks', (req,res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({error: " O texto da tarefa é obrigatoria "});

    }
    const newTask = {
        id: uuidv4(),
        text,
        completed: false,
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.put('api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const taskIndex = task.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error:'Tarefa não encontrada'
        }) 
       }

       tasks[tasksIndex] = {
        ...tasks[taskIndex],
        completed 
       };

       res.json(tasks [taskIndex]);

})

app.listen(PORT, () => {
    console.log(`Servidor rodandp em http://localhost:${PORT}`)
})