<template>
  <div class="main-content">
    <breadcumb :page="'TERMÉK ADMIN'" :folder="'Termékadmin'" />
    <!-- <div class="wrapper"> -->


  <b-row>
    <b-col lg="6" xl="6" md="12">
        <div>
            <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
          >            
            <p>
               {{ valaszalert }} 
            </p>
            <b-progress
              variant="success"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
            </b-alert>
        </div>

        
        <b-card>
        <div class="card-title">Termék kategóriák</div>
        <b-form-input v-model="keres" placeholder="Kategória keresés, kis és nagybetű megkülönböztetve"></b-form-input>
      <hr>

        <vue-good-table
        :columns="columns"
        :line-numbers="false"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records'
        }"
        styleClass="tableOne vgt-table"
        :rows="lista"  
      > <!-- :rows -ba kerül átadásra a "lista" nevű tömb, ami az axios-ból érkezik, ami tartalmazza a táblázat elemeit (sorait)-->
        <div slot="table-actions" class="mb-3">
          <b-button variant="primary" class="btn-rounded d-none d-sm-block" v-b-modal.modal-1
            ><i class="i-Add-User text-white mr-2"> </i>Új kategória hozzáadása
          </b-button>

          <b-modal id="modal-1" title="Új kategória felvitele">
            <b-form @submit.prevent="createCategory">
              
              <b-form-group
                id="input-group-productcategory"
                label="Kategória neve"
                label-for="input-productcategory"
              >
                <b-form-input
                  id="input-productcategory"
                  type="text"
                  v-model="title"
                  required
                  placeholder="Új kategória felvitele"
                  
                ></b-form-input>
              </b-form-group>

              <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
            </b-form>

      <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">
          Bezár
          </b-button>    
      </template>           
          </b-modal>


      <b-modal id="modal-categoryupdate" title="Cikk módosítása">
            <b-form @submit.prevent="updateCategory">
              
              <b-form-group
                id="input-group-productcategoryupdate"
                label="Módosítás"
                label-for="input-productcategoryupdate"
              >
                <b-form-input
                  id="input-productcategoryupdate"
                  type="text"
                  v-model="editcategorysor.title"
                  required
                  placeholder="Kategória neve"
                  
                ></b-form-input>
              </b-form-group>

              <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
            </b-form>

      <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">
          Bezár
          </b-button>    
      </template>           
          </b-modal>

          <b-modal id="modal-3" title="Biztosan törölni szeretné ezt a tételt?">
          
            <button class="btn btn-primary" @click="deleteCategory(kivalasztott)">Törlés</button>
            <template v-slot:modal-footer="{cancel}">
                <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="cancel()">Mégsem</b-button>  
          </template>
          
          </b-modal>  

          <b-modal id="modal-alert">                     
            <p>
               {{ valaszalert }} 
            </p>
            <template v-slot:modal-footer="{cancel}">
                <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="cancel()">OK</b-button>  
          </template>          
          </b-modal>  

          <b-modal id="modal-categoryimage" title="Kép felvitele">
            <b-form @submit.prevent="categoryimageSubmit">
              <div class="btn btn-primary">
            <!-- Styled -->
                <b-form-file
                type="file"            
                ref="file"
                v-model="file"           
                v-on:change="handleFileUpload()"
                :state="Boolean(file)"
                placeholder="Fájl kiválasztása"
                drop-placeholder="Drop file here..."
               ></b-form-file>
            <div class="mt-3">Kiválasztott fájl neve: {{ file ? file.name : '' }}</div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
          </b-form>
          <template v-slot:modal-footer="{cancel}">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">Bezár</b-button>    
          </template>   
          </b-modal>  
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <a @click="$bvModal.show('modal-categoryupdate', categoryupdate(categorysor=props.row))">
              <i style="cursor:pointer" class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-3', categorydelete(categorysor=props.row))">
              <i style="cursor:pointer" class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-categoryimage', categoryupdate(categorysor=props.row))">
              <i style="cursor:pointer" class="i-File-JPG text-25 text-primary"></i>
              {{ props.row.edit }}</a
            >

          </span>
          <span v-else-if="props.column.field == '_id'">
            <a @click="$bvModal.show('modal-categoryimage', categoryupdate(categorysor=props.row))">
              <div style="cursor:pointer" class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="props.row.imageUrl"
                  @click="$bvModal.show('modal-categoryupdate', categoryupdate(categorysor=props.row))"
                  
                >
                {{ props.row._id }}
              </div>
            </a>
          </span>
          <span v-else-if="props.column.field == 'title'">
            <a>{{ props.row.title ? props.row.title.toString() : '' }}</a>
          </span>
          
        </template>
      </vue-good-table>
