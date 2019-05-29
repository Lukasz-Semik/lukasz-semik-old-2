<template>
  <button v-if="isVisible" data-test="satellite" :class="className" @click="onHit" />
</template>

<script>
export default {
  name: 'DropSatellite',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isFullyVisible: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isHit: false,
    };
  },
  methods: {
    onHit() {
      this.isHit = true;
    },
  },
  computed: {
    className() {
      const { $style, index, isHit, isVisible, isFullyVisible } = this;

      return {
        [$style['button']]: true,
        [$style[`button--${index}`]]: isVisible,
        [$style[`button--${index}-is-fully-visible`]]: isFullyVisible,
        [$style['is-hit']]: isHit,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellite.scss" />
