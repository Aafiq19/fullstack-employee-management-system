"use client";

import { useState } from "react";
import { EmployeeRequestDTO } from "@/types/employee";

/* ─── types ─── */
type FieldErrors = Partial<Record<keyof EmployeeRequestDTO, string>>;

type Props = {
  initialValues?: Partial<EmployeeRequestDTO>;
  onSubmit: (values: EmployeeRequestDTO) => Promise<void>;
  submitLabel: string;
  onCancel: () => void;
};

/* ─── constants ─── */
const EMPTY: EmployeeRequestDTO = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
};

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Operations",
  "Legal",
  "Customer Support",
];

/* ─── validation ─── */
function validate(form: EmployeeRequestDTO): FieldErrors {
  const e: FieldErrors = {};
  if (!form.firstName.trim()) e.firstName = "First name is required.";
  if (!form.lastName.trim()) e.lastName = "Last name is required.";
  if (!form.email.trim()) {
    e.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    e.email = "Enter a valid email address.";
  }
  if (!form.phone.trim()) e.phone = "Phone number is required.";
  if (!form.department.trim()) e.department = "Please select a department.";
  return e;
}

/* ─── input field sub-component ─── */
function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof EmployeeRequestDTO;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (key: keyof EmployeeRequestDTO, val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`
          w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900
          placeholder-gray-400 outline-none transition-all
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-3 focus:ring-red-100"
              : "border-gray-200 bg-white focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 hover:border-gray-300"
          }
        `}
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-0.5">
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
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
      {msg}
    </p>
  );
}

/* ─── main component ─── */
export default function EmployeeForm({
  initialValues,
  onSubmit,
  submitLabel,
  onCancel,
}: Props) {
  const [form, setForm] = useState<EmployeeRequestDTO>({
    ...EMPTY,
    ...initialValues,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (key: keyof EmployeeRequestDTO, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    // clear field error on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      await onSubmit(form);
    } catch (err: unknown) {
      // try to extract backend message
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Something went wrong. Please try again.";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* first name */}
        <Field
          label="First Name"
          name="firstName"
          placeholder="e.g. Aafiq"
          value={form.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />

        {/* last name */}
        <Field
          label="Last Name"
          name="lastName"
          placeholder="e.g. Minarath"
          value={form.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />

        {/* email — full width */}
        <div className="sm:col-span-2">
          <Field
            label="Email Address"
            name="email"
            type="email"
            placeholder="e.g. aafiq@company.com"
            value={form.email}
            error={errors.email}
            onChange={handleChange}
          />
        </div>

        {/* phone */}
        <Field
          label="Phone Number"
          name="phone"
          placeholder="e.g. +94 77 123 4567"
          value={form.phone}
          error={errors.phone}
          onChange={handleChange}
        />

        {/* department dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Department</label>
          <div className="relative">
            <select
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className={`
                w-full px-4 py-2.5 pr-10 rounded-xl border text-sm outline-none
                transition-all appearance-none bg-white cursor-pointer
                ${
                  errors.department
                    ? "border-red-300 bg-red-50 text-gray-900 focus:border-red-400 focus:ring-3 focus:ring-red-100"
                    : form.department
                    ? "border-gray-200 text-gray-900 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 hover:border-gray-300"
                    : "border-gray-200 text-gray-400 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 hover:border-gray-300"
                }
              `}
            >
              <option value="" disabled>
                Select a department
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} className="text-gray-900">
                  {d}
                </option>
              ))}
            </select>
            {/* chevron icon */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.department && <FieldError msg={errors.department} />}
        </div>
      </div>

      {/* server / API error */}
      {submitError && (
        <div className="mt-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm">
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
          <span>{submitError}</span>
        </div>
      )}

      {/* action buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm shadow-indigo-200"
        >
          {loading && (
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
          )}
          {loading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}