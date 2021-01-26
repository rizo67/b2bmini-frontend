<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
            <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'pages' }"
            class="nav-item"
            data-item="pages"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Double-Tap"></i>
              <span class="nav-text">Profil</span>
            </a>
            <div class="triangle"></div>
          </li>
       
          <li
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'sessions' }"
            data-item="sessions"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Administrator"></i>
              <span class="nav-text">Sessions</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menü -->
        <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'uzenetek' }"
            class="nav-item"
            data-item="uzenetek"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Double-Tap"></i>
              <span class="nav-text">Üzenetek</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menű vége Sidebar -->

        <!-- Saját menü Products (Termékek) -->
        <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'products' }"
            class="nav-item"
            data-item="products"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Shop"></i>
              <span class="nav-text">Termékek</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menű vége Termékekt Sidebar -->

        <!-- Saját menü Suppliers (Szállítók) -->
        <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'suppliers' }"
            class="nav-item"
            data-item="suppliers"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Shop"></i>
              <span class="nav-text">Szállítók</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menű vége Suppliers Sidebar -->

        <!-- Saját menü Bemenet-->
        <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'bemenet' }"
            class="nav-item"
            data-item="bemenet"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Double-Tap"></i>
              <span class="nav-text">Bemenet</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menű vége Bemenet Sidebar -->

        <!-- Saját menü Kimenet -->
        <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'kimenet' }"
            class="nav-item"
            data-item="kimenet"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Double-Tap"></i>
              <span class="nav-text">Kimenet</span>
            </a>
            <div class="triangle"></div>
          </li>
        <!-- Saját menű vége Kimenet Sidebar -->

        </ul>
      </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="sidebar-left-secondary ps rtl-ps-none"
    >
      <div ref="sidebarChild">
        <!-- Submenu Dashboards -->
      
       
        
        <ul
          class="childNav d-none"
          data-parent="sessions"
          :class="{ 'd-block': selectedParentMenu == 'sessions' }"
        >
          <li v-if="!auth" class="nav-item">
            <router-link tag="a" class to="/app/sessions/signIn">
              <i class="nav-icon i-Checked-User"></i>
              <span class="item-name">Sign in</span>
            </router-link>
          </li>
          <li v-if="!auth" class="nav-item">
            <router-link tag="a" class to="/app/sessions/signUp">
              <i class="nav-icon i-Add-User"></i>
              <span class="item-name">Sign up</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link tag="a" class to="/app/sessions/forgot">
              <i class="nav-icon i-Find-User"></i>
              <span class="item-name">Forgot</span>
            </router-link>
          </li>
        </ul>

<!-- Submenu saját minta -->
        <ul
          class="childNav d-none"
          data-parent="uzenetek"
          :class="{ 'd-block': selectedParentMenu == 'uzenetek' }"
        >
          <li class="nav-item">
            <router-link tag="a" class to="/app/uzenetek/uzenet">
              <i class="nav-icon i-Checked-User"></i>
              <span class="item-name">Üzenetek</span>
            </router-link>
          </li>
          
        </ul>
<!-- Submenu saját minta vége -->

          <ul
          class="childNav d-none"
          data-parent="products"
          :class="{ 'd-block': selectedParentMenu == 'products' }"
            >
          <li class="nav-item">
            <router-link tag="a" class to="/app/products/productlist">
              <i class="nav-icon i-Receipt-4"></i>
              <span class="item-name">Terméklista</span>
            </router-link>
          </li>          
          </ul>

          <ul
          class="childNav d-none"
          data-parent="products"
          :class="{ 'd-block': selectedParentMenu == 'products' }"
            >
          <li class="nav-item">
            <router-link tag="a" class to="/app/products/productadmin">
              <i class="nav-icon i-Receipt-4"></i>
              <span class="item-name">Termék admin</span>
            </router-link>
          </li>          
          </ul>

          <ul
          class="childNav d-none"
          data-parent="suppliers"
          :class="{ 'd-block': selectedParentMenu == 'suppliers' }"
            >
          <li class="nav-item">
            <router-link tag="a" class to="/app/suppliers/supplierslist">
              <i class="nav-icon i-Receipt-4"></i>
              <span class="item-name">Szállítók</span>
            </router-link>
          </li>          
          </ul>


          <ul
          class="childNav d-none"
          data-parent="bemenet"
          :class="{ 'd-block': selectedParentMenu == 'bemenet' }"
            >
          <li class="nav-item">
            <router-link tag="a" class to="/app/bemenet/bemenet1">
              <i class="nav-icon i-Checked-User"></i>
              <span class="item-name">Bemenet 1</span>
            </router-link>
          </li>          
          </ul>

          <ul
          class="childNav d-none"
          data-parent="kimenet"
          :class="{ 'd-block': selectedParentMenu == 'kimenet' }"
            >
          <li class="nav-item">
            <router-link tag="a" class to="/app/kimenet/kimenet1">
              <i class="nav-icon i-Checked-User"></i>
              <span class="item-name">Kimenet 1</span>
            </router-link>
          </li>          
          </ul>

        <ul
          class="childNav d-none"
          data-parent="others"
          :class="{ 'd-block': selectedParentMenu == 'pages' }"
        >

         <li class="nav-item">
            <router-link tag="a" class to="/app/pages/ownprofile">
              <i class="nav-icon i-Error-404-Window"></i>
              <span class="item-name">Saját profil</span>
            </router-link>
          </li>
<!-- Submenu saját elem -->
        <li v-if="auth" class="nav-item">
            <router-link tag="a" class to="/app/pages/blanky">
              <i class="nav-icon i-Error-404-Window"></i>
              <span class="item-name">Felhasználók</span>
            </router-link>
          </li>
<!-- Submenu saját vége-->

<!-- Submenu saját elem adminusers-->
        <li v-if="auth" class="nav-item">
            <router-link tag="a" class to="/app/pages/adminusers">
              <i class="nav-icon i-Error-404-Window"></i>
              <span class="item-name">Adminisztrátorok</span>
            </router-link>
          </li>
<!-- Submenu saját vége adminusers-->
          <li class="nav-item">
            <router-link tag="a" class to="/app/pages/error">
              <i class="nav-icon i-Error-404-Window"></i>
              <span class="item-name">Not Found</span>
            </router-link>
          </li>
        
          <!-- <li class="nav-item">
            <a href="blank.html" class="open">
              <i class="nav-icon i-File-Horizontal"></i>
              <span class="item-name">Blank Page</span>
            </a>
          </li>-->
        </ul>
      </div>
    </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties", "isAuthenticated"]),
    auth () {
        return this.isAuthenticated
      },
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),

    handleWindowResize() {
      //  console.log('not working is Mobile');
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];

      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboards";
      }
    },
    toggleSubMenu(e) {
      let childrens = this.$refs.sidebarChild.children;
      let parent = e.target.dataset.item;

      this.selectedParentMenu = parent;

      this.changeSecondarySidebarPropertiesViaMenuItem(true);
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>
