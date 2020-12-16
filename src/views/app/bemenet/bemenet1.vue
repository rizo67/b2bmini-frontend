<style  scoped>
.app-footer {
    margin-top: 2rem;
    background: #eee;
    padding: 1.25rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: none;
}
</style>
<template>
  <div class="main-content">
    <breadcumb :page="'Bemenet1'" :folder="'Bemenet'" />
        <h2>Bemeneti adatok</h2>
<b-form @submit.prevent="osszeg">
  <b-row>
    <b-col cols="2">
    <b-form-input v-model="szam_a" placeholder="szám A"></b-form-input>
    </b-col>
  </b-row>
  <b-row>
    <b-col cols="2">
    <b-form-input v-model="szam_b" placeholder="szám B"></b-form-input>
    </b-col>
    <b-col cols="2">
    <p style="color: red;">SZORZAT EREDMÉNYE: {{ szorzat }}</p>
    <p style="color: red;">KIJELÖLÉS EREDMÉNYE: {{ kijelolt.email }}</p>
    </b-col>
  </b-row>
    <b-button variant="primary" class="btn-rounded d-none d-sm-block"
        @click="osszeg(szam_a, szam_b)"
            ><i class="i-Add-User text-white mr-2"> </i>Összead
          </b-button>
</b-form>

    <div class="mt-2">Eredmény: {{ eredmeny }}</div>
    <p style="color: red;"> Eredmény: {{ szam_a }} + {{ szam_b }} = {{ eredmeny }}</p>
    <p style="color: red;">{{ visszajelzes }}</p>

        
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      szam_a:null,
      szam_b:null,
      };
  },
  computed: {
    ...mapGetters(['eredmeny', 'visszajelzes', 'szorzat','kijelolt',])
  },

methods:{
  ...mapActions(['setEredmeny']),
  osszeg(szam_a, szam_b) {

    var c = parseInt(szam_a) + parseInt(szam_b)

    this.setEredmeny(c);

    //var e = this.a;
    //var g = this.b;
    //var c = e + g;
    console.log(c,this.eredmeny);
    
    

  },

},

};
</script>
