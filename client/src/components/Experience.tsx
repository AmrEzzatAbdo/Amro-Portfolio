import { Card, CardContent } from "@/components/ui/card";
import { workExperience } from "@/lib/data";
import { motion } from "framer-motion";
import { BriefcaseIcon } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="mb-12 scroll-mt-16">
      <Card className="overflow-hidden print:shadow-none">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <BriefcaseIcon className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            {workExperience.map((job, index) => (
              <motion.div
                key={index}
                className="relative ml-10 mb-10 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute w-4 h-4 bg-primary border-2 border-background rounded-full -left-[28px] top-1 z-10"></div>

                <div className="mb-2">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap items-center text-sm mb-1">
                    <span className="font-medium text-primary">{job.company}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-muted-foreground">{job.period}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-muted-foreground">{job.location}</span>
                  </div>
                </div>
                {job.description && (
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                )}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Achievements/Tasks</h4>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
