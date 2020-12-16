<template>
  <div>
    <router-view></router-view>

    <!-- <customizer></customizer> -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  created () {

    this.autologin();
      //this.$store.dispatch('tryAutoLogin')
    },

  computed: {
    ...mapGetters(["getThemeMode"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    }
  },

  methods: {
    ...mapActions(['tryAutoLogin']),

    autologin() { this.tryAutoLogin()}
  },

  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "Gull",
      // all titles will be injected into this template
      titleTemplate: "%s | Gull - Vuejs Admin Dashboard Template",
      bodyAttrs: {
        class: [this.themeName, "text-left"]
      },
      htmlAttrs: {
        dir: this.rtl
      }
    };
  }
};
</script>

<style>
</style>


