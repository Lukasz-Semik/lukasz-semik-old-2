<template>
  <modal-element :name="modalName" :title="$t('underwater.pause')">
    <menu-group @handleResumeClick="onResumeClick" />
  </modal-element>
</template>

<script>
import { mapMutations } from 'vuex';

import { game } from '@/store/game';
import { ModalElement } from '@/components/Elements';

import MenuGroup from './MenuGroup/MenuGroup';

const { setIsGamePaused } = game;

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
    ...mapMutations({ setIsGamePaused }),
    onResumeClick() {
      this.setIsGamePaused(false);
      this.$modal.hide(this.modalName);
    },
  },
};
</script>
