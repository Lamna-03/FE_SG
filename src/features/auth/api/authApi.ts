import instance from "@/shared/api/instance";
import { saveTokens } from "@/shared/lib/token/tokenStorage";

// --- 1. Định nghĩa các kiểu dữ liệu bạn cung cấp ---

// Đây là payload chứa token bên trong ServiceResponse
interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string | number;
  tokenType: string;
}

// Đây là kiểu dữ liệu ServiceResponse chung
// (Tôi giả định nó có cấu trúc chung như thế này)
interface ServiceResponse<T> {
  responseObject: T; // Dữ liệu chính mà bạn muốn
  message?: string; // Thông báo từ API
  success?: boolean; // Trạng thái thành công
  statusCode?: number;
}

// --- 2. Hiện thực hóa (implement) hàm loginApi ---
// Hàm này tuân thủ 100% cấu trúc bạn đã cung cấp

export const loginApi = async (email:string, password:string): Promise<ServiceResponse<TokenData>> => {
  try {
    // Chúng ta gọi API và báo cho axios biết rằng
    // data trả về sẽ có dạng ServiceResponse<TokenData>
    const response = await instance.post<ServiceResponse<TokenData>>("/auth/login", {
      email,
      password,
    });

    // 3. Lấy dữ liệu token từ bên trong response
    // response.data chính là ServiceResponse
    // response.data.data chính là payload TokenData
    const { accessToken, refreshToken } = response.data.responseObject;

    // 4. Lưu token vào localStorage (tách biệt logic)
    if (accessToken && refreshToken) {
      saveTokens(accessToken, refreshToken);
    }
    
    // 5. Trả về toàn bộ ServiceResponse cho component
    return response.data;

  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    // Ném lỗi ra để component 'login-form.tsx' có thể bắt và hiển thị
    throw error;
  }
};