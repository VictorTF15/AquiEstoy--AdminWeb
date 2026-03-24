/**
 * Mock hook - useCasoDetail
 * For legacy caso/[id] page
 */
type LegacyCaso = {
  [key: string]: any;
  imagen1?: string;
  imagen2?: string;
  imagen3?: string;
  imagen4?: string;
};

export function useCasoDetail(_id?: string): {
  caso: LegacyCaso | null;
  data: LegacyCaso | null;
  isLoading: boolean;
  error: string | null;
} {
  return { caso: null, data: null, isLoading: false, error: null };
}
