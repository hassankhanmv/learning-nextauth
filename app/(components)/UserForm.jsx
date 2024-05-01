"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 md:w-1/3 sm:w-[90%] w-full mx-auto border-gray-300 rounded-xl py-6 px-x"
      >
        <h1>Create New User</h1>
        <div className="inputContainer">
          <label className="mb-1 pb-0">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.name}
            placeholder="John Snow"
            className="inputs"
          />
        </div>
        <div className="inputContainer">
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.email}
            className="inputs"
            placeholder="example@mail.com"
          />
        </div>
        <div className="inputContainer">
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="•••••••"
            onChange={handleChange}
            required={true}
            value={formData.password}
            className="inputs"
          />
        </div>
        <input
          type="submit"
          value="Create User"
          className="bg-black hover:bg-black/90 cursor-pointer transition-all text-white text-sm rounded-lg py-3"
        />
      </form>
      {
        errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )
      }
    </>
  );
};

export default UserForm;