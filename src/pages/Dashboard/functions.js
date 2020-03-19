import { apiADM, apiCities } from "../../services/api";
import { useState } from "react";
export const [isLessThan500, setIsLessThan500] = useState(false);
export const [cities, setCities] = useState([]);
export const [citySelected, setCitySelected] = useState("");
export const [user, setUser] = useState({});
export const [politics, setPolitics] = useState([]);
export const [filterPoliticSelected, setFilterPoliticSelected] = useState(0);
export const [checkPolitic, setCheckPolitic] = useState([]);
export const [indexPolitic, setIndexPolitic] = useState(0);
export const [managers, setManagers] = useState([]);
export const [indexManager, setIndexManager] = useState(0);
export const [checkManager, setCheckManager] = useState([]);
export const [hireds, setHireds] = useState([]);
export const [indexHired, setIndexHired] = useState(0);
export const [checkHired, setCheckHired] = useState([]);
export const [openDialogFilter, setOpenDialogFilter] = useState(false);
export const [openDialogAddHired, setOpenDialogAddHired] = useState(false);
export const [openDialogAddManager, setOpenDialogAddManager] = useState(false);
export const [openDialogAddPolitic, setOpenDialogAddPolitic] = useState(false);
export const [openDialogDelete, setOpenDialogDelete] = useState({
  open: false,
  list: [],
  type: ""
});

export const fetchCities = async () => {
  if (cities.length === 0) {
    let response = await apiCities.get();
    let names = response.data.map(
      item =>
        item.nome + " - " + item.municipio.microrregiao.mesorregiao.UF.sigla
    );
    setCities(names);
  }
};

export const fetchPolitics = async () => {
  let response = await apiADM.get();
  let politicsAll = [];

  response.data.politicos.forEach(item => {
    let p = {
      nome: item.nome,
      categoria: item.categoria,
      cpf: item.cpf,
      cidade: item.cidade,
      gestores: item.gestores,
      token: item.token
    };
    politicsAll.push(p);
  });

  return politicsAll;
};

export const fetchUser = async () => {
  if (Object.entries(user).length === 0) {
    let response = await apiADM.get();
    let user = {
      nome: response.data.nome,
      partido: response.data.partido,
      corPrimaria: response.data.corPrimaria
    };
    let politicsAll = await fetchPolitics();

    setUser(user);
    setPolitics(politicsAll);
    setManagers(politicsAll[0].gestores);
    setHireds(politicsAll[0].gestores[0].contratados);
  }
};

export const onOrientationChange = () => {
  if (window.screen.availWidth < 500) {
    setIsLessThan500(true);
  }
  window.addEventListener("orientationchange", function() {
    if (window.matchMedia("(orientation: landscape)").matches)
      if (window.screen.availWidth < 500) {
        setIsLessThan500(true);
      } else setIsLessThan500(false);
    else setIsLessThan500(false);
  });
};

export const handlePoliticListClick = (event, index) => {
  setIndexPolitic(index);
  setIndexManager(0);
  setManagers(politics[index].gestores);
  setHireds(politics[index].gestores[0].contratados);
};

export const isTwoPoliticsSelected = () => {
  return checkPolitic.length > 1;
};

export const handleCheckChangePolitic = (event, value, indexList) => {
  let list = checkPolitic;
  if (list === undefined) list = [];
  if (value) {
    list.push(politics[indexList].token);
  } else {
    let indexRemove = list.findIndex(item => item === politics[indexList].id);
    list.splice(indexRemove, 1);
  }
  setCheckPolitic(list);
  if (isTwoPoliticsSelected()) {
    setManagers([]);
    setHireds([]);
  }
};

export const handleManagerListClick = (event, index) => {
  setIndexManager(index);
  setHireds(managers[index].contratados);
};

export const isTwoManagersSelected = () => {
  return checkManager.length > 1;
};

export const handleCheckChangeManager = (event, value, indexList) => {
  let list = checkManager;
  if (list === undefined) list = [];
  if (value) {
    list.push(managers[indexList].id);
  } else {
    let indexRemove = list.findIndex(item => item === managers[indexList].id);
    list.splice(indexRemove, 1);
  }
  setCheckManager(list);
  if (isTwoManagersSelected()) {
    setHireds([]);
  }
};

export const handleHiredListClick = (event, index) => {
  setIndexHired(index);
};

export const handleCheckChangeHired = (event, value, indexList) => {
  let list = checkHired;
  if (list === undefined) list = [];
  if (value) {
    list.push(hireds[indexList].id);
  } else {
    let indexRemove = list.findIndex(item => item === hireds[indexList].id);
    list.splice(indexRemove, 1);
  }
  setCheckHired(list);
  console.log(list);
};

export const handleFilterClick = event => {
  setOpenDialogFilter(true);
};

export const handleFilterCity = event => {
  setCitySelected(event.currentTarget.innerText);
};

export const handleFilterPolitic = event => {
  setFilterPoliticSelected(event.target.value);
};

export const handleFilters = async event => {
  if (citySelected === "" && filterPoliticSelected === 0) {
    setOpenDialogFilter(false);
    return;
  }
  let fetch = await fetchPolitics();
  let list = [];
  if (citySelected !== "" && filterPoliticSelected !== 0) {
    fetch.forEach(item => {
      if (item.cidade === citySelected) {
        if (list.indexOf(item) === -1) {
          let n = filterPoliticSelected + 1;
          if (item.categoria === n) {
            if (list.indexOf(item) === -1) list.push(item);
          }
        }
      }
    });
  } else if (filterPoliticSelected !== 0 && citySelected === "") {
    let n = filterPoliticSelected + 1;
    fetch.forEach(item => {
      if (item.categoria === n) {
        if (list.indexOf(item) === -1) list.push(item);
      }
    });
  } else if (filterPoliticSelected === 0 && citySelected !== "") {
    fetch.forEach(item => {
      if (item.cidade === citySelected) {
        if (list.indexOf(item) === -1) {
          list.push(item);
        }
      }
    });
  }

  list.sort(function(a, b) {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  });
  console.log(list);
  setPolitics(list);
  if (list.length === 0) {
    setManagers([]);
    setHireds([]);
  } else {
    setManagers(list[0].gestores);
    setHireds(list[0].gestores[0].contratados);
  }
  setOpenDialogFilter(false);
};

export const removeFilterCity = async () => {
  setCitySelected("");
  let fetch = await fetchPolitics();
  if (filterPoliticSelected !== 0) {
    let list = [];
    let n = filterPoliticSelected + 1;
    fetch.forEach(item => {
      if (item.categoria === n) {
        if (list.indexOf(item) === -1) {
          list.push(item);
        }
      }
    });
    setPolitics(list);
    if (list.length !== 0) {
      setManagers(list[0].gestores);
      setHireds(list[0].gestores[0].contratados);
    }
  } else {
    setPolitics(fetch);
    setManagers(fetch[0].gestores);
    setHireds(fetch[0].gestores[0].contratados);
  }
};

export const removeFilterPolitic = async () => {
  setFilterPoliticSelected(0);

  let fetch = await fetchPolitics();
  if (citySelected !== "") {
    let list = [];
    fetch.forEach(item => {
      if (item.cidade === citySelected) {
        if (list.indexOf(item) === -1) {
          list.push(item);
        }
      }
    });
    setPolitics(list);
    if (list.length !== 0) {
      setManagers(list[0].gestores);
      setHireds(list[0].gestores[0].contratados);
    }
  } else {
    setPolitics(fetch);
    setManagers(fetch[0].gestores);
    setHireds(fetch[0].gestores[0].contratados);
  }
};
