import axios from "axios";
import { ApiResponse, EmployeeRequestDTO, EmployeeResponseDTO } from "@/types/employee";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEmployees = async (): Promise<EmployeeResponseDTO[]> => {
  const response = await api.get<ApiResponse<EmployeeResponseDTO[]>>("/employees");
  return response.data.data;
};

export const createEmployee = async (
  payload: EmployeeRequestDTO
): Promise<EmployeeResponseDTO> => {
  const response = await api.post<ApiResponse<EmployeeResponseDTO>>("/employees", payload);
  return response.data.data;
};

export const updateEmployee = async (
  id: string,
  payload: EmployeeRequestDTO
): Promise<EmployeeResponseDTO> => {
  const response = await api.put<ApiResponse<EmployeeResponseDTO>>(`/employees/${id}`, payload);
  return response.data.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete<ApiResponse<null>>(`/employees/${id}`);
};

export const fetchEmployeeById = async (id: string): Promise<EmployeeResponseDTO> => {
  const response = await api.get<ApiResponse<EmployeeResponseDTO>>(`/employees/${id}`);
  return response.data.data;
};