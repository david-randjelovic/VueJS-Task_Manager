import { ref, readonly } from 'vue';

export function useSearch() {
  const searchTerm = ref('');

  const setSearchTerm = (newTerm) => {
    searchTerm.value = newTerm;
  };

  return {
    searchTerm: readonly(searchTerm),
    setSearchTerm,
  };
}