<template>
  <modal-element :name="modalName" :title="$t('underwater.pause')">
    <menu-group
      @handleResumeClick="onResumeClick"
      @handleRestartClick="onRestartClick"
      @handleIntroClick="onIntroClick"
      @handleHomeClick="onHomeClick"
    />
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
    onItemClick(stateChanger) {
      stateChanger();
      this.$modal.hide(this.modalName);
    },
    onResumeClick() {
      this.onItemClick(() => this.setIsGamePaused(false));
    },
    onRestartClick() {
      this.onItemClick(() => this.restartGame());
    },
    onIntroClick() {
      this.onItemClick(() => this.restartGame(game.hasIntroState));
    },
    onHomeClick() {
      this.onItemClick(() => this.restartGame(game.hasPristineState));
    },
  },
};
</script>
