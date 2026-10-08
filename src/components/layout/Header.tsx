"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "IELTS Modules", href: "/#modules" },
    { name: "Features", href: "/#features" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/50 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary hidden sm:inline-block">Learn Banglay IELTS</span>
          <span className="text-xl font-bold text-primary sm:hidden">LBI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary ${
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">LOGIN</Button>
          </Link>
          <Link href="/register">
            <Button>REGISTER / JOIN COURSE</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-b bg-white/95 backdrop-blur-xl shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-foreground font-semibold" : "text-foreground/70"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-muted">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center text-base h-12">
                  LOGIN
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center text-base h-12">
                  REGISTER / JOIN COURSE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
