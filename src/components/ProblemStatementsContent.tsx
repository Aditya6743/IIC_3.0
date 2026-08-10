import React, { useState, useRef, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface Problem {
  title: string;
  description: string;
}

interface ProblemCategory {
  [key: string]: Problem[];
}

const problemsByCategory: ProblemCategory = {
  'Artificial Intelligence & Machine Learning': [
    { title: 'Image based breed recognition for cattle and buffaloes of India', description: 'Develop an AI system to identify and classify different breeds of cattle and buffaloes native to India using image recognition technology.' },
    { title: 'AI based development of Laser based QR Code marking on track fittings on Indian Railways', description: 'Create an AI-powered system for automated QR code marking using laser technology on railway track fittings for better tracking and maintenance.' },
    { title: 'AI-Based Internship Recommendation Engine for PM Internship Scheme', description: 'Develop an AI-powered recommendation system to match students with suitable internship opportunities under the PM Internship Scheme.' },
    { title: 'Dashboard for tropospheric Precipitable Water interpolation using GNSS', description: 'Dashboard development using AI-ML techniques to interpolate tropospheric Precipitable Water (PW) content using zenith-wet delay from GNSS observations. Should accept multiple station observations and display interpolated results.' },
    { title: 'Ultra-Extreme Image Compression using AI-Based Super-Resolution', description: 'Develop an AI-powered image compression and reconstruction system that reduces high-resolution images (~1 MB) to maximum 1 KB for transmission, then recovers high-resolution images with minimal perceptual distortion using super-resolution techniques.' },
    { title: 'Cross Modal SAR-Optical Image Matching/Registration', description: 'Develop a robust algorithm for matching Synthetic Aperture Radar (SAR) and optical images using advanced feature extraction and matching techniques. Should explore both conventional and deep learning-based approaches using the Cloudsen12 dataset.' },
    { title: 'AI/ML Optical Flow based Frame interpolation of Satellite Images', description: 'Develop an AI/ML based Optical Flow frame interpolation technique to generate intermediate frames between consecutive satellite images, enhancing temporal resolution from 30 minutes to 15 minutes and further to 7.5 minutes intervals.' },
    { title: 'Vision based Intelligent RPA agent', description: 'Build a generic visual RPA agent that interacts with digital interfaces using vision and natural language. Should use Vision Transformer models to detect UI elements and perform actions based on natural language instructions without relying on fixed selectors.' },
    { title: 'AI-Powered Offline Organizational Chatbot', description: 'Design and develop an offline chatbot that can answer employee queries by retrieving information from organizational databases. Must implement role-based access control and run entirely offline using local LLM and vector database.' },
    { title: 'AI/ML-Driven Intelligent Software Code Analysis', description: 'Develop an AI/ML-powered software code analysis platform that can analyze large codebases, detect bugs and vulnerabilities, adapt to project-specific styles, and provide explainable insights with IDE integration.' },
  ],
  'Healthcare & Medical Technology': [
    { title: 'API integration for NAMASTE and ICD-11 TM2 into EMR systems', description: 'Develop API code to integrate NAMASTE and/or the International Classification of Diseases (ICD-11) via the Traditional Medicine Module 2 (TM2) into existing EMR systems that comply with Electronic Health Record (EHR) Standards for India.' },
    { title: 'Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases in Rural Northeast India', description: 'Develop a comprehensive health monitoring system with early warning capabilities for water-borne diseases specifically targeted at rural communities in Northeast India.' },
    { title: 'Healthcare tracking and monitoring solutions', description: 'Develop solutions for tracking immunization services, monitoring temperature-sensitive goods for vaccines and medicines during transport, and creating apps for disease outbreak management.' },
    { title: 'AI-Driven Public Health Chatbot for Disease Awareness', description: 'Create a multilingual AI chatbot to educate rural and semi-urban populations about preventive healthcare, disease symptoms, and vaccination schedules.' },
    { title: 'Quality Control for Medical Imaging Studies', description: 'Build an AI-powered pipeline that automatically checks CT scans for resolution, completeness, and anonymization compliance before they are used for training AI models.' },
    { title: 'Multi-Label Chest X-Ray Findings Detection', description: 'Create an AI system that can detect multiple abnormalities simultaneously in chest X-rays rather than just normal/abnormal classification.' },
    { title: 'Real-Time Imaging Workflow Orchestration', description: 'Design a workflow tool that ingests DICOM files, routes them through anomaly detection models, and pushes prioritized cases to a radiologist dashboard.' },
    { title: 'Privacy-Preserving Medical Image Sharing', description: 'Build a pipeline that automatically removes text labels and anonymizes metadata from medical images while preserving diagnostic quality.' },
    { title: 'AI-Powered Spine Posture Curve Estimation from Human Body', description: 'Create a computer-vision system that estimates spine alignment and curvature from normal RGB/depth images.' },
  ],
  'Agriculture & Food Technology': [
    { title: 'Intelligent Pesticide Sprinkling System Determined by the Infection Level of a Plant', description: 'Create an AI-driven system that determines optimal pesticide application based on real-time assessment of plant infection levels.' },
    { title: 'Low-Cost smart transportation solution for Agri produce from remote farms to nearest motorable road in NER Region', description: 'Develop affordable and smart transportation solutions to efficiently move agricultural produce from remote farms to accessible roads in the North Eastern Region of India.' },
    { title: 'Improved Onion storage technology for enhancing shelf life of onions', description: 'Develop advanced storage technologies and methods to significantly extend the shelf life of onions and reduce post-harvest losses.' },
    { title: 'AI-Based Farmer Query Support and Advisory System', description: 'Build an AI-powered system to provide farmers with instant answers to their queries and expert agricultural advisory services.' },
    { title: 'AI-powered farming assistance bots for small farmers', description: 'Design AI-powered bots for small farmers to aid with soil testing, pest detection, crop management, irrigation, and accessing financial aids.' },
    { title: 'Farmer-to-market connection platform', description: 'Develop a solution for connecting farmers with local markets, enabling real-time price discovery, efficient supply chain management, and fair pricing for agricultural produce.' },
  ],
  'Education Technology': [
    { title: 'Gamified Environmental Education Platform for Schools and Colleges', description: 'Create an engaging, game-based learning platform focused on environmental education for students in schools and colleges.' },
    { title: 'Digital Platform for Centralized Alumni Data Management and Engagement', description: 'Build a comprehensive digital platform for managing alumni data and fostering engagement between educational institutions and their alumni network.' },
    { title: 'VR and AR-based training tools for industry-relevant education', description: 'Create accessible VR and AR-based tools to enhance hands-on, industry-relevant training for students.' },
    { title: 'Integrated All-in-one mobile app for MUJ campus', description: "Develop an integrated 'All in one' mobile app for MUJ including smart parking, campus navigation, employee availability checking, alumni connection, and complaint tracking." },
    { title: 'AI-Powered Multi-Modal Classroom Engagement Analyzer', description: 'Build an AI tool that analyzes classroom videos and determines if students are engaged, distracted, or absent using both facial expressions and voice/text cues.' },
  ],
  'Government & Public Services': [
    { title: 'Automated Compliance Checker for Legal Metrology Declarations on E-Commerce Platforms', description: 'Build an automated system to verify and ensure compliance of legal metrology declarations on e-commerce platforms.' },
    { title: 'Mobile application for tracking district officials\' field visits', description: "Develop a mobile application for tracking district officials' field visits and inspections using geo-tagging and digital authentication." },
    { title: 'Government schemes to beneficiaries mapping software', description: 'Create a user-friendly software solution to map government schemes to beneficiaries based on their socio-economic background.' },
    { title: 'Automated deceased beneficiary detection system', description: 'Develop a unique and efficient mechanism to automatically stop the transfer of social security funds to deceased under various schemes.' },
  ],
  'Cybersecurity & Privacy': [
    { title: 'Secure Customer Premises Equipment (CPE) system for Naval Ships (SIFON)', description: 'Design and develop an indigenous, secure, and ruggedized CPE system to enable encrypted and reliable internet connectivity onboard Indian naval ships.' },
    { title: 'Post Quantum Cryptography (PQC) based TLS Termination Reverse Proxy', description: 'Implement a TLS termination proxy that uses post-quantum cryptography for secure key exchange and authentication.' },
    { title: 'Next-Gen Desktop Based Secure Data Vault', description: 'Develop a cross-platform desktop application for secure document storage with encryption, two-way synchronization, offline functionality, and role-based access.' },
  ],
  'Environmental & Sustainability': [
    { title: 'Development of Sensor for Detection Of Microplastics', description: 'Design and develop advanced sensors capable of detecting microplastics in various environments including water bodies and soil.' },
    { title: 'Smart Waste Segregation and Recycling System', description: 'Create an intelligent system for automated waste segregation and recycling management using smart technologies.' },
    { title: 'Application for on-spot assessment of Roof Top Rain water harvesting and artificial recharge potential', description: 'Design and develop an application for on-spot assessment of Roof Top Rain water harvesting and artificial recharge potential.' },
  ],
  'Blockchain Technology': [
    { title: 'Smart Tourist Safety Monitoring & Incident Response System using AI, Geo-Fencing, and Blockchain-based Digital ID', description: 'Develop a comprehensive safety monitoring system for tourists using AI-powered incident detection, geo-fencing technology, and blockchain-based digital identity verification.' },
    { title: 'Blockchain-based system for botanical traceability of Ayurvedic herbs', description: 'Develop a blockchain-based system for botanical traceability of Ayurvedic herbs, including geo-tagging from collection to the final Ayurvedic formulation label.' },
  ],
  'Assistive & Accessibility Technology': [
    { title: 'Assistive technologies for visually impaired individuals', description: 'Develop innovative assistive technologies and inclusive infrastructure to empower visually impaired individuals with enhanced navigation, mobility, and independence.' },
  ],
  'Network & Systems Technology': [
    { title: 'High-Throughput Parallelized UDP Transfer with Priority Scheduling', description: 'Design a system for reliable, high-throughput file transfer over UDP in air-gapped environments with adaptive redundancy mechanisms.' },
  ],
};

const ALL_CATEGORIES_KEY = '__ALL__';

const ProblemStatementsContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categories = useMemo(() => Object.keys(problemsByCategory), []);
  const totalCount = useMemo(
    () => Object.values(problemsByCategory).reduce((acc, arr) => acc + arr.length, 0),
    []
  );

  // Pre-filter problems per category to avoid inline filter execution inside render loops
  const filteredProblemsByCategory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result: Record<string, Problem[]> = {};

    categories.forEach((category) => {
      if (!q) {
        result[category] = problemsByCategory[category];
      } else {
        result[category] = problemsByCategory[category].filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }
    });

    return result;
  }, [searchQuery, categories]);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((cat) =>
      cat.toLowerCase().includes(q) || filteredProblemsByCategory[cat].length > 0
    );
  }, [searchQuery, categories, filteredProblemsByCategory]);

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Problem Statements
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Choose from cutting-edge problem statements across various technological
            domains. Each challenge is designed to push the boundaries of innovation
            and create real-world impact.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search problems or categories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 glass-surface rounded-xl border border-pink-500/20 text-white placeholder:text-gray-500 bg-transparent focus:outline-none focus:border-pink-400/60 transition-colors duration-300 text-sm"
              aria-label="Search problem statements"
            />
          </div>
        </motion.div>

        {/* Tabs layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Tabs defaultValue={ALL_CATEGORIES_KEY}>
            {/* Tab triggers */}
            <TabsList className="mb-8 flex-wrap gap-2">
              <TabsTrigger value={ALL_CATEGORIES_KEY}>
                All ({totalCount})
              </TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat} ({problemsByCategory[cat].length})
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All categories tab */}
            <TabsContent value={ALL_CATEGORIES_KEY}>
              <AnimatePresence mode="wait">
                {filteredCategories.length === 0 ? (
                  <motion.p
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 py-12"
                  >
                    No problems match your search.
                  </motion.p>
                ) : (
                  <div className="space-y-10">
                    {filteredCategories.map((category) => {
                      const filtered = filteredProblemsByCategory[category];
                      if (filtered.length === 0) return null;
                      return (
                        <div key={category}>
                          <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-lg font-bold text-pink-400">{category}</h2>
                            <Badge variant="default">{filtered.length}</Badge>
                          </div>
                          <Accordion type="single">
                            {filtered.map((problem, idx) => (
                              <AccordionItem
                                key={idx}
                                value={`${category}-${idx}`}
                                title={problem.title}
                              >
                                {problem.description}
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Per-category tabs */}
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-bold text-pink-400">{category}</h2>
                  <Badge variant="default">{problemsByCategory[category].length}</Badge>
                </div>
                <Accordion type="single">
                  {problemsByCategory[category].map((problem, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${category}-${idx}`}
                      title={problem.title}
                    >
                      {problem.description}
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default ProblemStatementsContent;