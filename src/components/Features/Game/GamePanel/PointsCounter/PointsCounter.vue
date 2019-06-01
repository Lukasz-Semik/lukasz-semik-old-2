<template>
  <!-- <div :class="$style=['wrapper']"> -->
  <div :class="$style['wrapper']">
    <div :class="$style['coin']">Ł</div>
    <p :class="$style['value']">x {{ gameScore }}</p>
  </div>
</template>

<script>
export default {
  name: 'PointsCounter',
  props: {
    gameScore: {
      type: Number,
      required: true,
    },
  },
};
</script>


<style lang="scss" module src="./PointsCounter.scss" />