</b-card>    
    
<!-- Brand (márkák) blokk kezdete -->

    </b-col>
    <b-col lg="6" xl="6" md="12">
        <b-card>
        <div class="card-title">Márkák</div>
        <b-form-input v-model="keres" placeholder="Márka keresés"></b-form-input>
      <hr>
        <vue-good-table
        :columns="columns"
        :line-numbers="false"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records'
        }"
        styleClass="tableOne vgt-table"
        :rows="brandlista"  
      > <!-- :rows -ba kerül átadásra a "lista" nevű tömb, ami az axios-ból érkezik, ami tartalmazza a táblázat elemeit (sorait)-->
        <div slot="table-actions" class="mb-3">
          <b-button variant="primary" class="btn-rounded d-none d-sm-block" v-b-modal.modal-createbrand
            ><i class="i-Add-User text-white mr-2"> </i>Új márka hozzáadása
          </b-button>

          <b-modal id="modal-createbrand" title="Új márka felvitele">
            <b-form @submit.prevent="createBrand">
              
              <b-form-group
                id="input-group-productbrand"
                label="Márka neve"
                label-for="input-productbrand"
              >
                <b-form-input
                  id="input-productbrand"
                  type="text"
                  v-model="title"
                  required
                  placeholder="Új márka felvitele"
                  
                ></b-form-input>
              </b-form-group>

              <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
            </b-form>

      <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">
          Bezár
          </b-button>    
      </template>           
          </b-modal>


      <b-modal id="modal-brandupdate" title="Cikk módosítása">
            <b-form @submit.prevent="updateBrand">
              
              <b-form-group
                id="input-group-productbrandupdate"
                label="Módosítás"
                label-for="input-productbrandupdate"
              >
                <b-form-input
                  id="input-productbrandupdate"
                  type="text"
                  v-model="editbrandsor.title"
                  required
                  placeholder="Márka neve"
                  
                ></b-form-input>
              </b-form-group>

              <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
            </b-form>

      <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">
          Bezár
          </b-button>    
      </template>           
          </b-modal>

          <b-modal id="modal-delbrand" title="Biztosan törölni szeretné ezt a tételt?">
          
            <button class="btn btn-primary" @click="delBrand(kivalasztott)">Törlés</button>
            <template v-slot:modal-footer="{cancel}">
                <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="cancel()">Mégsem</b-button>  
          </template>
          
          </b-modal>  

          <b-modal id="modal-delimgbrand" title="Biztosan törölni szeretné ezt a képet?">
          
            <button class="btn btn-primary" @click="deljustimgBrand(kivalasztott)">Törlés</button>
            <template v-slot:modal-footer="{cancel}">
                <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="cancel()">Mégsem</b-button>  
          </template>
          
          </b-modal>  
          <!--
          <b-modal id="modal-alert">                     
            <p>
               {{ valaszalert }} 
            </p>
            <template v-slot:modal-footer="{cancel}">
            <b-button size="sm" variant="danger" @click="cancel()">OK</b-button>  
          </template>          
          </b-modal>
          -->
          <b-modal id="modal-image" title="Kép felvitele">
            <b-form @submit.prevent="brandimageSubmit">
              <div class="btn btn-primary">
            <!-- Styled -->
                <b-form-file
                type="file"            
                ref="file"
                v-model="file"           
                v-on:change="handleFileUpload()"
                :state="Boolean(file)"
                placeholder="Fájl kiválasztása"
                drop-placeholder="Drop file here..."
               ></b-form-file>
            <div class="mt-3">Kiválasztott fájl neve: {{ file ? file.name : '' }}</div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">Mentés</button>
                </div>
              </div>
          </b-form>
          <template v-slot:modal-footer="{cancel}">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="danger" @click="cancel()">Bezár</b-button>    
          </template>   
          </b-modal>  
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <a @click="$bvModal.show('modal-brandupdate', brandupdate(brandsor=props.row))">
              <i style="cursor:pointer" class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-delbrand', branddelete(brandsor=props.row))">
              <i style="cursor:pointer" class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-image', brandupdate(brandsor=props.row))">
              <i style="cursor:pointer" class="i-File-JPG text-25 text-primary"></i>
              {{ props.row.edit }}</a
            >

          </span>
          <span v-else-if="props.column.field == '_id'">
            <!-- <a @click="$bvModal.show('modal-image', brandupdate(brandsor=props.row))"> -->
              <div style="cursor:pointer" class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="props.row.imageUrl"
                  @click="$bvModal.show('modal-delimgbrand', branddelete(brandsor=props.row))"                  
                >
                <!--  "baseurl+props.row.imageUrl"  (amikor a szerveren tárolt képet jelenítünk meg, akkor ez az url)-->
                {{ props.row._id }}
              </div>
            </a>
          </span>
          <span v-else-if="props.column.field == 'title'">
            <a>{{ props.row.title ? props.row.title.toString() : '' }}</a>
          </span>
          
        </template>
      </vue-good-table>
        </b-card>

    </b-col>
  </b-row>


