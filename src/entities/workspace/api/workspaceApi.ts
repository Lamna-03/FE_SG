import instance from "@/shared/api/instance";
import type { Workspace } from "../model/types";
import type { ServiceResponse } from "@/entities/board/model/types";

export const getAllWorkspacesApi = async (): Promise<Workspace[]> => {
    try {
        const response = await instance.get<ServiceResponse<Workspace[]>>("api/workspaces");
        return response.data.responseObject;
    } catch (error) {
        console.error("Lỗi khi lấy workspaces:", error);
        throw error;
    }
}