import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background border-t border-border py-8 print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="text-center md:text-left mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Amr Ezzat. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              variant="link"
              className="text-primary hover:text-primary/80"
              onClick={handleScrollToTop}
            >
              Back to Top <ArrowUpIcon className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
