import axios from '../../axios-auth';

const state = {
    lddusername: null, //loaded user name
    lddcompanyname: null, //loaded company name belong to user
  };

const mutations = {
    setlddusername: (state, payload) => {state.lddusername = payload;},
    setlddcompanyname: (state, payload) => {state.lddcompanyname = payload;},
  };

const actions = {
    setlddusername: ({commit, state, rootState}) => {
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
        commit('setlddusername', response.data.posts.name);
        console.log(state.lddusername);  
                  
      })      
      .catch(function (error) {
          console.log(error);
      });   
    },
    
    setlddcompanyname: ({ commit }, payload) => {commit('setlddcompanyname', payload);},
    logoutprofile: ({ commit }) => {commit('setlddusername', null);},

  };

const getters = {
    lddusername: state => state.lddusername,
    lddcompanyname: state => state.lddcompanyname,
  };
  

export default {
    state,
    getters,
    actions,
    mutations
  };