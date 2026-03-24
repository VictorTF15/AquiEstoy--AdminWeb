import type { MiDonacion } from '@/types/donaciones';

/**
 * Mock hook - useMisDonaciones
 * For legacy mis-donaciones page
 */
export function useMisDonaciones(): {
  donaciones: MiDonacion[];
  data: MiDonacion[];
  isLoading: boolean;
  error: string | null;
} {
  return { donaciones: [], data: [], isLoading: false, error: null };
}
