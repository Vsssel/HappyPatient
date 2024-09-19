// composables/useFetch.ts
import { ref } from "vue";

export function useFetch(fetchFunction: () => Promise<any>) {
  const isLoading = ref(false);
  const data = ref(null);

  const executeFetch = async () => {
    isLoading.value = true;
    try {
      data.value = await fetchFunction();
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    data,
    executeFetch,
  };
}
