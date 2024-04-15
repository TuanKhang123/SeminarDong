// import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId, sessionClaims } = auth();
  
  if (sessionClaims?.metadata === undefined || sessionClaims?.metadata!.role !== "teacher") {
    return redirect("/");
  }

  return <>{children}</>
}
 
export default TeacherLayout;