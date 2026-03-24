/**
 * Mock hook - useDonar
 * For legacy caso/[id] page
 */
export function useDonar() {
  const noop = () => {};
  const registrarDonacion = async (_payload: Record<string, unknown>) => true;
  return {
    mutate: noop,
    registrarDonacion,
    isLoading: false,
    error: null,
    success: false,
  };
}
