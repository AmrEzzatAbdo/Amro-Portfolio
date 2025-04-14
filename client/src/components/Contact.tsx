import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactInfo } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ContactIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  var customSubject;
window.onsubmit= function() {
  // Reset the form fields when the page loads
  toast({
    title: "Message sent!",
    description: "Thank you for your message. I'll get back to you soon.",
  });
  setTimeout(function() {
  form.reset();
}, 120000);
};

  return (
    <section id="contact" className="mb-12 scroll-mt-16">
      <Card className="overflow-hidden print:hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center mb-6">
            <ContactIcon className="text-primary h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Get In Touch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-medium mb-4">Connect With Me</h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out for opportunities, collaborations, or questions about my work.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MailIcon className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <PhoneIcon className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${contactInfo.phoneEG}`}
                        className="hover:text-primary transition-colors"
                      >
                        {contactInfo.phoneEG}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <PhoneIcon className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${contactInfo.phoneUAE}`}
                        className="hover:text-primary transition-colors"
                      >
                        {contactInfo.phoneUAE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPinIcon className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{contactInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Social Media</h3>
                  <div className="flex space-x-4">
                    {contactInfo.socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full transition-colors ${
                          link.name === "GitHub"
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/30"
                        }`}
                        aria-label={link.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-medium mb-4">Send a Message</h3>
              <Form {...form}>
                <form className="space-y-4" method="POST" action="https://api.web3forms.com/submit" id="submitForm">
                <input type="hidden" name="access_key" value="9a8ef3fa-eea7-4f85-9399-cdaf95c99ba0"/>
                <input type="hidden" name="redirect" value="https://amro-portfolio.vercel.app/"></input>
                <input type="hidden" name="subject"/>
                <input type="hidden" name="from_name" value="Amro Portfolio Website"/>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message here..." rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                  >
                  Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}