<template>
  <div :class="$style['wrapper']">
    <div :class="$style['symbol-wrapper']">
      <slot/>
    </div>

    <p :class="valueWrapperClassName">
      <span v-if="!isXHidden" data-test="multiplier" :class="$style['multiplier']">x</span>
      <span data-test="value" :class="valueClassName" @transitionend="onTransitionEnd">
        {{
        value
        }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CounterElement',
  props: {
    value: {
      type: Number,
      required: true,
    },
    isXHidden: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal > oldVal) {
        this.isAdding = true;
      }
    },
  },
  data() {
    return {
      isAdding: false,
    };
  },
  methods: {
    onTransitionEnd() {
      if (this.isAdding) {
        this.isAdding = false;
      }
    },
  },
  computed: {
    valueWrapperClassName() {
      const { $style, color } = this;

      return {
        [$style['value-wrapper']]: true,
        [$style[`is-${color}`]]: true,
      };
    },
    valueClassName() {
      const { $style, isAdding } = this;

      return {
        [$style['value']]: true,
        [$style['is-adding']]: isAdding,
      };
    },
  },
};
</script>

<style lang="scss" module src="./CounterElement.scss" />
