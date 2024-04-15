"use client";

import { UserButton, currentUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TermsOfUsemModal } from "./modals/terms-of-use-modal";


const isTeacherFetcher = () => axios.get("/api/teacher").then((resp) => {
  return resp.status === 200 && resp.data["isTeacher"];
});

export const NavbarRoutes = () => {
  const [isTeacher, setIsTeacher] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    isTeacherFetcher()
      .then((data) => {
        setIsTeacher(data);
        setLoading(false);
      });

  }, []);

  const onConfirm = () => {
    axios.post("/api/teacher").then((resp) => {
      if (resp.status !== 200) return false;
      return resp["data"]["status"] === "Successful!";
    }).then(result => {
      if (result) {
        setIsTeacher(true);
        toast.success("You are a teacher now");
      } else {
        toast.error("Error occured!");
      }
    });
  }

  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {
          isTeacherPage || isCoursePage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : !isLoading ? (
            isTeacher ?
              <Link href="/teacher/courses">
                <Button size="sm" variant="ghost">
                  Teacher mode
                </Button>
              </Link> :
              <TermsOfUsemModal onConfirm={onConfirm}>
                <Button size="sm" variant="ghost" disabled={isLoading} >
                  Become an instructor
                </Button>
              </TermsOfUsemModal>
          ) : null
        }
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}