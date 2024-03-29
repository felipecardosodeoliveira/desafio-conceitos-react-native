import React from 'react';

import {
    FlatList,
} from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { Task, TaskItem } from './TaskItem';

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TasksList({ tasks, ...rest }: TasksListProps) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <ItemWrapper index={index}>
                        <TaskItem
                            task={item}
                            {...rest}
                        />
                    </ItemWrapper>
                )
            }}
            style={{
                marginTop: 32
            }}
        />
    )
}
