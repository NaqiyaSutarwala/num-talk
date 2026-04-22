import api from "../../shared/api/axios";

export const getRootsApi = () =>
    api.get("/tree");

export const getTreeApi = (rootId: string) =>
    api.get(`/tree/${rootId}`);

export const createRootApi = (data: any) =>
    api.post("/tree", data);

export const addNodeApi = (data: any) =>
    api.post("/tree/node", data);