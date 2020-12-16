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
    <breadcumb :page="'Kimenet1'" :folder="'Kimenet'" />
        <h2>Eredmény oldal</h2>
        <p>{{ eredmeny }}</p>
        <p>{{ idToken }}</p>
        <p>{{ szoveg }}</p>
        <p style="color: red;">KIJELÖLÉS EREDMÉNYE: {{ kijelolt.email }}, {{ kijelolt.country }} </p>

  <b-form @submit.prevent="szorzas">
  <b-row>
    <b-col cols="2">
    <b-form-input v-model="szam_a" placeholder="szám A"></b-form-input>
    </b-col>
  </b-row>
  <b-row>
    <b-col cols="2">
    <b-form-input v-model="szam_b" placeholder="szám B"></b-form-input>
    </b-col>
  </b-row>
    <b-button variant="primary" class="btn-rounded d-none d-sm-block"
        @click="szorzas(szam_a, szam_b)"
            ><i class="i-Add-User text-white mr-2"> </i>Szorzás
          </b-button>
</b-form>




  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      szoveg:'',
      szam_a:null,
      szam_b:null,
      };
},

computed: {
    ...mapGetters(['eredmeny', 'kijelolt', 'idToken'])
  },

watch: {
        eredmeny() {
          console.log('hahaó');
            this.jelzes();
     
        }
},

methods:{
    ...mapActions(['setVisszajelzes', 'setSzorzat']),

    jelzes() {
      
        var szoveg = "siker";
      this.setVisszajelzes(szoveg);
      console.log(this.szoveg);


    },

    szorzas(szam_a, szam_b) {

    var c = parseInt(szam_a) * parseInt(szam_b)

    this.setSzorzat(c);
    console.log(c,);
    },




},


};
</script>
