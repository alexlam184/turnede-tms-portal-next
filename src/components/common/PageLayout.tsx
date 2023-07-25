"use client";
import React, { useEffect, useState } from "react";
import Header from "@src/components/common/Header";
import Sidebar from "@src/components/common//Sidebar";
import { ReactNode } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type Props = {
  children?: ReactNode;
  title?: ReactNode;
};

const handleRedirect = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  router.push("/");
  return (<></>) as ReactNode;
};

export default function PageLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SignedIn>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* <!-- ===== Page Wrapper Start ===== --> */}
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
          {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
      </SignedIn>
      <SignedOut>
        {/* 
              Route matches, but no user is signed in. 
              Redirect to the sign in page.
            */}
        <RedirectToSignIn />
        {/* {handleRedirect()} */}
      </SignedOut>
    </>
  );
}