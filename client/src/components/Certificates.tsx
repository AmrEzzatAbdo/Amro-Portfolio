import { Card, CardContent } from "@/components/ui/card";
import { certificates } from "@/lib/data";
import { motion } from "framer-motion";
import { AwardIcon } from "lucide-react";

export default function Certificates() {
  return (
    <section id="certificates" className="mb-12 scroll-mt-16">
      <Card className="overflow-hidden print:shadow-none">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <AwardIcon className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Certificates</h2>
          </div>

          <div className="overflow-x-auto pb-4 print:overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-w-[600px]">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary/10 dark:to-primary/5 rounded-lg p-5 border border-primary/20 dark:border-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex items-start">
                    <AwardIcon className="text-primary h-6 w-6 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold">{cert.name}</h3>
                      <p className="text-sm text-primary">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
