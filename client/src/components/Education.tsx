import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/lib/data";
import { motion } from "framer-motion";
import { GraduationCapIcon, CheckCircle2Icon } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="mb-12 scroll-mt-16">
      <Card className="overflow-hidden print:shadow-none">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <GraduationCapIcon className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Education & Training</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-muted/50 rounded-lg p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md">
                    {edu.period}
                  </span>
                </div>
                <div className="mt-4">
                  {edu.achievement && (
                    <div className="flex items-center mb-2">
                      <CheckCircle2Icon className="text-secondary-500 h-4 w-4 mr-2" />
                      <span className="text-muted-foreground">{edu.achievement}</span>
                    </div>
                  )}
                  {edu.courses && (
                    <>
                      <h4 className="font-medium mb-2">Course Contents</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {edu.courses.map((course, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle2Icon className="text-green-500 h-4 w-4 mr-1" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
