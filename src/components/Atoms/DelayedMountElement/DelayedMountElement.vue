<template>
  <div :class="$style['wrapper']">
    <div v-if="hasInitialContentWidth" :class="$style['fake-content']">
      <slot/>
    </div>

    <transition
      mode="out-in"
      :enter-active-class="$style['fade-enter-active']"
      :enter-class="$style['fade-enter']"
    >
      <div :class="$style['real-content']" v-if="isVisible">
        <slot/>
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
