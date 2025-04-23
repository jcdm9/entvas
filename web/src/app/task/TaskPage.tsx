"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { Task } from "@/app/utils/types";
import { Button } from "@/app/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const token: string = searchParams.get("token") ?? "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [task, setTask] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    token: "",
    status: "pending",
    user: "",
  });
  const loadTask = async () => {
    const res = await api.fetchTaskById(token);
    if ("message" in res) {
      setError(res.message);
      setShowThankYou(true);
      setLoading(false);
      return;
    }
    setTask(res);
    setLoading(false);
  };
  useEffect(() => {
    loadTask();
  });

  const handleUpdateStatus = async (status: boolean) => {
    const res = await api.updateStatus({
      ...task,
      status: status ? "approved" : "rejected",
    });
    if ("message" in res) {
      alert("Unable to update task. Please try again later.");
    }
    setShowThankYou(true);
  };

  return showThankYou ? (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <Card className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <CardContent className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold block text-center">
            Thank you for your feedback.
          </h1>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div
      className={
        "flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0" +
        (loading ? " hidden" : "")
      }
    >
      <Card className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <CardContent className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {error !== "" ? (
            <>
              <label className="font-bold text-xl block text-center">
                Something went wrong..
              </label>
              <label className="block mt-5 text-center text-red-400">
                {error}
              </label>
            </>
          ) : (
            <>
              <label className="font-bold text-xl">{task.title}</label>
              <p className="mt-4">{task.description}</p>
              <div className="flex gap-2 justify-center items-center">
                <Button onClick={() => handleUpdateStatus(true)}>
                  Approve
                </Button>
                <Button
                  onClick={() => handleUpdateStatus(false)}
                  className="bg-red-500"
                >
                  Reject
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
