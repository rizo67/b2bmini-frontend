const state = {
    eredmeny:0,
    visszajelzes:'',
    szorzat:0,
    kijelolt:'',
  };
  
  const getters = {
    eredmeny: state => state.eredmeny,
    visszajelzes: state => state.visszajelzes,
    szorzat: state => state.szorzat,
    kijelolt: state => state.kijelolt,
  };
  
  const actions = {
    setEredmeny: ({ commit }, payload) => {commit('setEredmeny', payload);},
    setVisszajelzes: ({ commit }, payload) => {commit('setVisszajelzes', payload);},
    setSzorzat: ({ commit }, payload) => {commit('setSzorzat', payload);},
    setKijelolt: ({ commit }, payload) => {commit('setKijelolt', payload);}

  };
  
  const mutations = {
    setEredmeny: (state, payload) => {state.eredmeny = payload;},
    setVisszajelzes: (state, payload) => {state.visszajelzes = payload;},
    setSzorzat: (state, payload) => {state.szorzat = payload;},
    setKijelolt: (state, payload) => {state.kijelolt = payload;}
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };