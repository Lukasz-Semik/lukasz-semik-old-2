<template>
  <div :class="$style['wrapper']">
    <fish-element :style="{ right: fishRightPosition }"/>
    <div :class="healthBarClassName"></div>
  </div>
</template>

<script>
import FishElement from '@/assets/underwater/fish.svg';

export default {
  name: 'HealthBar',
  components: {
    FishElement,
  },
  props: {
    healthPoints: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      initialHealthPoints: 100,
    };
  },
  computed: {
    fishRightPosition() {
      return `${this.initialHealthPoints - this.healthPoints}%`;
    },
    healthBarClassName() {
      const { $style, healthPoints } = this;

      return {
        [$style['health-bar']]: true,
        [$style['is-yellow']]: healthPoints < 60,
        [$style['is-red']]: healthPoints < 30,
      };
    },
  },
};
</script>

<style lang="scss" module src="./HealthBar.scss" />
