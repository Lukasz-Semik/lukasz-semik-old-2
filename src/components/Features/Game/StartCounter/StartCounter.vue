<template>
  <div :class="[$style['wrapper']]">
    <transition
      appear
      mode="out-in"
      :enter-active-class="$style['enter-active']"
      :enter-class="$style['enter']"
      @after-enter="onAfterEnter"
    >
      <p key="3" v-if="counter === 3">3</p>
      <p key="2" v-if="counter === 2">2</p>
      <p key="1" v-if="counter === 1">1</p>
      <p key="start" v-if="counter === 0" @transitionend="dd">Let's Go!</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StartCounter',
  data() {
    return {
      counter: 3,
    };
  },
  methods: {
    onAfterEnter() {
      if (this.counter === 0) return;
      this.counter = this.counter - 1;
    },
    dd() {
      console.log('dd');
    },
  },
};
</script>

<style lang="scss" module src="./StartCounter.scss" />
