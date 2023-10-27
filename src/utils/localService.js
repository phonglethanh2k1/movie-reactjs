export let userLocalStorage = {
  get: () => {
    let dataJson = localStorage.getItem("USER");
    return JSON.parse(dataJson);
  },
  set: (user) => {
    let dataJson = JSON.stringify(user);
    localStorage.setItem("USER", dataJson);
  },
  remove: () => {
    localStorage.removeItem("USER");
  },
};
export let listDsGheLocalStorage = {
  get: () => {
    let dataJson = localStorage.getItem("DSGHE");
    return JSON.parse(dataJson);
  },
  set: (dsGhe) => {
    let dataJson = JSON.stringify(dsGhe);
    localStorage.setItem("DSGHE", dataJson);
  },
};
