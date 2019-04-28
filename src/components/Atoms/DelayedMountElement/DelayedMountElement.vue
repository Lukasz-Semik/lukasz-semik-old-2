<template>
  <div :class="$style['wrapper']">
    <div data-test="fake-content" v-if="hasInitialContentWidth" :class="$style['fake-content']">
      <slot />
    </div>

    <transition mode="out-in" :enter-active-class="enterActiveClass" :enter-class="enterClass">
      <div data-test="real-content" :class="$style['real-content']" v-if="isVisible">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DelayedMountElement',
  props: {
    hasInitialContentWidth: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 0,
    },
    enterActiveClass: {
      type: String,
      default: '',
    },
    enterClass: {
      type: String,
      default: '',
    },
  },
  created() {
    setTimeout(() => {
      this.isVisible = true;
    }, this.delay);
  },
  data() {
    return {
      isVisible: false,
    };
  },
};
</script>

<style lang="scss" module src="./DelayedMountElement.scss" />
