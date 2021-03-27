import axios from '../../axios-auth';

const state = {
    lddusername: null, //loaded user name
    lddcompanyname: null, //loaded company name belong to user
    lddrole:null,
    lddvendor:null,
    uzenet:"",
  };

const mutations = {
    setlddusersdata: (state, payload) => {
      state.lddusername = payload.lddusername
      state.lddrole = payload.lddrole
    },
    setlddcompanyname: (state, payload) => {state.lddcompanyname = payload;},
    updateroles: (state, payload) => {
      state.lddrole = payload.lddrole
      state.lddvendor = payload.lddvendor
      state.uzenet = payload.uzenet
    },
    //setlddrole: (state, payload) => {state.lddrole = payload;},
  };

const actions = {
    setlddusersdata: ({commit, state, rootState}) => {
      const loadeduserid = rootState.auth.userId;
      const idToken = rootState.auth.idToken;
      axios.post('/feed/findloadeduser', {
        keresid:loadeduserid           
      },
      {headers: {
              'Authorization': 'Bearer '+ idToken,
              'Content-Type': 'application/json'
          }
       })
      .then(response => {
        commit('setlddusersdata', {
          lddusername:response.data.posts.name,
          lddrole:response.data.posts.role
        }); //így kell írni, ha egyszerre több adat van (objektumban)
        //commit('setlddrole', response.data.posts.role); így kell írni, ha csak egy adat van
        
                  
      })      
      .catch(function (error) {
          console.log(error);
      });   
    },

    setlddcompanyname: ({commit, state, rootState}) => {
      //if (!rootState.auth.organizationid) {
      const loadedorgid = rootState.auth.organizationid;
      const idToken = rootState.auth.idToken;
      console.log(rootState.auth.organizationid);
      
      axios.post('/supplier/loadedsupplier', {
        keresid:loadedorgid           
      },
      {headers: {
              'Authorization': 'Bearer '+ idToken,
              'Content-Type': 'application/json'
          }
       })
      .then(response => {
        console.log(response.data);
        commit('setlddcompanyname', response.data.posts.title);
        console.log(response.data.posts);
      
        
      })      
      .catch(function (error) {
          console.log(error);
      }); 
    //}
    },


    logoutprofile: ({ commit }) => {
      commit('setlddusersdata', {
        lddusername:null,
        lddrole:null}
      );
      commit('setlddcompanyname', null);
    },

    /*sendrole: ({ commit }, formData) => {
      console.log("adatok átadva")
      console.log(formData.role);
      console.log(formData.vendor);
      
    },*/

    sendrole: ({commit, state, rootState}, formData) => {
      //const loadeduserid = rootState.auth.userId;
      const idToken = rootState.auth.idToken;
      axios.post('/feed/updateuserrole', {
        //keresid:loadeduserid,
        role:formData.role,  
        vendor:formData.vendor,        
        orgname:formData.orgname, 
        orgtaxnumber:formData.orgtaxnumber,
        lastname:formData.lastname,
        firstname:formData.firstname,
        orgcity:formData.orgcity,
        orgstreet:formData.orgstreet,
        orgzipcode:formData.orgzipcode,
        orgother:formData.orgother,
        orgphone:formData.orgphone,
      },
      {headers: {
              'Authorization': 'Bearer '+ idToken,
              'Content-Type': 'application/json'
          }
       })
      .then(response => {
        commit('updateroles', {
          lddrole:response.data.posts.role,
          lddvendor:response.data.posts.vendor,
          uzenet: response.data.message,
          
                
          
        }); //így kell írni, ha egyszerre több adat van (objektumban)
        //commit('setlddrole', response.data.posts.role); így kell írni, ha csak egy adat van
        console.log(uzenet)
                  
      })      
      .catch(function (error) {
          console.log(error);
      });   
    },

  };
  


const getters = {
    lddusername: state => state.lddusername,
    lddcompanyname: state => state.lddcompanyname,
    lddrole: state => state.lddrole,
    messageback: state => state.uzenet,
  };
  

export default {
    state,
    getters,
    actions,
    mutations
  };