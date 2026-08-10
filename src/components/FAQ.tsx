import React, { useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Who can participate in IIC 2.0?',
    answer:
      "IIC 2.0 is open to all students across colleges and disciplines. Whether you're a first-timer or a seasoned hacker, if you've got the passion to innovate — you're in!",
  },
  {
    question: 'Do I need to have a team to register?',
    answer:
      "You can register individually or as a team of 2–4 members. Flying solo? We'll help you team up with other brilliant minds!",
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'Yes, the registration fee is ₹700 per team. This covers your meals, resources, participation kit, and an unforgettable hackathon experience!',
  },
  {
    question: 'What should I bring to the hackathon?',
    answer:
      'Your laptop, charger, college ID, and anything else you may need for your project. Also — bring your creativity and caffeine cravings!',
  },
  {
    question: 'Will accommodations be provided?',
    answer:
      'Yes, we will provide two separate common rooms for boys and girls.',
  },
  {
    question: 'Will there be food provided?',
    answer:
      'Yes, food and refreshments will be provided throughout the event. Stay focused — we\'ll keep your hunger in check! 🍽️',
  },
  {
    question: 'Can I work on a pre-existing project?',
    answer:
      'No, all submissions must be developed during the hackathon. You can bring ideas, but coding starts only after the hackathon kicks off.',
  },
  {
    question: 'What resources will be available during the hackathon?',
    answer:
      'Power access, comfortable seating, stationery (if required), and mentorship support will be available to all participants.',
  },
  {
    question: 'How will projects be judged?',
    answer:
      'Your project will be evaluated based on: Innovation & Creativity, Technical Execution, Impact & Relevance to the Theme, and Pitch & Demo Presentation.',
  },
];

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleContact = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'tel:+919728014818';
    } else {
      window.location.href =
        'mailto:Tanishkmittal38@gmail.com?subject=Inquiry about IIC 2.0';
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 space-bg"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <HelpCircle className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about IIC 2.0. If you don't see
            your question here, feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                title={item.question}
              >
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 mb-6 text-base">
            Still have questions? We're here to help!
          </p>
          <Button variant="neon" size="lg" onClick={handleContact}>
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
