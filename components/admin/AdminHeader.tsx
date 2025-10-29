"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { DropdownMenu } from "../ui/DropdownMenu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title?: string;
  breadcrumb?: {
    label: string;
    href?: string;
    active?: boolean;
  }[];
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Job List",
  breadcrumb = [],
}) => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    const r = Cookies.get("role"); // ambil role dari cookie
    setRole(r || null);
  }, []);

  const handleDropdownChange = async (value: string) => {
    if (value === "logout") {
      console.log("User logged out");
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    }
    setSelectedOption(value);
  };

  const avatarOptions = [{ label: "Logout", value: "logout" }];

  const avatarSrc =
    role === "admin" ? "/images/user1.png" : "/images/user2.png";

  const hasBreadcrumb = breadcrumb.length > 0;

  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-neutral-10 border-b border-neutral-30">
      <div className="flex items-center justify-between px-5 py-3 h-16">
        {hasBreadcrumb ? (
          <div className="flex items-center gap-2">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.active ? (
                  <Button
                    size="sm"
                    variant="disabled"
                    disabled
                    className="font-bold text-text-m"
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Link href={item.href || "#"}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="font-bold text-text-m"
                    >
                      {item.label}
                    </Button>
                  </Link>
                )}

                {index < breadcrumb.length - 1 && (
                  <ChevronRightIcon className="w-4 h-4 text-neutral-100 stroke-[2px]" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-text-xl font-bold text-[#1E1F21]">{title}</h1>
        )}

        {/* Avatar + DropdownMenu */}
        <DropdownMenu
          options={avatarOptions}
          value={selectedOption}
          onChange={handleDropdownChange}
          trigger={
            <Avatar className="w-7 h-7 border border-[#e0e0e0]">
              <AvatarImage src={avatarSrc} alt="Avatar" className="w-7 h-7" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          }
        />
      </div>
    </header>
  );
};

export default AdminHeader;
