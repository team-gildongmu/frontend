import { useMutation } from "@tanstack/react-query";
import { createTravelLog } from "@/api/travel";

export function useCreateLog(){
    return useMutation({
        mutationFn: (payload: any) => createTravelLog(payload),
    });
}[]