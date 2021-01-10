<template>
  <div class="main-content">
    <breadcumb :page="'TERMÉKEK'" :folder="'Terméklista'" />
    <!-- <div class="wrapper"> -->

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
      <b-form-input v-model="keres" placeholder="Email keresés"></b-form-input>
      <b-button variant="primary" class="btn-rounded d-none d-sm-block" @click="tokenpr()"
            ><i class="i-Add-User text-white mr-2"> </i>token
          </b-button>
      <b-button variant="primary" class="btn-rounded d-none d-sm-block" @click="kiszall()"
            ><i class="i-Add-User text-white mr-2"> </i>KILÉP
          </b-button>

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
            ><i class="i-Add-User text-white mr-2"> </i>Új termék hozzáadása
          </b-button>

          <b-modal id="modal-1" title="Új cikk felvitele">
            <b-form @submit.prevent="createProduct">
              <b-form-group
                id="input-group-1"
                label="Cikkszám:"
                label-for="input-1"
                description="Saját vagy gyári cikkszám felvitele"
              >
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="artnumber"
                  required
                  placeholder="Cikkszám"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Megnevezés"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="text"
                  v-model="title"
                  required
                  placeholder="Termék neve"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Leírás"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  type="text"
                  v-model="description"
                  required
                  placeholder="A termék rövid leírása"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Ár"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  type="number"
                  v-model="price"
                  required
                  placeholder="Ár"
                  
                ></b-form-input>
              </b-form-group>
            <!--
              <b-form-group
                id="input-group-3"
                label="Ország:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  type="text"
                  v-model="country"
                  :options="orszag"
                  required
                  
                ></b-form-select>
              </b-form-group>
            -->
              <b-form-group
                id="input-group-7"
                label="Kategóriák"
                label-for="input-7"
              >
              <v-select
                  id="input-7"
                  type="text"
                  v-model="category"
                  :options="productcategories"
                  multiple
                  placeholder="Válaszd ki a kategóriát"                 
                ></v-select>
                <!--
                <b-form-tags
                  id="input-7"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="category"
                  required                  
                ></b-form-tags>
                -->
              </b-form-group>

              <b-form-group
                id="input-group-8"
                label="Márka"
                label-for="input-8"
              >
                <b-form-tags
                  id="input-8"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="brand"
                  required                  
                ></b-form-tags>
              </b-form-group>


<!--      <div class="btn btn-primary"> -->
     <!--Styled -->
<!--          <b-form-file
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
-->             
    <!--<input class="btn btn-primary" type="file" ref="file" v-on:change="handleFileUpload()">-->
<!--
            <br><br>

              <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="terms"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >Elfogadom a felhasználási feltételeket
                  </b-form-checkbox>                 
                </b-form-checkbox-group>
              </b-form-group>
-->
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


      <b-modal id="modal-productupdate" title="Cikk módosítása">
            <b-form @submit.prevent="updateProduct">
              <b-form-group
                id="input-group-1"
                label="Cikkszám:"
                label-for="input-1"
                description="Saját vagy gyári cikkszám felvitele"
              >
                <b-form-input
                  id="input-1"
                  type="text"
                  v-model="editproductsor.artnumber"
                  required
                  placeholder="Cikkszám"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Megnevezés"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="text"
                  v-model="editproductsor.title"
                  required
                  placeholder="Termék neve"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Leírás"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  type="text"
                  v-model="editproductsor.description"
                  required
                  placeholder="A termék rövid leírása"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Ár"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  type="number"
                  v-model="editproductsor.price"
                  required
                  placeholder="Ár"
                  
                ></b-form-input>
              </b-form-group>
            
              <b-form-group
                id="input-group-3"
                label="Kategóriák:"
                label-for="input-3"
              >
                <v-select
                  id="input-3"
                  type="text"
                  v-model="editproductsor.category"
                  :options="productcategories"
                  multiple
                  placeholder="Válaszd ki a kategóriát"                 
                ></v-select>
              </b-form-group>

              <b-form>
    
