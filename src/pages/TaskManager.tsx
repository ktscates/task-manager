import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
// import TaskCard from "../components/TaskCard";
import TaskNav from "../components/TaskNav";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskContext";
import TaskModal from "../components/TaskModal";

const TaskManager = () => {
  const { tasks, deleteTask } = useTask();
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSortToggle = () => {
    setIsAscending((prev) => !prev);
  };

  const handleEdit = (task: any) => {
    setSelectedTaskId(task.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    console.log("Deleted task with ID:", taskId);
  };

  // Filter using search term or status and sort tasks,
  const filteredTasks = tasks
    .filter((task) => {
      if (selectedFilter === "all") return true;
      return task.status === selectedFilter;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return isAscending
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  return (
    <div className="flex min-h-screen bg-gray bg-opacity-15 dark:bg-bgDark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onSearchChange={setSearchTerm} />
        <div className="p-6">
          <TaskNav
            onFilterChange={handleFilterChange}
            onSortToggle={handleSortToggle}
            isAscending={isAscending}
          />
          <div className="grid grid-cols-1 md:flex md:flex-wrap gap-6 mt-6">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          taskId={selectedTaskId}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTaskId(undefined);
          }}
          availableMembers={[]}
        />
      )}
    </div>
  );
};

export default TaskManager;
