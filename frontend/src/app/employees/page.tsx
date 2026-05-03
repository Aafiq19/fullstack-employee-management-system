"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteEmployee, fetchEmployees } from "@/lib/api/employeeApi";
import { EmployeeResponseDTO } from "@/types/employee";

/* ─── helpers ─── */
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

const initials = (f: string, l: string) =>
  `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* ─── delete modal ─── */
function DeleteModal({
  name,
  onConfirm,
  onCancel,
  loading,
}: {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-center font-semibold text-gray-900 text-lg">
          Delete Employee
        </h3>
        <p className="text-center text-gray-500 text-sm mt-1.5 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700">{name}</span>?{" "}
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── skeleton row ─── */
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-44 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </td>
      {[72, 56, 64].map((w, i) => (
        <td key={i} className="px-6 py-4">
          <div
            className="h-3.5 bg-gray-100 rounded animate-pulse"
            style={{ width: w }}
          />
        </td>
      ))}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <div className="h-7 w-14 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-7 w-14 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

/* ─── main page ─── */
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<EmployeeResponseDTO | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      setEmployees(await fetchEmployees());
    } catch {
      setError("Failed to load employees. Make sure your backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteEmployee(deleteTarget.id);
      setDeleteTarget(null);
      await load();
    } catch {
      setError("Failed to delete employee. Please try again.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      {/* delete modal */}
      {deleteTarget && (
        <DeleteModal
          name={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Employees
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {loading
              ? "Loading team members…"
              : `${employees.length} team member${employees.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <Link
          href="/employees/add"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Employee
        </Link>
      </div>

      {/* error banner */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl mb-6 text-sm">
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5"
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
          <span>{error}</span>
        </div>
      )}

      {/* table card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* table header bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-sm">All Employees</h2>
          {!loading && employees.length > 0 && (
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full">
              {employees.length}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* loading skeleton */}
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}

              {/* empty state */}
              {!loading && employees.length === 0 && !error && (
                <tr>
                  <td colSpan={5} className="px-6 py-20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-700">No employees yet</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Add your first team member to get started.
                        </p>
                      </div>
                      <Link
                        href="/employees/add"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add Employee
                      </Link>
                    </div>
                  </td>
                </tr>
              )}

              {/* data rows */}
              {!loading &&
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/40 transition-colors group"
                  >
                    {/* employee */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColor(emp.firstName)}`}
                        >
                          {initials(emp.firstName, emp.lastName)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {emp.firstName} {emp.lastName}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{emp.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* department */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium whitespace-nowrap">
                        {emp.department}
                      </span>
                    </td>

                    {/* phone */}
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {emp.phone}
                    </td>

                    {/* joined date */}
                    <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                      {formatDate(emp.createdAt)}
                    </td>

                    {/* actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/employees/${emp.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(emp)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}