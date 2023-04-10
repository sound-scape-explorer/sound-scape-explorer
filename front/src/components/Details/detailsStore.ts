import {reactive} from 'vue';

export const fileName = reactive<{path: string | null;}>({
  path: null,
});

// export const fileIndex = reactive<{value: number | null;}>({
//   value: null,
// });

export const fileTimestamp = reactive<{value: number | null;}>({
  value: null,
});