</b-form>
            
              <b-form-group
                id="input-group-7"
                label="Kategóriák"
                label-for="input-7"
              >
                <b-form-tags
                  id="input-7"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="editproductsor.category"
                  required                  
                ></b-form-tags>
              </b-form-group>

              <b-form-group
                id="input-group-8"
                label="Márka"
                label-for="input-8"
              >
                <b-form-tags
                  id="input-8"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="editproductsor.brand"
                  required                  
                ></b-form-tags>
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
          
            <button class="btn btn-primary" @click="productdelete(kivalasztott)">Törlés</button>
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

          <b-modal id="modal-image" title="Kép felvitele">
            <b-form @submit.prevent="productimageSubmit">
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
            <br><br>
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
            <a @click="$bvModal.show('modal-productupdate', updateproduct(productsor=props.row))">
              <i style="cursor:pointer" class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-3', deleteproduct(productsor=props.row))">
              <i style="cursor:pointer" class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-image', updateproduct(productsor=props.row))">
              <i style="cursor:pointer" class="i-File-JPG text-25 text-primary"></i>
              {{ props.row.edit }}</a
            >

          </span>
          <span v-else-if="props.column.field == '_id'">
            <a @click="$bvModal.show('modal-image', updateproduct(productsor=props.row))">
              <div style="cursor:pointer" class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="props.row.imageUrl"
                  @click="$bvModal.show('modal-productupdate', updateproduct(productsor=props.row))"
                  
                >
                {{ props.row._id }}
              </div>
            </a>
          </span>
          <span v-else-if="props.column.field == 'artnumber'">
            <a>{{ props.row.artnumber }}</a>
          </span>
          <span v-else-if="props.column.field == 'category'">
            <a>{{ props.row.category ? props.row.category.toString() : '' }}</a>
          </span>
          <span v-else-if="props.column.field == 'brand'">
            <a>{{ props.row.brand ? props.row.brand.toString() : '' }}</a>
          </span>
          
        </template>
      </vue-good-table>
    </b-card>


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
      baseurl:'http://localhost:3000/',
      orszag: ["Magyarország", "Ausztria", "Szolvákia", "UK"],
      title:'',
      description:'',
      price:'',
      artnumber:'',
      category:[],
      brand:[],
      allbrand:[],
      email:"",
      _id:  '',
      title: '',
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
      editusersor:[],
      usersor:[],
      editproductsor:[],
      productsor:[],
      result:[],
      message:"",
      valaszalert:"",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      productcategories:[],
      
      

        mezo:[
            "Fotó", "Id", "Email", "Kor", "Ország", "Hobbi"
              ],

        columns: [

        {
          label: "Id",
          field: "_id"
        },
        
        {
          label: "Cikkszám",
          field: "artnumber"
        
        },

        {
          label: "Megnevezés",
          field: "title"
        },

        {
          label: "Leírás",
          field: "description"
        },
        
        {
          label: "Ár",
          field: "price"
        },

        {
          label: "Kategóriák",
          field: "category",
        },

        {
          label: "Márka",
          field: "brand",
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
          this.productList();
          this.loadCategory();
        },


  methods: {
    ...mapActions(['setKijelolt', 'logout']),

    addFile() {
      console.log("hello");
    },

    tokenpr() {
      console.log(this.idToken)
    },


    kiszall() {
      var szoveg = "siker"
      console.log(szoveg)
      this.logout();

      //this.$router.push("/app/sessions/signIn");
    },

    productList() {
            axios.get('/product/allproducts',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.products = response.data;
                this.uzenet = this.products.message;
                this.totalRows = this.products.posts.length;
                this.lista = this.products.posts;
                
                console.log(this.valasz);
                console.log(this.totalRows);
                console.log(this.lista);      
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
              let productcategories = [];           
                for (var k in this.allbrand) {
                  if (this.allbrand[k].brand) {
                    this.productcategories.push(this.allbrand[k].brand)
            }
          }                
                console.log(this.productcategories);    
            })                
            .catch(function (error) {
                console.log(error);
            });
          },       */

          loadCategory() {
            axios.get('/product/allcategories',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.category = response.data;
                this.allcategory = this.category.posts;
              let productcategories = [];           
                for (var k in this.allcategory) {
                  if (this.allcategory[k].title) {
                    this.productcategories.push(this.allcategory[k].title)
            }
          }                
                console.log(this.productcategories);    
            })                
            .catch(function (error) {
                console.log(error);
            });
          },       

    keresone() {
            axios.post('/feed/oneuser', {
              keresoneuser:this.keres            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.users = response.data;   
                this.lista = this.users.posts;  
                console.log(this.users);              
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },    

    createProduct() {
            axios.post('/product/createproduct', {  
                title:this.title,
                description:this.description,
                price:this.price,
                artnumber:this.artnumber,
                category:this.category,
                brand:this.brand
                
            },
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
              this.productList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          

    updateProduct(editproductsor) {
            axios.put('/product/updateproduct', { 
                keresid:this.editproductsor._id, 
                title:this.editproductsor.title,
                description:this.editproductsor.description,
                price:this.editproductsor.price,
                artnumber:this.editproductsor.artnumber,
                category:this.editproductsor.category,
                brand:this.editproductsor.brand
            },
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
              this.$bvModal.hide('modal-productupdate');
              this.productList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          


    onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value:"",
          
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },

      onSubmit() {
            var formData = new FormData();
            var self=this;            
            formData.append('email', this.email);
            formData.append('age', this.age);
            formData.append('password', this.password);
            formData.append('confirmPassword', this.confirmPassword);
            formData.append('country', this.country);

            for( var i = 0; i < this.hobbies.length; i++ ){
            this.hobbi = this.hobbies[i];
            formData.append('hobbies[' + i + ']', this.hobbi);};
            //formData.append('hobbies', this.hobbies);
            formData.append('terms', this.terms);
            formData.append('image', this.file);
            axios.post('/feed/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
            .then(akarmi => {
              console.log('SUCCESS!!');
             this.$bvModal.hide('modal-1');
              this.adatkeres();
              //console.log(this.hobbies);
        })
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },

      onSubmit2(editusersor) {
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editusersor._id)
            formData.append('email', this.editusersor.email);
            formData.append('age', this.editusersor.age);
            formData.append('password', this.editusersor.password);
            formData.append('confirmPassword', this.editusersor.confirmPassword);
            formData.append('country', this.editusersor.country);

            for( var i = 0; i < this.editusersor.hobbies.length; i++ ){
            this.hobbi = this.editusersor.hobbies[i];
            formData.append('hobbies[' + i + ']', this.hobbi);};

            //formData.append('hobbies', this.editusersor.hobbies);
            formData.append('terms', this.editusersor.terms);
            formData.append('image', this.file);
            axios.put('/feed/updateoneuser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
            .then(response => {
                
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;
              
                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-2');
                this.adatkeres();
                //this.showAlert(this.valaszalert);
                this.$bvModal.show('modal-alert');
            })  
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },


      /*productimageSubmit(editproductsor) {
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editproductsor._id)
            formData.append('image', this.file);
            axios.put('/product/saveproductimage', formData, {
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
                this.productList();
                //this.showAlert(this.valaszalert);
                this.$bvModal.show('modal-alert');
            })  
                  
            .catch(function (error) {
                console.log(error);
            });
            
        },*/

      async productimageSubmit(editproductsor) {
          let delimgname = 'products/'+Date.now()+'_'+this.file.name;
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
            axios.put('/product/saveproductimageurl', {
                keresid:this.editproductsor._id, 
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
                this.productList();
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

        updateproduct(productsor) {
      
          this.editproductsor=this.productsor;
          this.setKijelolt(productsor);
          //this.kivalasztott=this.usersor;  
          console.log(this.productsor);       
    },

        productdelete(kivalasztott) {
            axios.post('/product/deleteproduct', {
              keresid:this.kivalasztott._id 
              },
            {
              headers: {
                'Authorization': 'Bearer '+ this.idToken,
                'Content-Type': 'application/json'
              }              //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            })            
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;

                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-3');
                this.productList();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        deleteproduct(productsor) {
          this.kivalasztott=this.productsor; 
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
