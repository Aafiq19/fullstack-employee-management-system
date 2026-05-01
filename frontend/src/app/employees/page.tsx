"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteEmployee, fetchEmployees } from "@/lib/api/employeeApi";
import { EmployeeResponseDTO } from "@/types/employee";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      await loadEmployees();
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/employees/add">Add Employee</Link>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id}>
              {emp.firstName} {emp.lastName} - {emp.email} - {emp.department}{" "}
              <Link href={`/employees/${emp.id}/edit`}>Edit</Link>{" "}
              <button onClick={() => handleDelete(emp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}