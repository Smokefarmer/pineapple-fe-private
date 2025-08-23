'use client';
import Link from 'next/link';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/app/components/ui/button"; // Corrected path
import { Moon, Sun, LogOut } from "lucide-react"; // Import icons
import { useTheme } from "next-themes";
import { useSiwe } from '@/app/components/auth/siwe-provider';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"; // Corrected path
import { Badge } from "@/app/components/ui/badge";

// Example Icon for Logo
const PineappleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-amber-500">
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);


export const Header: React.FC = () => { // Removed props, simplified
  const { setTheme } = useTheme();
  const { isSignedIn, signOutWithEthereum } = useSiwe();
  const router = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    // Sticky header with background blur effect
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
         {/* Left Side: Logo & Title */}
         <div className="mr-4 flex items-center gap-3">
           <Link href="/" className="mr-2 flex items-center space-x-2">
             <PineappleIcon />
             <span className="font-bold sm:inline-block">
                Pineapple Express
             </span>
           </Link>
           {/* Role Badge */}
           {role && (
             <Badge
               className="text-[10px] px-2 py-0.5"
               variant={role === 'ADMIN' ? 'default' : 'secondary'}
             >
               {role === 'ADMIN' ? 'Admin' : 'User'}
             </Badge>
           )}
           {/* Role-based Nav Links */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {role === 'ADMIN' ? (
              <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
            ) : (
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">Dashboard</Link>
            )}
          </nav>
         </div>

        {/* Right Side: Theme Toggle & Wallet Connect */}
        <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Force Dark - remove light/system options if strictly dark mode */}
                {/* <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* RainbowKit Connect Button */}
            <ConnectButton
                accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                showBalance={true} // Show balance as per image hint
                chainStatus="icon" // Only show chain icon, name is implicit (BNB)
             />
            
            {/* Sign Out Button (only shown when signed in with SIWE) */}
            {isSignedIn && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={async () => {
                  await signOutWithEthereum();
                  router.push('/login');
                }}
                title="Sign Out"
              >
                <LogOut className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Sign Out</span>
              </Button>
            )}
        </div>
      </div>
    </header>
  );
};