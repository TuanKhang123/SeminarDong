import { auth } from "@clerk/nextjs";

export const isTeacher = async (userId?: string | null) => {
  if (!userId) return false;

  const { sessionClaims } = auth();
  if (!sessionClaims?.metadata) return false;
  return sessionClaims.metadata.role === "teacher";
}