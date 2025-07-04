"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export const SyncUserWithConvex = () => {
  const { user } = useUser();
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name:
            user.username ??
            `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.emailAddresses[0].emailAddress ?? "",
          profileImage: user?.imageUrl,
        });
      } catch (error) {
        console.error(`Error syncing user : ${error}`);
      }
    };

    syncUser();
  }, [user, updateUser]);

  return null;
};
