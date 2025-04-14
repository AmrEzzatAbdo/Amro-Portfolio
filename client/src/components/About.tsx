import { Card, CardContent } from "@/components/ui/card";
import { personalInfo, socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="mb-12 scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden print:shadow-none">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 p-6 md:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {personalInfo.name}
                </h1>
                <h2 className="text-xl text-primary font-medium mb-4">
                  {personalInfo.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {personalInfo.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
                      <polyline points="15,9 18,9 18,11" />
                      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
                      <line x1="8" x2="16" y1="13" y2="13" />
                    </svg>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a
                      href={`tel:${personalInfo.phoneEG}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.phoneEG}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-muted-foreground">{personalInfo.location}</span>
                  </div>
                   <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a
                      href={`tel:${personalInfo.phoneUAE}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.phoneUAE}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-4 py-2 rounded-md hover:opacity-80 transition-opacity ${
                        link.name === "GitHub"
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}
                      aria-label={link.name}
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-primary to-purple-600 dark:from-primary/80 dark:to-purple-800 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-white font-semibold text-lg mb-4">Industry Experience</h3>
                <div className="grid grid-cols-1 gap-3">
                  {personalInfo.industryExperience.map((industry, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {industry.icon}
                      <span className="text-white">{industry.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <p className="text-white text-sm">{personalInfo.achievement}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
