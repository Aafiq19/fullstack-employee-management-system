export interface EmployeeRequestDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
  }
  
  export interface EmployeeResponseDTO {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
  }