import React from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Github, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Register', href: '#register' },
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/iicmuj?igsh=ZzZjejkyOW5ibmNs',
    icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
    label: 'IIC Instagram',
    color: 'hover:text-pink-400',
  },
  {
    href: 'https://www.linkedin.com/company/international-innovation-challenge-iic/',
    icon: <Linkedin className="h-4 w-4" aria-hidden="true" />,
    label: 'IIC LinkedIn',
    color: 'hover:text-cyan-400',
  },
  {
    href: 'https://github.com/SS-9098/IIC-2.0',
    icon: <Github className="h-4 w-4" aria-hidden="true" />,
    label: 'IIC GitHub',
    color: 'hover:text-purple-400',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="space-bg pt-16 pb-8 relative" role="contentinfo">
      {/* Top fade overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                alt="MUJ Logo"
                src="/muj-logo.png"
                width="110"
                className="opacity-90"
              />
              <div
                className="w-px h-8 bg-gradient-to-b from-pink-400 to-cyan-400 opacity-50"
                aria-hidden="true"
              />
              <Link to="/" aria-label="IIC Home">
                <img
                  alt="IIC Logo"
                  src="/iic-logo.png"
                  width="110"
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed text-sm max-w-md">
              The premier hackathon experience where innovation meets opportunity.
              Join us for 36 hours of coding, collaboration, and creation that
              will shape the future.
            </p>

            <div className="flex gap-3" role="list" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  role="listitem"
                  className={`glass-surface p-2.5 rounded-full text-gray-400 ${link.color} border border-pink-500/10 hover:border-pink-400/30 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="h-5 w-5 text-pink-400" aria-hidden="true" />
              <h3 className="text-white font-semibold text-base">Quick Links</h3>
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2 group text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-2 rounded-lg flex-shrink-0 mt-0.5">
                  <Phone className="h-4 w-4 text-pink-400" aria-hidden="true" />
                </div>
                <address className="text-gray-400 text-sm not-italic leading-relaxed">
                  Dr. GL Saini — 8890191811
                  <br />
                  Tanishk Mittal — 9728014818
                </address>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-2 rounded-lg flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                </div>
                <address className="text-gray-400 text-sm not-italic leading-relaxed">
                  <a
                    href="mailto:gaindi.saini@jaipur.manipal.edu"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    gaindi.saini@jaipur.manipal.edu
                  </a>
                  <br />
                  <a
                    href="mailto:Tanishkmittal38@gmail.com"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Tanishkmittal38@gmail.com
                  </a>
                </address>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-2 rounded-lg flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-purple-400" aria-hidden="true" />
                </div>
                <address className="text-gray-400 text-sm not-italic leading-relaxed">
                  Manipal University Jaipur
                  <br />
                  Dehmi Kalan, Rajasthan 303007
                </address>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <p className="text-center text-gray-600 text-xs">
          © 2025 IIC 2.0 — International Innovation Challenge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;