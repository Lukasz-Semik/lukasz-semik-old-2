<template>
  <modal-element :name="modalName" :title="$t('underwater.pause')">
    <menu-group @handleResumeClick="onResumeClick" @handleRestartClick="onRestartClick" />
  </modal-element>
</template>

<script>
import { mapMutations } from 'vuex';

import { game } from '@/store/game';
import { ModalElement } from '@/components/Elements';

import MenuGroup from './MenuGroup/MenuGroup';

const { setIsGamePaused, restartGame } = game;

export default {
  name: 'GamePause',
  components: {
    ModalElement,
    MenuGroup,
  },
  created() {
    if (window) {
      window.onblur = () => {
        this.setIsGamePaused(true);
        this.$modal.show(this.modalName);
      };
    }
  },
  computed: {
    modalName() {
      return 'pause-modal';
    },
  },
  methods: {
    ...mapMutations({ setIsGamePaused, restartGame }),
    onResumeClick() {
      this.setIsGamePaused(false);
      this.$modal.hide(this.modalName);
    },
    onRestartClick() {
      this.restartGame();
      this.$modal.hide(this.modalName);
    },
  },
};
</script>
