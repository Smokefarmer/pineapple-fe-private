'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button'; // Assuming path is correct
import {
  ArrowRight,
  CheckCircle,
  FileCode,
  ShieldCheck,
  Zap,
  DollarSign,
  Sparkles,
  Users,
  Lock, // Added Lock icon
} from 'lucide-react';

// --- Logo Component ---
const PineappleLogoIcon = () => (
  <div className="relative group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-12 w-12 sm:h-16 sm:w-16 mb-4 drop-shadow-lg" // Adjusted size
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" /> {/* Amber 500 */}
          <stop offset="100%" stopColor="#d97706" /> {/* Amber 600 */}
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
        fill="url(#logoGradient)"
      />
    </svg>
    {/* Subtle glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
  </div>
);

// --- Features Data ---
const features = [
  {
    icon: FileCode,
    title: "Custom Token Creation",
    description: "Generate EVM-compatible smart contracts with custom ticker, supply, and tax logic.",
  },
  {
    icon: Users,
    title: "Advanced Whitelisting",
    description: "Automated and manual whitelisting with staking score integration.",
  },
  {
    icon: DollarSign,
    title: "Tax Configuration",
    description: "Set custom tax rates and designate up to three recipient wallets for fee distribution.",
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Create liquidity pools on Uniswap (ETH) or PancakeSwap (BNB) with a single click.",
  },
  {
    icon: Sparkles,
    title: "Referral System",
    description: "Partner referral program with customizable commission structure.",
  },
  {
    icon: Lock, // Using Lock icon for security
    title: "Secure Deployment",
    description: "Admin-controlled approval process with security checks and auditable contracts.",
  },
];

// --- Benefits Data ---
const benefits = [
  {
    title: "For Token Creators",
    items: [
      "Launch tokens with just a few clicks",
      "No coding experience required",
      "Custom tax configuration",
      "Immediate trading capability"
    ]
  },
  {
    title: "For Partners",
    items: [
      "Refer projects and earn commissions",
      "Track referred projects in real-time",
      "Customizable commission structure",
      "Dedicated partner dashboard"
    ]
  }
];

// --- Animation Variants for Hero Section ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- Floating Shapes Component ---
const FloatingShapes = () => (
    <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Shape 1 */}
        <motion.div
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: [0.6, 0.9, 0.6], scale: 1, x: [-20, 20, -20], y: [-10, 10, -10] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] left-[5%] w-64 h-64 sm:w-80 sm:h-80  rounded-full filter blur-xl hover:blur-3xl"
        ><img width={100} height={100} src="/icons/crypto/icon.png" alt="" /></motion.div>
        {/* Shape 2 */}
        <motion.div
             initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: [0.6, 0.9, 0.6], scale: 1, x: [30, -30, 30], y: [20, -20, 20] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute bottom-[15%] right-[10%] w-56 h-56 sm:w-72 sm:h-72  from-orange-500/50 via-amber-500/20 to-transparent rounded-full filter blur-xl"
        >
            <img width={100} height={100} src="/icons/crypto/icon2.png" alt="" />
        </motion.div>
         {/* Shape 3 - Smaller, different position */}
        <motion.div
             initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: [0.6, 0.9, 0.6], scale: 1, x: [-15, 15, -15], y: [30, -10, 30] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 10 }}
            className="absolute top-[40%] right-[25%] w-40 h-40 sm:w-52 sm:h-52  from-amber-400/60 via-orange-600/30 to-transparent rounded-full filter blur-xl" // Slightly less blur
        >
            <img width={100} height={100} src="/icons/crypto/icon3.png" alt="" />
        </motion.div>
         {/* Shape 4 - Another variation */}
        <motion.div
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: [0.6, 0.9, 0.6], scale: 1, x: [10, -10, 10], y: [-25, 25, -25] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-[30%] left-[20%] w-48 h-48 sm:w-64 sm:h-64  from-amber-600/50 via-amber-700/20 to-transparent rounded-full filter blur-xl"
          > <img width={100} height={100} src="/icons/crypto/icon4.png" alt="" /></motion.div>
    </div>
);


