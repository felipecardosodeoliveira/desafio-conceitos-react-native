import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList, } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    function handleAddTask(newTaskTitle: string) {
        const id = new Date().getTime();
        const data = { id, title: newTaskTitle, done: false };
        setTasks((oldState) => [...oldState, data]);
    }

    function handleToggleTaskDone(id: number) {
        const updatedTask = tasks.map((task) => {
            if (id === task.id) {
                return {
                    ...task,
                    done: !task.done
                }
            } else {
                return task;
            }
        })
        setTasks(updatedTask);
    }

    function handleRemoveTask(id: number) {
        const newTaskList = tasks.filter((task) => task.id !== id);
        setTasks(newTaskList);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
})