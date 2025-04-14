import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";
import { Menu, MoonIcon, SunIcon } from "lucide-react";
import { Link } from "wouter";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = "https://drive.usercontent.google.com/u/0/uc?id=1A3auT0qjYCghDtrCUWnamwvdzopALJBC&export=download";
    downloadLink.click();
    document.body.removeChild(downloadLink); 
  };
  

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center font-bold text-lg text-primary">
              <span className="hidden sm:inline">Amr Ezzat</span>
              <span className="sm:hidden">AE</span>
            </a>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              className="flex items-center"
              aria-label="Download resume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Resume
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col mt-6 space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
