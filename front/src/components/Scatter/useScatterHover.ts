import {ref} from 'vue';

export function useScatterHover() {
  const hoveredRef = ref<number | null>(null);

  const handleHover = (index: number | null) => {
    if (hoveredRef.value === index) {
      return;
    }

    hoveredRef.value = index;
  };

  return {
    hoveredRef: hoveredRef,
    handleHover: handleHover,
  };
}
