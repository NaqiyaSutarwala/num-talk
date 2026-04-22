import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getTreeApi, addNodeApi, createRootApi, getRootsApi } from "./api";
import { toastApiError } from "../../shared/ui/toast";

export type RootItem = {
    _id: string;
    value: number;
};

export type TreeNodeItem = {
    _id: string;
    value: number;
    operation?: string;
    operand?: number;
    children?: TreeNodeItem[];
};

export const useRoots = () =>
    useQuery<RootItem[]>({
        queryKey: ["roots"],
        queryFn: async () => {
            try {
                const res = await getRootsApi();
                return res.data;
            } catch (error) {
                toastApiError(error);
                throw error;
            }
        },
    });

export const useTree = (rootId: string) =>
    useQuery<TreeNodeItem[]>({
        queryKey: ["tree", rootId],
        queryFn: async () => {
            try {
                const res = await getTreeApi(rootId);
                return res.data;
            } catch (error) {
                toastApiError(error);
                throw error;
            }
        },
        enabled: !!rootId,
    });

export const useAddNode = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: addNodeApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["tree"] });
            qc.invalidateQueries({ queryKey: ["roots"] });
            toast.success("Reply added");
        },
        onError: toastApiError,
    });
};

export const useCreateRoot = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: createRootApi,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["roots"] });
            toast.success("Discussion created");
        },
        onError: toastApiError,
    });
};