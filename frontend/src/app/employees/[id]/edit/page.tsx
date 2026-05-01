"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { fetchEmployeeById, updateEmployee } from "@/lib/api/employeeApi";
import { EmployeeRequestDTO } from "@/types/employee";

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<EmployeeRequestDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const emp = await fetchEmployeeById(id);
      setInitialValues({
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        phone: emp.phone,
        department: emp.department,
      });
      setLoading(false);
    };
    load();
  }, [id]);

  const handleUpdate = async (values: EmployeeRequestDTO) => {
    await updateEmployee(id, values);
    router.push("/employees");
  };

  if (loading || !initialValues) return <div>Loading employee...</div>;

  return (
    <div>
      <h1>Edit Employee</h1>
      <EmployeeForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitLabel="Update Employee"
      />
    </div>
  );
}