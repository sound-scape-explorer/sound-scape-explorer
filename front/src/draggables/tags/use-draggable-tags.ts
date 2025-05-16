import {useClientSettings} from 'src/composables/use-client-settings';
import {TagsDraggableSize} from 'src/constants';
import {type Ref} from 'vue';

export function useDraggableTags() {
  const {tagsDraggableSizeVertical: v, tagsDraggableSizeHorizontal: h} =
    useClientSettings();

  const cyclePrimitive = (p: Ref<TagsDraggableSize>) => {
    switch (p.value) {
      case TagsDraggableSize.enum.small: {
        p.value = TagsDraggableSize.enum.medium;
        break;
      }

      case TagsDraggableSize.enum.medium: {
        p.value = TagsDraggableSize.enum.large;
        break;
      }

      case TagsDraggableSize.enum.large: {
        p.value = TagsDraggableSize.enum.small;
        break;
      }

      default: {
        p.value = TagsDraggableSize.enum.small;
      }
    }
  };

  const cycleHorizontal = () => cyclePrimitive(h);
  const cycleVertical = () => cyclePrimitive(v);

  return {
    sizeHorizontal: h,
    sizeVertical: v,
    cycleHorizontal,
    cycleVertical,
  };
}
