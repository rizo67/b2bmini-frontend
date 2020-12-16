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
    <breadcumb :page="'Blank'" :folder="'Pages'" />
        <h2>Helló anyone</h2>
        <div>
    <b-form-input v-model="szoveg" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ szoveg }}</div>
    <p style="color: red;"> {{ szoveg }} </p>
  </div>
  
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-container>

  </div>
</template>
<script>
export default {
  data() {
    return {
      szoveg:'',
      types: [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color'
        ],

         

    };
  }
};
</script>
