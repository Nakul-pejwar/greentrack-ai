// Mock implementation of IBM Envizi / Climate TRACE APIs
export const fetchEmissionFactors = async (material: string): Promise<number> => {
  // Stub with some mock emission factors per material type
  const mockFactors: { [key: string]: number } = {
    'electricity': 0.5,
    'diesel': 2.68,
    'natural_gas': 2.02,
    'water': 0.344,
  };

  return mockFactors[material] || 0.5; // fallback to 0.5
};
