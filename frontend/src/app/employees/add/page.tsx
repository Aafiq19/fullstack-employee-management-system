"use client";

import { useRouter } from "next/navigation";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { createEmployee } from "@/lib/api/employeeApi";
import { EmployeeRequestDTO } from "@/types/employee";

export default function AddEmployeePage() {
  const router = useRouter();

  const handleCreate = async (values: EmployeeRequestDTO) => {
    await createEmployee(values);
    router.push("/employees");
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={handleCreate} submitLabel="Create Employee" />
    </div>
  );
}