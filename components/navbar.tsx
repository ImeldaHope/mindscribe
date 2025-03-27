"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SquarePen, Home, ChartLine, Settings } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Button
        variant="ghost"
        className={cn("hover:bg-muted", pathname === "/" && "bg-muted")}
        asChild
      >
        <Link href="/">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn("hover:bg-muted", pathname === "/journal" && "bg-muted")}
        asChild
      >
        <Link href="/journal">
          <SquarePen className="h-4 w-4 mr-2" />
          Journal
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-muted",
          pathname === "/analytics" && "bg-muted"
        )}
        asChild
      >
        <Link href="/analytics">
          <ChartLine className="h-4 w-4 mr-2" />
          Analytics
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn("hover:bg-muted", pathname === "/settings" && "bg-muted")}
        asChild
      >
        <Link href="/settings">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Link>
      </Button>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
