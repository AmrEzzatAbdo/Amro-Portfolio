import { Card, CardContent } from "@/components/ui/card";
import { technicalSkills, programmingLanguages, technologies, languages } from "@/lib/data";
import { motion } from "framer-motion";
import { WrenchIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Skills() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const isDarkMode = document.documentElement.classList.contains("dark");
      const textColor = isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";
      const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "radar",
          data: {
            labels: [
              "RPA",
              "OOP",
              "Algorithms",
              "Data Structure",
              "Java",
              "C#",
              "SQL",
              "Python",
            ],
            datasets: [
              {
                label: "Skill Level",
                data: [95, 85, 80, 85, 85, 80, 80, 70],
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(59, 130, 246, 0.2)",
                borderColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.8)"
                  : "rgba(59, 130, 246, 0.8)",
                pointBackgroundColor: isDarkMode
                  ? "rgba(139, 92, 246, 1)"
                  : "rgba(139, 92, 246, 1)",
                borderWidth: 2,
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: isDarkMode
                  ? "rgba(59, 130, 246, 1)"
                  : "rgba(59, 130, 246, 1)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                angleLines: {
                  color: gridColor,
                },
                grid: {
                  color: gridColor,
                },
                pointLabels: {
                  color: textColor,
                  font: {
                    size: 11,
                  },
                },
                ticks: {
                  color: textColor,
                  backdropColor: "transparent",
                  showLabelBackdrop: false,
                  z: 1,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)",
                titleColor: isDarkMode ? "#fff" : "#000",
                bodyColor: isDarkMode ? "#fff" : "#000",
                borderColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
              },
            },
          },
        });
      }
    }

    // Update chart when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
            chartInstance.current = null;
          }
          if (chartRef.current) {
            const isDarkMode = document.documentElement.classList.contains("dark");
            const textColor = isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";
            const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
              chartInstance.current = new Chart(ctx, {
                type: "radar",
                data: {
                  labels: [
                    "RPA",
                    "OOP",
                    "Algorithms",
                    "Data Structure",
                    "Java",
                    "C#",
                    "SQL",
                    "Python",
                  ],
                  datasets: [
                    {
                      label: "Skill Level",
                      data: [95, 85, 80, 85, 85, 80, 80, 70],
                      backgroundColor: isDarkMode
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(59, 130, 246, 0.2)",
                      borderColor: isDarkMode
                        ? "rgba(59, 130, 246, 0.8)"
                        : "rgba(59, 130, 246, 0.8)",
                      pointBackgroundColor: isDarkMode
                        ? "rgba(139, 92, 246, 1)"
                        : "rgba(139, 92, 246, 1)",
                      borderWidth: 2,
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: isDarkMode
                        ? "rgba(59, 130, 246, 1)"
                        : "rgba(59, 130, 246, 1)",
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: {
                        color: gridColor,
                      },
                      grid: {
                        color: gridColor,
                      },
                      pointLabels: {
                        color: textColor,
                        font: {
                          size: 11,
                        },
                      },
                      ticks: {
                        color: textColor,
                        backdropColor: "transparent",
                        showLabelBackdrop: false,
                        z: 1,
                      },
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)",
                      titleColor: isDarkMode ? "#fff" : "#000",
                      bodyColor: isDarkMode ? "#fff" : "#000",
                      borderColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
                      borderWidth: 1,
                    },
                  },
                },
              });
            }
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="mb-12 scroll-mt-16">
      <Card className="overflow-hidden print:shadow-none">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <WrenchIcon className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Skills & Expertise</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Skills</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{skill.name}</h4>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-lg font-medium mb-4">Programming Languages</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {programmingLanguages.map((lang, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{lang.name}</h4>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {lang.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Skills Radar Chart</h3>
              <div className="bg-muted/50 rounded-lg p-4 h-80">
                <canvas ref={chartRef}></canvas>
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">Languages</h3>
              <div className="grid grid-cols-1 gap-3">
                {languages.map((lang, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">{lang.proficiency}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
