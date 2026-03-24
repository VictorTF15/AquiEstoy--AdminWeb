/**
 * Mock hook - useCrearCaso
 * For legacy crear-caso page
 */
export function useCrearCaso() {
  const crearCaso = async (_payload: unknown) => true;
  return {
    mutate: () => {},
    crearCaso,
    isLoading: false,
    error: null,
    success: false,
  };
}