</div>
</template>


<script>
import axios from '../../../axios-auth';
import { mapGetters, mapActions } from 'vuex';
import firebase from '@/firebase';
//import { VueGoodTable } from 'vue-good-table';
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Task Manager"
  },
components: {
  //VueGoodTable,
},

  data() {
    return {
      baseurl:'http://localhost:3000/dev',
      title:'',
      description:'',
      price:'',
      artnumber:'',
      category:[],
      brand:[],
      allbrand:[],
      email:"",
      _id:  '',
      content: '',
      imageUrl: '',
      creator: {},
      createdAt: {},
      age:null,
      products:[],
      posts:[],
      hobbies:[],
      hobbi:[],
      file:null,
      files:[],
      image:"",
      country:"",
      data:[],
      user:"",
      id:"",
      valasz:"",
      uzenet:"",
      stripe:true,
      border:true,
      keres:"",      
      kivalasztott:{},
      name:"",
      password:"",
      confirmPassword:"",
      hobbyInputs:[],
      terms: false,
      defaultPagination: 1,
      totalRows:1,
      perPage: 3,
      total:0,
      value:1,
      pageCount:0,
      pages:[],
      pageOptions: [5, 10, 15],
      page:1,
      lista:[],
      brandlista:[],
      editusersor:[],
      usersor:[],
      editcategorysor:[],
      editbrandsor:[],
      brandsor:[],
      result:[],
      message:"",
      valaszalert:"",
      valaszalert2:"",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      markak:[],
      productcategories:[],
        columns: [
        {
          label: "Id",
          field: "_id"
        },
        {
          label: "Név",
          field: "title"
        }, 
        {
          label: "Szerkeszt",
          field: "edit",
          html: true,
          tdClass: "text-right",
          thClass: "text-right"
        }
      ],
      
    };
  },

computed: {
    ...mapGetters(['idToken'])
  }, 

watch: {
        keres: function() {
            this.keresone();                      
        },
        edituser_id() {
            console.log(this.edituser_id._id)
           
        },
        
},


