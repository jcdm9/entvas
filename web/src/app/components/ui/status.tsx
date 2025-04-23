"use client";

import React from "react";

interface StatusDropdownProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const options = ["pending", "approved", "rejected"];

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full shadow-sm border-gray-300 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {options.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
