"use client";
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { UserLogin } from "./utils/types";
import api from "./utils/api";

export default function Home() {
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: "test@test.com",
    password: "new12345",
  });

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await api.login(loginForm);
    if (res?.message) {
      setError(res.message);
    }
  };
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Card className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <CardContent className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={loginForm.email}
                    onChange={handleUpdate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginForm.password}
                    onChange={handleUpdate}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="h-4">
                  {error !== "" ? (
                    <label className="block text-center text-xs text-red-400">
                      {error}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="w-full text-white bg-blue-900 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sign in
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
