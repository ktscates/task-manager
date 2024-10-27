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
  ); // Change to undefined
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isAscending, setIsAscending] = useState(true); // State to manage sort order
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSortToggle = () => {
    setIsAscending((prev) => !prev); // Toggle the sort order
  };

  const handleEdit = (task: any) => {
    setSelectedTaskId(task.id); // Set the ID of the task to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    console.log("Deleted task with ID:", taskId);
  };

  // Filter and sort tasks based on filter, search term, and sort order
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
    <div className="flex h-screen bg-gray bg-opacity-15 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header onSearchChange={setSearchTerm} />
        <div className="p-6">
          <TaskNav
            onFilterChange={handleFilterChange}
            onSortToggle={handleSortToggle}
            isAscending={isAscending}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-wrap gap-6 mt-6">
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
      {/* Render the TaskModal when it is open */}
      {isModalOpen && (
        <TaskModal
          taskId={selectedTaskId}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTaskId(undefined); // Reset the selected task ID
          }}
          availableMembers={[]} // Provide available members here
        />
      )}
    </div>
  );
};

export default TaskManager;