created () {
          this.categoryList();
          this.brandList();
        },


  methods: {
    ...mapActions(['setKijelolt']),

    addFile() {
      console.log("hello");
    },


    cucu() {
       let productcategories = [];           
              for (var k in this.lista) {
                if (this.lista[k].title) {
                   this.productcategories.push(this.lista[k].title)
    }}
    
    },


    categoryList() {
            axios.get('/product/allcategories',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.category = response.data;
                
                this.uzenet = this.category.message;
                this.totalRows = this.category.posts.length;
                this.lista = this.category.posts;
                
                console.log(this.valasz);
                console.log(this.totalRows);
                console.log(this.lista);      
                console.log(this.uzenet);    
            })            
            .catch(function (error) {
                console.log(error);
            });
          }, 

    brandList() {
            axios.get('/product/allbrands',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.brand = response.data;
                
                this.uzenet = this.brand.message;
                this.totalRows = this.brand.posts.length;
                this.brandlista = this.brand.posts;
                
                console.log(this.valasz);
                console.log(this.totalRows);
                console.log(this.brandlista);      
                console.log(this.uzenet);    
            })            
            .catch(function (error) {
                console.log(error);
            });
          }, 

    /*      loadBrand() {
            axios.get('/product/allproducts')
            .then(response => {
                this.products = response.data;
                this.allbrand = this.products.posts;
              let markak = [];           
                for (var k in this.allbrand) {
                  if (this.allbrand[k].brand) {
                    this.markak.push(this.allbrand[k].brand)
            }
          }                
                console.log(this.markak);    
            })                
            .catch(function (error) {
                console.log(error);
            });
          },       */

          loadBrand() {
            axios.get('/feed/allusers',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.products = response.data;
                this.allbrand = this.products.posts;
              let markak = [];           
                for (var k in this.allbrand) {
                  if (this.allbrand[k].hobbies) {
                    this.markak.push(this.allbrand[k].hobbies)
            }
          }                
                console.log(this.markak);    
            })                
            .catch(function (error) {
                console.log(error);
            });
          },       

    keresone() {
            axios.post('/product/onecategory', {
              keresonecategory:this.keres            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.onecategory = response.data;   
                this.lista = this.onecategory.posts;  
                console.log(this.onecategory);              
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },    

    createCategory() {
            axios.post('/product/createcategory', {  
                title:this.title,},
                {
              headers: {
                'Authorization': 'Bearer '+ this.idToken,
                'Content-Type': 'application/json'
              }
                
            })
            .then(response => { 
              console.log('SUCCESS!!');
              this.uzenet = response.data;
              this.valaszalert = this.uzenet.message 
              this.$bvModal.hide('modal-1');
              this.categoryList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },  
          
    createBrand() {
            axios.post('/product/createbrand', {  
                title:this.title,},
                {
              headers: {
                'Authorization': 'Bearer '+ this.idToken,
                'Content-Type': 'application/json'
              }
                
            })
            .then(response => { 
              console.log('SUCCESS!!');
              this.uzenet = response.data;
              this.valaszalert = this.uzenet.message 
              this.$bvModal.hide('modal-createbrand');
              this.brandList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          

    updateCategory(editcategorysor) {
            axios.put('/product/updatecategory', { 
                keresid:this.editcategorysor._id, 
                title:this.editcategorysor.title,
                
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json'
                }
            
             })
            .then(response => { 
              console.log('SUCCESS!!');
              this.uzenet = response.data;
              this.valaszalert = this.uzenet.message 
              this.$bvModal.hide('modal-categoryupdate');
              this.categoryList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          }, 
          
      updateBrand(editbrandsor) {
            axios.put('/product/updatebrand', { 
                keresid:this.editbrandsor._id, 
                title:this.editbrandsor.title,
                
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json'
                }
            
             })
            .then(response => { 
              console.log('SUCCESS!!');
              this.uzenet = response.data;
              this.valaszalert = this.uzenet.message 
              this.$bvModal.hide('modal-brandupdate');
              this.brandList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          

     /* categoryimageSubmit(editcategorysor) {
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editcategorysor._id)
            formData.append('image', this.file);
            axios.put('/product/savecategoryimage', formData, {
                headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
              })
            .then(response => {
                
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;
              
                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-image');
                this.categoryList();
                //this.showAlert(this.valaszalert);
                this.$bvModal.show('modal-alert');
            })  
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },*/

      async categoryimageSubmit(editcategorysor) {
          let delimgname = 'categoryimage/'+Date.now()+'_'+this.file.name;
          let ref = firebase.storage().ref().child(delimgname);
          let task = ref.put(this.file).then(snapshot => {
            return snapshot.ref.getDownloadURL()
          }).then(downloadURL => {
            return downloadURL;
          }).catch(error => {
            console.log('Error uploading image.', error);
          });
          let url = await task; // ezt az url-t kell küldeni a backend részére
          //let delimgname = ref.child;//'brandimage/'+Date.now()+'_'+this.file.name;
          console.log('file url:', url);
          console.log('image delete name:', delimgname);
            /*
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editbrandsor._id)
            formData.append('image', this.file); */
            axios.put('/product/savecategoryimageurl', {
                keresid:this.editcategorysor._id, 
                image:url,
                deleteimagename:delimgname,},
                {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json' //'multipart/form-data' file küldése esetén
                }
              })
            .then(response => {
                
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;
              
                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-categoryimage');
                this.categoryList();
                //this.showAlert(this.valaszalert);
                this.$bvModal.show('modal-alert');
            })  
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },  

      async brandimageSubmit(editbrandsor) {
          let delimgname = 'brandimage/'+Date.now()+'_'+this.file.name;
          let ref = firebase.storage().ref().child(delimgname);
          let task = ref.put(this.file).then(snapshot => {
            return snapshot.ref.getDownloadURL()
          }).then(downloadURL => {
            return downloadURL;
          }).catch(error => {
            console.log('Error uploading image.', error);
          });
          let url = await task; // ezt az url-t kell küldeni a backend részére
          //let delimgname = ref.child;//'brandimage/'+Date.now()+'_'+this.file.name;
          console.log('file url:', url);
          console.log('image delete name:', delimgname);
            /*
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editbrandsor._id)
            formData.append('image', this.file); */
            axios.put('/product/savebrandimageurl', {
                keresid:this.editbrandsor._id, 
                image:url,
                deleteimagename:delimgname,},
                {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json' //'multipart/form-data' file küldése esetén
                }
              })
            .then(response => {
                
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;
              
                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-image');
                this.brandList();
                //this.showAlert(this.valaszalert);
                this.$bvModal.show('modal-alert');
            })  
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },

        handleFileUpload(){
            this.file = this.$refs.file.files;
        },

        categoryupdate(categorysor) {
      
          this.editcategorysor=this.categorysor;
          this.setKijelolt(categorysor);
          //this.kivalasztott=this.usersor;  
          console.log(this.categorysor);       
    },

        brandupdate(brandsor) {
      
          this.editbrandsor=this.brandsor;
          this.setKijelolt(brandsor);
          //this.kivalasztott=this.usersor;  
          console.log(this.brandsor);       
    },

        deleteCategory(kivalasztott) {
            axios.post('/product/deletecategory', {
              keresid:this.kivalasztott._id            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json'
                }
            
             })
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;

                this.torolt = response.data;
                this.valaszalert2 = this.torolt.posts.deleteimagename;
                let desertRef = firebase.storage().ref().child(this.valaszalert2);
                desertRef.delete().then(function() {
                // File deleted successfully
                }).catch(function(error) {
                // Uh-oh, an error occurred!
                });
                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-3');
                this.categoryList();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        categorydelete(categorysor) {
          this.kivalasztott=this.categorysor; 
        },

        deljustimgBrand(kivalasztott) {
            axios.post('/product/deljustimgbrand', {
              keresid:this.kivalasztott._id            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json'
                }           
             })
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;
                this.torolt = response.data;
                this.valaszalert2 = this.torolt.posts.deleteimagename;
                // ide jön a firestore kép törlése rész
                // Create a reference to the file to delete
                  let desertRef = firebase.storage().ref().child(this.valaszalert2);
                // Delete the file
                    desertRef.delete().then(function() {
                // File deleted successfully
                }).catch(function(error) {
                // Uh-oh, an error occurred!
                });
                console.log('Törölt kép:', this.valaszalert2);    
                this.$bvModal.hide('modal-delimgbrand');
                this.brandList();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        delBrand(kivalasztott) {
            axios.post('/product/deletebrand', {
              keresid:this.kivalasztott._id            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'application/json'
                }
            
             })
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;

                this.torolt = response.data;
                this.valaszalert2 = this.torolt.posts.deleteimagename;
                // ide jön a firestore kép törlése rész
                // Create a reference to the file to delete
                  let desertRef = firebase.storage().ref().child(this.valaszalert2);
                // Delete the file
                    desertRef.delete().then(function() {
                // File deleted successfully
                }).catch(function(error) {
                // Uh-oh, an error occurred!
                });
                console.log(this.valaszalert);
                console.log('Törölt brand:', this.valaszalert2);    
                this.$bvModal.hide('modal-delbrand');
                this.brandList();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        branddelete(brandsor) {
          this.kivalasztott=this.brandsor; 
        },

        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown;
          },
        showAlert() {
          this.dismissCountDown = this.dismissSecs;
          },



  }
};
</script>
<style >
</style>