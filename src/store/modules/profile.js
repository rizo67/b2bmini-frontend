import axios from '../../axios-auth';

const state = {
    lddusername: null, //loaded user name
    lddcompanyname: null, //loaded company name belong to user
    lddrole:null
  };

const mutations = {
    setlddusersdata: (state, payload) => {
      state.lddusername = payload.lddusername
      state.lddrole = payload.lddrole
    },
    setlddcompanyname: (state, payload) => {state.lddcompanyname = payload;},
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
        commit('setlddcompanyname', response.data.posts.title);
        
      })      
      .catch(function (error) {
          console.log(error);
      });   
    },


    logoutprofile: ({ commit }) => {
      commit('setlddusersdata', {
        lddusername:null,
        lddrole:null}
      );
      commit('setlddcompanyname', null);
    },

  };
  


const getters = {
    lddusername: state => state.lddusername,
    lddcompanyname: state => state.lddcompanyname,
    lddrole: state => state.lddrole,
  };
  

export default {
    state,
    getters,
    actions,
    mutations
  };