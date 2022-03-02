import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList, } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    function handleAddTask(newTaskTitle: string) {
        const titleAllReadyExists = tasks.find(task => task.title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase());
        if (titleAllReadyExists) {
            Alert.alert(
                "Task já cadastrada",
                "Você não pode cadastrar uma task com o mesmo nome",
                [
                    {
                        text: "OK",
                        onPress: () => undefined
                    }
                ]
            );
            return
        }

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
        Alert.alert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            [
                {
                    text: "Não",
                    onPress: () => undefined,
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        const newTaskList = tasks.filter((task) => task.id !== id);
                        setTasks(newTaskList);
                    }
                }
            ]
        );
    }

    function handleEditTask(taskId: number, taskNewTitle: string) {
        const updatedTask = tasks.map((task) => {
            if (taskId === task.id) {
                return {
                    ...task,
                    title: taskNewTitle
                }
            } else {
                return task;
            }
        })
        setTasks(updatedTask);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                editTask={handleEditTask}
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