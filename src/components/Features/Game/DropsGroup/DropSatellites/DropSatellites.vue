<template>
  <button v-if="isVisible" :class="className" @click="onHit"/>
</template>

<script>
export default {
  props: {
    isVisible: {
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
      const { $style, index, isHit } = this;

      return {
        [$style['button']]: true,
        [$style[`button--${index}`]]: true,
        [$style['is-hit']]: isHit,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellites.scss" />
