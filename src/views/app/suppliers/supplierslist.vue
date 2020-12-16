<template>
  <div class="main-content">
    <breadcumb :page="'SZÁLLÍTÓK'" :folder="'Szállítók'" />
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
        <div class="card-title">Szállítók</div>
        <b-form-input v-model="keres" placeholder="Szállító keresés, kis és nagybetű megkülönböztetve"></b-form-input>
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
            ><i class="i-Add-User text-white mr-2"> </i>Új szállító hozzáadása
          </b-button>

          <b-modal id="modal-1" title="Új szállító felvitele">
            <b-form @submit.prevent="createSupplier">
              
              <b-form-group
                id="input-group-supplier"
                label="Szállító neve"
                label-for="input-supplier"
              >
                <b-form-input
                  id="input-supplier"
                  type="text"
                  v-model="title"
                  required
                  placeholder="Új szállító felvitele"
                  
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


      <b-modal id="modal-supplierUpdate" title="Szállító módosítása">
            <b-form @submit.prevent="updateSupplier">
              
              <b-form-group
                id="input-group-supplierupdate"
                label="Módosítás"
                label-for="input-supplierupdate"
              >
                <b-form-input
                  id="input-supplierupdate"
                  type="text"
                  v-model="editsuppliersor.title"
                  required
                  placeholder="Szállító neve"
                  
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
          
            <button class="btn btn-primary" @click="deleteSupplier(kivalasztott)">Törlés</button>
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
            <b-form @submit.prevent="supplierimageSubmit">
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
            <a @click="$bvModal.show('modal-supplierUpdate', supplierupdate(suppliersor=props.row))">
              <i style="cursor:pointer" class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-3', supplierdelete(suppliersor=props.row))">
              <i style="cursor:pointer" class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-image', supplierupdate(suppliersor=props.row))">
              <i style="cursor:pointer" class="i-File-JPG text-25 text-primary"></i>
              {{ props.row.edit }}</a
            >

          </span>
          <span v-else-if="props.column.field == '_id'">
            <a @click="$bvModal.show('modal-image', supplierupdate(suppliersor=props.row))">
              <div style="cursor:pointer" class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="baseurl+props.row.imageUrl"
                  @click="$bvModal.show('modal-supplierUpdate', supplierupdate(suppliersor=props.row))"
                  
                >
                {{ props.row._id }}
              </div>
            </a>
          </span>
          <span v-else-if="props.column.field == 'artnumber'">
            <a>{{ props.row.artnumber }}</a>
          </span>
          <span v-else-if="props.column.field == 'supplier'">
            <a>{{ props.row.supplier ? props.row.supplier.toString() : '' }}</a>
          </span>
          <span v-else-if="props.column.field == 'brand'">
            <a>{{ props.row.brand ? props.row.brand.toString() : '' }}</a>
          </span>
          
        </template>
      </vue-good-table>
</b-card>    
    
    

    </b-col>
    <b-col lg="6" xl="6" md="12">
        <b-card>
        <div class="card-title">Márkák</div>
        <b-form-input v-model="keres" placeholder="Márka keresés"></b-form-input>
      <hr>

        </b-card>

    </b-col>
  </b-row>


</div>
</template>


<script>
import axios from '../../../axios-auth';
import { mapGetters, mapActions } from 'vuex';
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
      title:'',
      description:'',
      price:'',
      artnumber:'',
      supplier:[],
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
      editsuppliersor:[],
      suppliersor:[],
      result:[],
      message:"",
      valaszalert:"",
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
          label: "Szállító",
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
          this.supplierList();
          //this.brandList();
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


    supplierList() {
            axios.get('/supplier/allsupplier',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.supplier = response.data;
                
                this.uzenet = this.supplier.message;
                this.totalRows = this.supplier.posts.length;
                this.lista = this.supplier.posts;
                
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
            axios.post('/supplier/onesupplier', {
              keresonesupplier:this.keres            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.onesupplier = response.data;   
                this.lista = this.onesupplier.posts;  
                console.log(this.onesupplier);              
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },    

    createSupplier() {
            axios.post('/supplier/createsupplier', {  
                title:this.title,
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
              this.supplierList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          

    updateSupplier(editsuppliersor) {
            axios.put('/supplier/updatesupplier', { 
                keresid:this.editsuppliersor._id, 
                title:this.editsuppliersor.title,
                
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
              this.$bvModal.hide('modal-supplierUpdate');
              this.supplierList(); 
              this.$bvModal.show('modal-alert');           
            })
            .catch(function (error) {
                console.log(error);
            });
          },          

      supplierimageSubmit(editsuppliersor) {
            var formData = new FormData();
            var self=this;
            formData.append('keresid', this.editsuppliersor._id)
            formData.append('image', this.file);
            axios.put('/supplier/savesupplierimage', formData, {
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
                this.supplierList();
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

        supplierupdate(suppliersor) {
      
          this.editsuppliersor=this.suppliersor;
          this.setKijelolt(suppliersor);
          //this.kivalasztott=this.usersor;  
          console.log(this.suppliersor);       
    },

        deleteSupplier(kivalasztott) {
            axios.post('/supplier/deletesupplier', {
              keresid:this.kivalasztott._id},
              {
              headers: {
                'Authorization': 'Bearer '+ this.idToken,
                'Content-Type': 'application/json'
              }           
            })
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;

                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-3');
                this.supplierList();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        supplierdelete(suppliersor) {
          this.kivalasztott=this.suppliersor; 
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