import instance from "@/shared/api/instance";
import type { Board, ServiceResponse } from "../model/types";

export const getBoardsByWorkspaceIdApi = async (
  workspaceId: string
): Promise<Board[]> => {
  try {
    const response = await instance.get<ServiceResponse<Board[]>>(
      `/api/workspaces/${workspaceId}/boards`
    );
    return response.data.responseObject;
  } catch (error) {
    console.error("Lỗi khi lấy boards:", error);
    throw error;
  }
};
