import axios, { AxiosError } from "axios";
import { ApiResponse, EmployeeRequestDTO, EmployeeResponseDTO } from "@/types/employee";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* Extract the backend's human-readable error message from the ApiResponse wrapper */
api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<ApiResponse<unknown>>) => {
    const backendMessage = err.response?.data?.message;
    if (backendMessage) {
      err.message = backendMessage;
    }
    return Promise.reject(err);
  }
);

export const fetchEmployees = async (): Promise<EmployeeResponseDTO[]> => {
  const res = await api.get<ApiResponse<EmployeeResponseDTO[]>>("/employees");
  return res.data.data;
};

export const fetchEmployeeById = async (id: string): Promise<EmployeeResponseDTO> => {
  const res = await api.get<ApiResponse<EmployeeResponseDTO>>(`/employees/${id}`);
  return res.data.data;
};

export const createEmployee = async (
  payload: EmployeeRequestDTO
): Promise<EmployeeResponseDTO> => {
  const res = await api.post<ApiResponse<EmployeeResponseDTO>>("/employees", payload);
  return res.data.data;
};

export const updateEmployee = async (
  id: string,
  payload: EmployeeRequestDTO
): Promise<EmployeeResponseDTO> => {
  const res = await api.put<ApiResponse<EmployeeResponseDTO>>(`/employees/${id}`, payload);
  return res.data.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/employees/${id}`);
};