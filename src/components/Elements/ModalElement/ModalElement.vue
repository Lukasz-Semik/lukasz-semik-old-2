<template>
  <modal
    :classes="$style['modal-box']"
    :width="600"
    :height="'80%'"
    :name="name"
    :click-to-close="shouldCloseOnOutsideClick"
  >
    <div :class="$style['modal-inner-wrapper']">
      <paper-graphic/>

      <div :class="$style['modal-content-wrapper']">
        <h2 data-test="modal-title" :class="$style['title']">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </modal>
</template>

<script>
import PaperGraphic from '@/assets/shared/paper.svg';

export default {
  name: 'ModalElement',
  components: {
    PaperGraphic,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    shouldCloseOnOutsideClick: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickOutside() {
      this.$modal.hide(this.name);
    },
  },
};
</script>


<style lang="scss">
.v {
  &--modal-overlay {
    background: rgba(0, 0, 0, 0.8);
  }

  &--modal-background-click {
    @include flex-center;

    z-index: 9999999;
  }
}
</style>

<style lang="scss" module src="./ModalElement.scss" /> 