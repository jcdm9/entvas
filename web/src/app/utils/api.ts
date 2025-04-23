import { Task, UserLogin } from "./types";
import { api } from "./axios";
import { AxiosError } from "axios";

class ServerApi {
  static login = async (user: UserLogin) => {
    try {
      const res = await api.post("/users/login", {
        username: user.email,
        password: user.password,
      });
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);

      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };

  static fetchTasks = async (): Promise<Task[]> => {
    try {
      const res = await api.get("/tasks");

      return res.data;
    } catch {
      return [];
    }
  };

  static fetchTaskById = async (
    id: string
  ): Promise<Task | { message: string }> => {
    try {
      const res = await api.get(`/tasks/${id}`);

      return res.data;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };

  static addTask = async (task: Task): Promise<Task | { message: string }> => {
    try {
      const res = await api.post("/tasks", {
        title: task.title,
        description: task.description,
        status: task.status,
        email: task.user || null,
      });

      return res.data;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };

  static deleteTask = async (id: string) => {
    try {
      const res = await api.delete(`/tasks/${id}`);

      return res;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };

  static updateTask = async (task: Task) => {
    try {
      const res = await api.patch(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        token: task.token,
        user: task.user,
      });

      return res;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };

  static updateStatus = async (task: Task) => {
    try {
      const res = await api.post(`/tasks/${task.token}`, {
        status: task.status,
      });

      return res;
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      return { message: err.response?.data?.message || "Something went wrong" };
    }
  };
}

export default ServerApi;
