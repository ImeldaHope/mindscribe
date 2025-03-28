import { useMutation, useQuery } from "@tanstack/react-query";

import { Category } from "@/types";

export const useCategories = (userId: string) => {
  return useQuery<Category[]>({
    queryKey: ["user-categories", userId],
    queryFn: async () => {
      const response = await fetch(`/api/v1/users/${userId}/categories`);
      return response.json();
    },
  });
};

export const useNewCategory = (userId: string) => {
  return useMutation<Category>({
    mutationKey: ["new-category", userId],
    mutationFn: async (newCategory) => {
      const response = await fetch(`/api/v1/users/${userId}/categories`, {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}

export const useUpdateCategory = (userId: string, categoryId:string) => {
  return useMutation<Category>({
    mutationKey: ["update-category", userId, categoryId],
    mutationFn: async (updatedCategory) => {
      const response = await fetch(`/api/v1/users/${userId}/categories/${categoryId}`, {
        method: "PUT",
        body: JSON.stringify(updatedCategory),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}

export const useDeleteCategory = (userId: string, categoryId:string) => {
  return useMutation({
    mutationKey: ["delete-category", userId, categoryId],
    mutationFn: async () => {
      const response = await fetch(`/api/v1/users/${userId}/categories/${categoryId}`, {
        method: "DELETE",
      });
      return response.json();
    },
  });
}

