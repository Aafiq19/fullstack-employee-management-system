"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <>
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link
          href="/employees"
          className="text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Employees
        </Link>
        <svg
          className="w-4 h-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-700 font-medium">Add Employee</span>
      </nav>

      {/* page header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Add Employee
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Fill in the details below to add a new team member.
          </p>
        </div>
      </div>

      {/* form card */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          {/* section label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Employee Information
            </h2>
          </div>

          <EmployeeForm
            onSubmit={handleCreate}
            submitLabel="Create Employee"
            onCancel={() => router.push("/employees")}
          />
        </div>
      </div>
    </>
  );
}