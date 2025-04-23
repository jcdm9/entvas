"use client";
import { useEffect, useState } from "react";
import { Button } from "./../components/ui/button";
import { Card, CardContent } from "./../components/ui/card";
import { Input } from "./../components/ui/input";
import { Modal } from "./../components/modal";
import { StatusDropdown } from "../components/ui/status";
import api from "../utils/api";
import { Task } from "../utils/types";

export default function TaskDashboard() {
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    status: "pending",
    token: "",
    user: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadTasks = async () => {
    const data: Task[] = await api.fetchTasks();
    const cleanedData: Task[] = data.map((task: Task) => ({
      ...task,
      user: task.user ?? "",
    }));

    setTasks(cleanedData);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (taskForm._id !== "") {
      updateTask();
    } else {
      if (!taskForm.title) {
        setError("Title is required.");
        return;
      }
      const res: { message: string } | Task = await api.addTask(taskForm);
      if ("message" in res) {
        alert("Unable to add task. Please try again later.");
      }
      await loadTasks();

      setTaskForm({
        _id: "",
        title: "",
        description: "",
        status: "pending",
        user: "",
        token: "",
      });
      setIsModalOpen(false);
    }
  };

  const deleteTask = async (id: string) => {
    const res = await api.deleteTask(id);
    if ("message" in res) {
      alert("Unable to delete task. Please try again later.");
    }
    setTasks(tasks.filter((task: Task) => task._id !== id));
  };

  const editTask = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setError("");
    const current = tasks.filter((task: Task) => task._id === id);
    setTaskForm(current[0]);
    setIsModalOpen(true);
  };

  const updateTask = async () => {
    const res = await api.updateTask(taskForm);
    if ("message" in res) {
      alert("Unable to update task. Please try again later.");
      return;
    }
    await loadTasks();
    setTaskForm({
      _id: "",
      title: "",
      description: "",
      status: "pending",
      token: "",
      user: "",
    });
    setIsModalOpen(false);
  };

  const handleUpdate = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateModal = () => {
    setIsModalOpen(true);
    setTaskForm({
      _id: "",
      title: "",
      description: "",
      status: "pending",
      token: "",
      user: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <form className="space-y-4">
          <Input
            placeholder="Title"
            name="title"
            required
            value={taskForm.title}
            onChange={handleUpdate}
          />
          <Input
            name="description"
            placeholder="Description"
            value={taskForm.description}
            onChange={handleUpdate}
          />
          <StatusDropdown
            name="status"
            value={taskForm.status}
            onChange={handleUpdate}
          />
          <div className="w-full">
            <small className="block text-xs text-gray-500 mb-1">
              Add an email address to send an approval request email
            </small>
            <Input
              name="user"
              placeholder="Assign to email (optional)"
              value={taskForm.user || ""}
              onChange={handleUpdate}
            />
          </div>
          <div className="h-5">
            {error !== "" ? (
              <label className="block text-center text-xs text-red-400">
                {error}
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end">
            <Button onClick={(e) => addTask(e)}>Save</Button>
          </div>
        </form>
      </Modal>
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Tasks List</h1>
        <Button onClick={handleCreateModal}>New Task</Button>
        {tasks.length === 0 ? (
          <Card className="p-4">
            <CardContent className="text-gray-400 text-sm text-center">
              No task available.
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="flex justify-between items-center p-4"
          >
            <CardContent className="flex-grow">
              <div className="flex items-center justify-between font-bold text-lg">
                <span className="text-gray-700 text-sm">{task.title}</span>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold text-gray-600 ring-1 ring-inset ${
                    task.status === "pending"
                      ? "bg-gray-50 ring-gray-500/10"
                      : task.status === "approved"
                      ? "bg-green-50 ring-green-500/10 text-green-600"
                      : "bg-red-50 ring-red-500/10 text-red-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="text-xs text-gray-400 mt-2">
                {task.description}
              </div>
              {task.user == null ? (
                ""
              ) : (
                <div className="text-xs text-gray-400 mt-2">{task.user}</div>
              )}

              <div className="flex gap-2 mt-4">
                <Button onClick={(e) => editTask(e, task._id)}>Edit</Button>
                <Button
                  className="bg-red-600"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
