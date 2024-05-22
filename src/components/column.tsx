"use client"

import Task from './task';
import useTaskStore, { Status } from '@/lib/store';
import React from "react";

export default function Column({
  title,
  status
}: {
  title: string
  status: Status
}) {
  const taskStore = useTaskStore();
  const filteredTasks = React.useMemo(
    () => taskStore.tasks.filter(task => task.status === status),
    [taskStore.tasks, status]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!taskStore.draggedTask) return;
    taskStore.updateTask(taskStore.draggedTask, status);
    taskStore.dragTask(null);
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div className='mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4' onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  )
}