// --- Main HomePage Component ---
export default function HomePage() {
  const containerRef = useRef(null);

  return (
    // Main container: Black background
    <div ref={containerRef} className="relative min-h-screen bg-black text-gray-100 overflow-x-hidden">

    

      {/* Main Content Area - Stacks above shapes */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 isolate"> {/* `isolate` for stacking */}
         
  {/* Floating Shapes Background Layer */}
  <FloatingShapes />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <PineappleLogoIcon />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }} // Subtle shadow for readability
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Ultimate</span> Token Launch Platform
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto" // Light gray text
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }} // Subtle shadow
            >
              Deploy custom EVM-compatible tokens with advanced whitelist integration,
              configurable tax logic, and instant liquidity provision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link href="/login" passHref>
                 <Button
                   size="lg"
                   className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
                 >
                   Launch App
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
              </Link>
              <Link href="#features" passHref>
                 <Button
                   size="lg"
                   variant="outline"
                   className="w-full sm:w-auto font-semibold text-base px-8 py-3 rounded-lg border-2 border-white/20 text-gray-300 hover:bg-white/10 hover:border-amber-500/70 hover:text-amber-400 transition-all duration-300 transform hover:scale-105"
                 >
                   Explore Features
                 </Button>
              </Link>
            </motion.div>

            {/* Trust badge */}
            <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-gray-300">
                <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                <span>Admin-approved access with secure contract deployment</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-28 px-4 sm:px-6 lg:px-8  backdrop-blur-lg border-y border-white/10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-100">Everything You Need</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                 Powerful features for a seamless token launch.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group" // Group class for hover state targeting
                >
                  {/* Enhanced Feature Card */}
                  <div className="relative h-full p-8 flex flex-col  border border-white/10 rounded-xl shadow-lg transition-all duration-300 overflow-hidden hover:border-amber-500/50 hover:shadow-amber-500/20">
                     {/* Animated top border on hover */}
                     <div className="absolute top-0 left-0 h-1 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full"></div>

                    {/* Icon Area */}
                    <div className="mb-6 p-3 bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent rounded-lg w-14 h-14 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-500/60 transition-colors duration-300">
                       <feature.icon className="h-7 w-7 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Content */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                        <p className="text-gray-400 text-sm flex-grow">{feature.description}</p>
                    </div>
                     {/* Faded corner gradient on hover */}
                     <div className="absolute -bottom-10 -right-10 w-24 h-24  from-amber-600/15 to-transparent rounded-full filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
         <section className="py-28 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                     <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-100">Why Choose Pineapple Express</h2>
                     <p className="text-lg text-gray-400 max-w-2xl mx-auto"> Benefits for creators and partners.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            // Applying slightly different styles based on index for variation
                            className="w-full mx-auto bg-gradient-to-br from-orange-500/20 via-black to-orange-400/20 backdrop-blur-md rounded-2xl p-10 sm:p-12 border border-white/15 shadow-2xl"
        
                        >
                            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                                {benefit.title}
                            </h3>
                            <ul className="space-y-4">
                                {benefit.items.map((item, i) => (
                                    <li key={i} className="flex items-start text-card-300">
                                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 text-center px-4 bg-gradient-to-b from-black via-gray-950/50 to-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-md rounded-2xl p-10 sm:p-12 border border-white/15 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-100">Ready to Launch Your Token?</h3>
            <p className="text-lg text-gray-400 mb-8">
              Get started today with our secure, admin-approved token launch platform.
            </p>
            <Link href="/login" passHref>
               <Button
                 size="lg"
                 className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-base px-10 py-3 rounded-lg shadow-lg hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
               >
                 Access the Platform
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </Link>
            <p className="mt-6 text-xs text-gray-500">
              Requires admin-approved whitelisted wallet.
            </p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 bg-black"> {/* Black footer bg */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              {/* Optional: Smaller logo here? <PineappleLogoIcon /> */}
              <span className="ml-2 text-lg font-semibold text-gray-200">Pineapple Express</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Pineapple Express. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Remember to add utility class to your globals.css if you haven't:
/*
@layer utilities {
  .text-shadow {
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }
}

// You might also need to define the radial gradient utility if not standard in your Tailwind setup
@layer utilities {
  . {
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
}
*/

// Ensure your tailwind.config.js supports blur filters (usually enabled by default)
// and potentially add the amber/orange colors if not already present in your theme.