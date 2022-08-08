import { defineStore } from "pinia";
import { computed, ref } from "vue";

// OptionsAPIに似たな書き方
export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      // Vueコンポーネントと同じように直接値を変更する
      this.count++;
    },
  },
});

// CompositionAPIのsetup()に似た書き方
export const useCounterStoreSetup = defineStore("", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };
  return {
    count,
    doubleCount,
    increment,
  };
});
