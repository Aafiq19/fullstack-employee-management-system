"use client";

import { useState } from "react";
import { EmployeeRequestDTO } from "@/types/employee";

type Props = {
  initialValues?: EmployeeRequestDTO;
  onSubmit: (values: EmployeeRequestDTO) => Promise<void>;
  submitLabel: string;
};

const emptyValues: EmployeeRequestDTO = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
};

export default function EmployeeForm({ initialValues, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<EmployeeRequestDTO>(initialValues ?? emptyValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: keyof EmployeeRequestDTO, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(form);
    } catch {
      setError("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <input placeholder="First Name" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
      <input placeholder="Last Name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required />
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
      <input placeholder="Phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
      <input placeholder="Department" value={form.department} onChange={(e) => handleChange("department", e.target.value)} required />

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}