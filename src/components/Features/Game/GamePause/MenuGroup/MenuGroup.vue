<template>
  <div :class="$style['menu-wrapper']">
    <button
      data-test="resume-button"
      :class="$style['menu-item']"
      @click="$emit('handleResumeClick')"
    >
      {{ $t('underwater.resume') }}
    </button>

    <button
      data-test="restart-button"
      :class="$style['menu-item']"
      @click="$emit('handleRestartClick')"
    >
      {{ $t('underwater.restart') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'MenuGroup',
};
</script>

<style lang="scss" module src="./MenuGroup.scss" />
