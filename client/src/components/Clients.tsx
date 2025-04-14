import { Card, CardContent } from "@/components/ui/card";
import {clients} from "@/lib/data";
import * as React from "react"
import styles from './AutoScrollExperience.module.css';
import { ArrowBigRight, Laptop } from "lucide-react";


export default function Clients() {
  return (
    <div className={styles.mainStyle} id="clients">
    <Card className="overflow-hidden print:shadow-none">
       <CardContent className="p-6 md:p-8">
       <div className="flex items-center mb-6">
            <Laptop className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Places I Have Worked With</h2>
          </div>
  <div className="overflow-x-auto pb-4 print:overflow-visible">
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer}>
        <div className={styles.scroller}>
          {clients.concat(clients).map((clients, index) => (
            <div key={index} className={styles.companyCard}>
              <img src={clients.logo} alt={clients.name} />
              <p>{clients.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </CardContent>
    </Card>
    </div>
  );
}
