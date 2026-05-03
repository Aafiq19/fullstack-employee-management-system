"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import EmployeeForm from "@/components/employee/EmployeeForm";
import { fetchEmployeeById, updateEmployee } from "@/lib/api/employeeApi";
import { EmployeeRequestDTO, EmployeeResponseDTO } from "@/types/employee";

/* ─── avatar helpers (same as list page) ─── */
const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100   text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100  text-amber-700",
  "bg-pink-100   text-pink-700",
  "bg-cyan-100   text-cyan-700",
  "bg-orange-100 text-orange-700",
  "bg-rose-100   text-rose-700",
];
const avatarColor = (name: string) =>
  AVATAR_COLORS[name.toUpperCase().charCodeAt(0) % AVATAR_COLORS.length];

/* ─── loading skeleton ─── */
function LoadingSkeleton() {
  return (
    <div className="max-w-2xl animate-pulse">
      {/* breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-24 bg-gray-100 rounded" />
        <div className="h-4 w-4 bg-gray-100 rounded" />
        <div className="h-4 w-28 bg-gray-100 rounded" />
      </div>

      {/* header skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex-shrink-0" />
        <div className="space-y-2">
          <div className="h-7 w-40 bg-gray-100 rounded" />
          <div className="h-4 w-52 bg-gray-100 rounded" />
        </div>
      </div>

      {/* form card skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <div className="h-4 w-44 bg-gray-100 rounded mb-6" />
        <div className="grid grid-cols-2 gap-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={i === 3 ? "col-span-2" : ""}>
              <div className="h-4 w-24 bg-gray-100 rounded mb-2" />
              <div className="h-10 bg-gray-100 rounded-xl" />
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
          <div className="h-10 w-24 bg-gray-100 rounded-xl" />
          <div className="h-10 w-32 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── error state ─── */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="max-w-md">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          Employee Not Found
        </h3>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <Link
          href="/employees"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Employees
        </Link>
      </div>
    </div>
  );
}

/* ─── main page ─── */
export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [employee, setEmployee] = useState<EmployeeResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data);
      } catch {
        setError("This employee could not be found. They may have been deleted.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (values: EmployeeRequestDTO) => {
    await updateEmployee(id, values);
    router.push("/employees");
  };

  if (loading) return <LoadingSkeleton />;
  if (error || !employee) return <ErrorState message={error} />;

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
        <span className="text-gray-700 font-medium">Edit Employee</span>
      </nav>

      {/* page header — shows the employee being edited */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 ${avatarColor(employee.firstName)}`}
        >
          {employee.firstName.charAt(0).toUpperCase()}
          {employee.lastName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {employee.firstName} {employee.lastName}
            </h1>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
              {employee.department}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-0.5 truncate">{employee.email}</p>
        </div>
      </div>

      {/* form card */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          {/* section label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Edit Information
            </h2>
          </div>

          <EmployeeForm
            initialValues={{
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
              phone: employee.phone,
              department: employee.department,
            }}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
            onCancel={() => router.push("/employees")}
          />
        </div>
      </div>
    </>
  );
}