import { useMutation, useQuery } from "@tanstack/react-query";

import { Entry } from "@/types";

export const useUserEntries = (userId: string) => {
  return useQuery<Entry[]>({
    queryKey: ["user-entries", userId],
    queryFn: async () => {
      const response = await fetch(`/api/v1/users/${userId}/entries`);    
      return response.json();      
    },
  });
};

export const useNewEntry = (userId: string) => {
  return useMutation<Entry>({
    mutationKey: ["new-entry", userId],
    mutationFn: async (newEntry) => {
      const response = await fetch(`/api/v1/users/${userId}/entries`, {
        method: "POST",
        body: JSON.stringify(newEntry),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}

export const useUpdateEntry = (userId: string, entryId:string) => {
  return useMutation<Entry>({
    mutationKey: ["update-entry", userId, entryId],
    mutationFn: async (updatedEntry) => {
      const response = await fetch(`/api/v1/users/${userId}/entries/${entryId}`, {
        method: "PUT",
        body: JSON.stringify(updatedEntry),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}

export const useDeleteEntry = (userId: string, entryId:string) => {
  return useMutation({
    mutationKey: ["delete-entry", userId, entryId],
    mutationFn: async () => {
      const response = await fetch(`/api/v1/users/${userId}/entries/${entryId}`, {
        method: "DELETE",
      });
      return response.json();
    },
  });
}