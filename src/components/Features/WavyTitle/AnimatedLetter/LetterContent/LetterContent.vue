<template>
  <div :class="$style['wrapper']">
    <div data-test="fake-letter" :class="$style['fake-letter']">{{ letter }}</div>

    <transition
      mode="out-in"
      :enter-active-class="$style['letter-enter-active']"
      :enter-class="$style['letter-enter']"
    >
      <div data-test="real-letter" v-if="isVisible" :class="$style['real-letter']">
        {{ letter }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LetterContent',
  props: {
    letter: {
      type: String,
      required: true,
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

<style lang="scss" module src="./LetterContent.scss" />
