import axios from '../../axios-auth';
import globalAxios from 'axios';
import router from "../../router";

const state = {
    idToken: null,
    userId: null,
    user: null,
    organizationid: null,
    loading: false,
    
  };
  
  const mutations = {
    //signUserUp: (state, authData) => {state.user = authData;},
    authUser: (state, userData) => {
        state.idToken = userData.token
        state.userId = userData.userId
        state.organizationid = userData.organizationid
    },
    storeUser: (state, user) => {
        state.user = user
        },
    clearAuthData: (state) => {
          state.idToken = null;
          state.userId = null;
          state.organizationid = null;
        },
    setLoading: (state, status) => {
        state.loading = status
        },
  };

  const actions = {

    setLogoutTimer: ({commit}, expirationTime) => {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1, )
    },

    signUserUp: ({ commit, dispatch}, authData) => {
        axios.post('/feed/signupuser', {           
            name: authData.name,
            email: authData.email,
            password: authData.password,
            confirmPassword: authData.confirmPassword,
            organizationid: state.organizationid,
            role:'admin',
            vendor:'supplier',
            
        })
        .then(res => {
            console.log(res)
        commit('authUser', {
        token: res.data.token,
        userId: res.data.userId,
        organizationid: res.data.organizationid, 
        
      })
      const now = new Date()
      const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      localStorage.setItem('organizationid', res.data.organizationid)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch('setLogoutTimer', res.data.expiresIn)
      //dispatch('storeUser', authData)
      router.push({ name: 'login' })
        })
    .catch(error => console.log(error))   
    },

    loginUser: ({ commit, dispatch}, authData) => { //authData az a payload, amit formaData-ként adtam át
      commit("setLoading", true);
      axios.post('/feed/loginuser', {                      
            email: authData.email,
            password: authData.password,
                     
        })
        .then(res => {
            console.log(res)
            console.log(typeof res.data.expiresIn)
            console.log(res.data.expiresIn * 1)
            //console.log(expirationTime)
            const now = new Date()
            const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1)
            const date = new Date(now.getTime())
            console.log(date)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('organizationid', res.data.organizationid)
            localStorage.setItem('expirationDate', expirationDate)
        commit('authUser', { // itt hívom meg az a mutációt (authUser)
        token: res.data.token,
        userId: res.data.userId,
        organizationid: res.data.organizationid,
      })
      commit("setLoading", false);
      dispatch('setLogoutTimer', res.data.expiresIn)
      router.replace({name:'users'})
      //dispatch('storeUser', authData)
        })
    .catch(error => console.log(error))   
    },

    tryAutoLogin: ({commit}) => {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId,
        
      })
      router.replace({name:'users'}) //az oldal frissítése után ide tér vissza, ha van érvényes token
      
    },

    logout: ({commit}) => {
      
      commit('clearAuthData') 
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('organizationid')
      router.replace({name:'users'})
    },


  };



    /* ezt a részt nem használom, lekérés pl. a blanky komponensben van benne.
    storeUser ({commit, state}, userData) {
        if (!state.idToken) {
          return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
          .then(res => console.log(res))
          .catch(error => console.log(error))
      },

    fetchUser ({commit, state}) {
        if (!state.idToken) {
          return
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
          .then(res => {
            console.log(res)
            const data = res.data
            const users = []
            for (let key in data) {
              const user = data[key]
              user.id = key
              users.push(user)
            }
            console.log(users)
            commit('storeUser', users[0])
          })
          .catch(error => console.log(error))
      }

  };*/
  
  const getters = {
    //eredmeny: state => state.eredmeny,
    user: state => state.user,
    userId: state => state.userId,
    idToken: state => state.idToken,
    organizationid: state => state.organizationid,
    isAuthenticated: state => state.idToken !== null,
    loading: state => state.loading,
    //userId: rootState => rootState.userId,
    
   
  };
  
  export default {
    state,
    //rootState,
    getters,
    actions,
    mutations
  };