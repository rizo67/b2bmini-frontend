<template>
  <div class="main-content">
    <breadcumb :page="'Pages'" :folder="'Felhasználók'" />
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
            ><i class="i-Add-User text-white mr-2"> </i>Új partner hozzáadása
          </b-button>

          <b-modal id="modal-1" title="Adatok szerkesztése">
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                id="input-group-name"
                label="Név:"
                label-for="input-name"
                description="Név megadása"
              >
                <b-form-input
                  id="input-name"
                  type="text"
                  v-model="name"
                  required
                  placeholder="Enter name"
                  
                ></b-form-input>
              </b-form-group>  

              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Enter email"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Kor:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="age"
                  required
                  placeholder="Írja be a korát"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Jelszó:"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  type="password"
                  v-model="password"
                  required
                  placeholder="új jelszó megadása"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Új jelszó megerősítése:"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  type="password"
                  v-model="confirmPassword"
                  required
                  placeholder="új jelszó megerősítése"
                  
                ></b-form-input>
              </b-form-group>

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

              <b-form-group
                id="input-group-7"
                label="Hobbik:"
                label-for="input-7"
              >
                <b-form-tags
                  id="input-7"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="hobbies"
                  required                  
                ></b-form-tags>
              </b-form-group>

              <!--<b-form-group
                id="input-group-10"
                label="Kép feltöltése:"
                label-for="input-10"
              >
                <b-form-file
                  type="file"
                    id="input-10"
                    ref="file"
                    v-model="file"                    
                    v-on:change="handleFileUpload()"
                    :state="Boolean(file)"
                    placeholder="Fájl kiválasztása"
                    drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group> -->

<!--
        <div>  
          <h5>Új hobbi hozzáadása</h5>
          <b-button variant="primary" class="btn-rounded d-none d-sm-block" @click="onAddHobby" type="button">Új hobbi</b-button>
          <hr>
            <div>
              <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value">
              <b-button variant="primary" class="btn-rounded d-none d-sm-block" @click="onDeleteHobby(hobbyInput.id)" type="button">X</b-button>
            </div>  
          </div>    
          <b-container fluid>
            <b-row 
              v-for="(hobbyInput, index) in hobbyInputs"
              :key="hobbyInput.id">
              <b-col>
                <label :for="hobbyInput.id">Hobbi #{{ index }}</label>
              </b-col>
            <b-col cols="6">
              <b-form-input 
              :id="hobbyInput.id"
              
              v-model="hobbyInput.value"
            >                     
            </b-form-input>
              
              </b-col>
              <b-col><b-button variant="primary" class="btn-rounded d-none d-sm-block" @click="onDeleteHobby(hobbyInput.id)" type="button">x</b-button></b-col>
            </b-row>
          </b-container>
      </div> -->  

      <div class="btn btn-primary">
     <!--Styled -->
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
              
    <!--<input class="btn btn-primary" type="file" ref="file" v-on:change="handleFileUpload()">-->

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


      <b-modal id="modal-2" title="Adatok szerkesztése">
            <b-form @submit.prevent="onSubmit2">

              <b-form-group
                id="input-group-name"
                label="Név:"
                label-for="input-name"
                description="Név megadása"
              >
                <b-form-input
                  id="input-name"
                  type="text"
                  v-model="editusersor.name"
                  required
                  placeholder="Enter name"
                  
                ></b-form-input>
              </b-form-group>  

              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  v-model="editusersor.email"
                  required
                  placeholder="Enter email"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Kor:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="editusersor.age"
                  required
                  placeholder="Írja be a korát"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-5"
                label="Jelszó:"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  type="password"
                  v-model="editusersor.password"
                  required
                  placeholder="új jelszó megadása"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Új jelszó megerősítése:"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  type="password"
                  v-model="editusersor.confirmPassword"
                  required
                  placeholder="új jelszó megerősítése"
                  
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Ország:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  type="text"
                  v-model="editusersor.country"
                  :options="orszag"
                  required
                  
                ></b-form-select>
              </b-form-group>

            <b-form-group
                id="input-group-7"
                label="Hobbik:"
                label-for="input-7"
              >
                <b-form-tags
                  id="input-7"
                  input-id="tags-pills"
                  tag-variant="primary"
                  tag-pills
                  size="md"
                  separator=" "
                  
                  v-model="editusersor.hobbies"
                  required                  
                ></b-form-tags>
              </b-form-group> 
       
<div class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="baseurl+editusersor.imageUrl"
                  
                />
                
              </div>

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

              <b-form-group id="input-group-4">
                <b-form-checkbox-group id="checkboxes-4">
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="editusersor.terms"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >Elfogadom a felhasználási feltételeket
                  </b-form-checkbox>                 
                </b-form-checkbox-group>
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
          
            <button class="btn btn-primary" @click="userdelete(kivalasztott)">Törlés</button>
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

        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <a @click="$bvModal.show('modal-2', updateuser(usersor=props.row))">
              <i style="cursor:pointer" class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.edit }}</a
            >
            <a  @click="$bvModal.show('modal-3', deleteuser(usersor=props.row))">
              <i style="cursor:pointer" class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.edit }}</a
            >

          </span>
          <span v-else-if="props.column.field == '_id'">
            <a href="">
              <div class="ul-widget-app__profile-pic">
                <img
                  class="profile-picture avatar-sm mb-2 rounded-circle img-fluid"
                  :src="baseurl+props.row.imageUrl"
                  @click="$bvModal.show('modal-2', updateuser(usersor=props.row))"
                  
                >
                {{ props.row._id }}
              </div>
            </a>
          </span>
          <span v-else-if="props.column.field == 'email'">
            <a>{{ props.row.email ? props.row.email.toString() : '' }}</a>
          </span>
          <span v-else-if="props.column.field == 'hobbies'">
            <a>{{ props.row.hobbies ? props.row.hobbies.toString() : '' }}</a>
          </span>
          
        </template>
      </vue-good-table>
    </b-card>

