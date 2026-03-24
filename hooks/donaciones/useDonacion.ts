import type { MiDonacion } from '@/types/donaciones';

/**
 * Mock hook - useDonacion
 * For legacy mis-donaciones/[id] page
 */
export function useDonacion(_id?: string | number): {
  donacion: MiDonacion | null;
  data: MiDonacion | null;
  isLoading: boolean;
  error: string | null;
} {
  return { donacion: null, data: null, isLoading: false, error: null };
}
