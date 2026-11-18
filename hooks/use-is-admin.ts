'use client';

import { useState } from 'react';
import { UserRole } from '@/lib/auth';

export function useIsAdmin() {
  const [isAdmin] = useState(true);
  const [role] = useState<UserRole | null>('admin');
  const [loading] = useState(false);

  return { isAdmin, role, loading };
}
