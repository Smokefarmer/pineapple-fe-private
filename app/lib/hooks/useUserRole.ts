import { useSiwe } from '@/app/components/auth/siwe-provider';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';

export interface UserRole {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
}

/**
 * Hook to determine user role based on authentication and wallet address
 * Note: Super admin status is determined by backend API calls, not hardcoded addresses
 */
export function useUserRole(): UserRole {
  const { isSignedIn } = useSiwe();
  const { address, isConnected } = useAccount();

  return useMemo(() => {
    // Default role when not connected or signed in
    if (!isConnected || !isSignedIn || !address) {
      return {
        isAdmin: false,
        isSuperAdmin: false,
        isUser: false
      };
    }

    // For now, we assume any signed-in user in the admin area is an admin
    // The super admin check will be handled by the backend API calls
    // The backend will return appropriate errors if the user is not a super admin
    return {
      isAdmin: true,
      isSuperAdmin: true, // We'll let the backend determine this during API calls
      isUser: false
    };
  }, [isConnected, isSignedIn, address]);
}

/**
 * Hook specifically for checking if user can perform super admin actions
 * This is a simplified version that allows the attempt - the backend will handle authorization
 */
export function useCanCreateAdmin(): boolean {
  const { isAdmin } = useUserRole();
  return isAdmin; // Let backend handle the actual super admin check
}
