import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, Eye, Award, X, Calendar, CheckCircle } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  description: string;
  skills: string[];
  verified: boolean;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "GitHub Foundations Badge",
    issuer: "GitHub",
    date: "June 2024",
    credentialId: "GHF-2024-001",
    image: "/GitHubFoundations_Badge20250820-31-2pyyn9.pdf",
    description: "Awarded for completing the GitHub Foundations course, demonstrating proficiency in version control and collaboration workflows.",
    skills: ["Git", "Version Control", "Collaboration"],
    verified: true
  },
  {
    id: 2,
    title: "Proof of Concept",
    issuer: "Institution Name",
    date: "May 2024",
    credentialId: "ARAVIND-2024-002",
    image: "/Aravind_certification_2.pdf",
    description: "Certification for outstanding achievement in the specified field.",
    skills: ["Achievement", "Dedication"],
    verified: true
  },
  {
    id: 3,
    title: " MySQL Implementation Certified Associate",
    issuer: "Certifying Authority",
    date: "April 2024",
    credentialId: "ECERT-2024-003",
    image: "/eCertificate.pdf",
    description: "eCertificate awarded for successful completion of the program.",
    skills: ["Completion", "Certification"],
    verified: true
  },
  {
    id: 4,
    title: "24MCR005 Aravindhasamy R",
    issuer: "University/College",
    date: "March 2024",
    credentialId: "24MCR005-2024-004",
    image: "/24MCR005_ARAVINDHASAMY R.pdf",
    description: "Certificate for academic or extracurricular achievement.",
    skills: ["Academic Excellence"],
    verified: true
  }
];

const CertificatesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const handleDownload = (certificate: Certificate) => {
    // In a real application, this would download the actual certificate
    const link = document.createElement('a');
    link.href = certificate.image;
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-blue-600">Certificates</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements in animation and motion graphics
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  {certificate.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white p-2 rounded-full shadow-lg"
                      title="Verified Certificate"
                    >
                      <CheckCircle size={20} />
                    </motion.div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.button
                    onClick={() => setSelectedCertificate(certificate)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
                    title="View Certificate"
                  >
                    <Eye size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(certificate)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
                    title="Download Certificate"
                  >
                    <Download size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="text-blue-600" size={20} />
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                      Certified
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>{certificate.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {certificate.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {certificate.issuer}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {certificate.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {certificate.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {certificate.skills.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{certificate.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setSelectedCertificate(certificate)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(certificate)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <iframe
                    src={selectedCertificate.image}
                    title={selectedCertificate.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <motion.button
                    onClick={() => setSelectedCertificate(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                  >
                    <X size={24} />
                  </motion.button>
                  
                  {selectedCertificate.verified && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center space-x-2">
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCertificate.title}
                      </h3>
                      <p className="text-xl text-blue-600 dark:text-blue-400 mb-2">
                        {selectedCertificate.issuer}
                      </p>
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{selectedCertificate.date}</span>
                        </div>
                        <div className="text-sm">
                          ID: {selectedCertificate.credentialId}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        onClick={() => handleDownload(selectedCertificate)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                      >
                        <Download size={20} />
                        <span>Download PDF</span>
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {selectedCertificate.description}
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Skills Demonstrated
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedCertificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;