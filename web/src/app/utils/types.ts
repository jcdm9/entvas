export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  token?: string;
  user: string | null;
};

export type UserLogin = {
  email: string;
  password: string;
};
