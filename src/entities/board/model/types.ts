//src/entities/board/model/type.ts
export interface Board {
    id: string;
    name:string;
    description: string;
    workspaceId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceResponse<T> {
    success: boolean;
    message: string;
    responseObject: T;
    statusCode: number;
}