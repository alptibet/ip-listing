import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <p>IP LIST</p>
      <UserButton afterSignOutUrl={"/"} />
    </div>
  );
}
