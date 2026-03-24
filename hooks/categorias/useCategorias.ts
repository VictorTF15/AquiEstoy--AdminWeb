/**
 * Mock hook - useCategorias
 * For legacy pages
 */
type LegacyCategoria = {
  id: number;
  nombre?: string;
  es_activo?: boolean;
};

export function useCategorias(): {
  categorias: LegacyCategoria[];
  data: LegacyCategoria[];
  isLoading: boolean;
  error: string | null;
} {
  return { categorias: [], data: [], isLoading: false, error: null };
}
