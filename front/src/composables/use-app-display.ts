import {ref} from 'vue';
import {z} from 'zod';

// first value is default
export function useAppDisplay(...values: string[]) {
  const Display = z.enum([...values]);
  // eslint-disable-next-line no-redeclare
  type Display = z.infer<typeof Display>;

  const display = ref<Display>(values[0]);

  const cycle = () => {
    const options = Display.options;
    let next = options.indexOf(display.value) + 1;

    if (next >= options.length) {
      next = 0;
    }

    display.value = options[next];
  };
  return {
    display,
    Display,
    cycle,
  };
}
