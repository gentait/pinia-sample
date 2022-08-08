<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
store.$onAction(
  ({
    name, // 実行されたactionの名前
    store, // Storeのインスタンス。`store`に同じ
    args, // actionに渡された引数の配列
    after, // actionの完了後（Promiseであれば`resolve()`された後）に実行する処理
    onError, // actionで例外が投げられたとき（Promiseであれば`reject()`されたとき）に実行する処理
  }) => {
    console.log({
      name,
      store,
      args,
    });

    after((result) => {
      // action実行後に行われる処理
      console.log("after", result);
    });

    onError((error) => {
      // actionでエラーが発生したときに行われる処理
      console.error("error", error);
    });
  }
);
store.$subscribe((mutation, state) => {
  console.log(mutation.type); // 'direct' | 'patch object' | 'patch function'
  // myStore.$idと同じもの
  console.log(mutation.storeId); // 'myStore'
  // mutation.type === 'patch object'の時のみ有効
  console.log(state.count); // myStore.$patch()に渡したオブジェクト

  // Stateに変更があったときに実行したい処理を書いていく
  // ...
});
// 分割代入時はreactivityを壊さないためにstoreToRefsを使う必要がある
const { count, doubleCount } = storeToRefs(store);
// ストアアクションの取得
const { increment } = store;
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button type="button" @click="increment">increment</button>
  </div>
</template>

<style module lang="scss"></style>