<!--<p>Your email address: {{ lista[2].email }}</p>-->

<!-- működik, jó mintának
<b-table :fields="mezo" :items="lista">
    <template v-slot:cell(Fotó)="data">
        <i><img :src="baseurl+data.item.imageUrl"  width="80" height="80"></i>
    </template>

    <template v-slot:cell(Id)="data">
        <i>{{ data.item._id }}</i>
    </template>
    <template v-slot:cell(Email)="data">
        <i>{{ data.item.email }}</i>
    </template>
    <template v-slot:cell(Kor)="data">
        <i>{{ data.item.age }}</i>
    </template>
    <template v-slot:cell(Ország)="data">
        <i>{{ data.item.country }}</i>
    </template>
    <template v-slot:cell(Hobbi)="data">
        <i>{{ data.item.hobbies }}</i>
    </template>
</b-table> -->

<!-- működik sima bootstrap tábla
<table class="table mb-0 table-responsive" style="color:grey">
              <thead class="bg-light">
                <tr>
                  <th scope="col" class="border-0">Email</th>
                  <th scope="col" class="border-0">Kor</th>
                  <th scope="col" class="border-0">Ország</th>
                  <th scope="col" class="border-0">Hobbi</th>
                  <th scope="col" class="border-0">Fotó url</th>
                  <th scope="col" class="border-0">Fotó</th>
                </tr>
              </thead>
    <tr v-for="item in lista" :key="item.id">
      <td>{{ item.email }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.country }}</td> 
      <td>{{ item.hobbies }}</td>
      <td>{{ item.imageUrl }}</td>
      <img :src="baseurl+item.imageUrl" style="with:20px; height:30px"/> Vagy így: <img :src="'http://localhost:3000/'+item.imageUrl"/> 
    </tr>
</table> -->

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
      orszag: ["Magyarország", "Ausztria", "Szolvákia", "UK"],
      email:"",
      _id:"",
      title:"",
      content:"",
      imageUrl:"",
      name:"",
      creator: {},
      createdAt: {},
      age:null,
      users:[],
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
      result:[],
      message:"",
      valaszalert:"",
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      
      

        mezo:[
            "Fotó", "Id", "Email", "Kor", "Ország", "Hobbi"
              ],

        columns: [

        {
          label: "Id",
          field: "_id"
        },
        {
          label: "Név",
          field: "name"
        },
        {
          label: "Email",
          field: "email"
        },

        {
          label: "Ország",
          field: "country"
        },
        {
          label: "Hobbi",
          field: "hobbies"
        
        },
        {
          label: "Kor",
          field: "age"
        },
        {
          label: "Joining Date",
          field: "join"
        },
        {
          label: "Salary",
          field: "salary"
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
          this.adatkeres();
        },


  methods: {
    ...mapActions(['setKijelolt']),

    addFile() {
      console.log("hello");
    },

    adatkeres() {
            axios.get('/feed/allusers',
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.users = response.data;
                this.uzenet = this.users.message
                this.totalRows = this.users.posts.length;
                this.lista = this.users.posts;
                
                console.log(this.totalRows);
                console.log(this.lista);      
                console.log(this.uzenet);    
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
            formData.append('name', this.name);            
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
            formData.append('name', this.editusersor.name);
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
                    'Authorization': 'Bearer '+ this.idToken,
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

        handleFileUpload(){
            this.file = this.$refs.file.files;
        },

        updateuser(usersor) {
      
          this.editusersor=this.usersor;
          this.setKijelolt(usersor);
          //this.kivalasztott=this.usersor;  
          console.log(this.usersor);       
    },

        userdelete(kivalasztott) {
            axios.post('/feed/deleteuser', {
              keresid:this.kivalasztott._id            //keresoneuser az nem más mint a "kulcs vagy key", amire hivatkozva adjuk át az argumentumot, adatot, amit keresünk.
            },
             {headers: {
                    'Authorization': 'Bearer '+ this.idToken,
                    'Content-Type': 'multipart/form-data'
                }
            
             })
            .then(response => {
                this.uzenet = response.data;
                this.valaszalert = this.uzenet.message;

                console.log(this.valaszalert);    
                this.$bvModal.hide('modal-3');
                this.adatkeres();   
                this.$bvModal.show('modal-alert');            
            })
            
            .catch(function (error) {
                console.log(error);
            });
          },     

        deleteuser(usersor) {
          this.kivalasztott=this.usersor; 
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
