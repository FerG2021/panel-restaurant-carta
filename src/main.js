import { createApp } from "vue";
// Elment plus
import ElementPlus from "element-plus";
import ElMessage from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/es";

// importo los componentes de forma global
import Modal from "./components/modal/index.vue";
import ModalSinCerrar from "./components/modal_sin_cerrar/index.vue";
import Boton from "./components/boton/index.vue";
import MacaSelectBox from "./components/select_box/index.vue";

//
// PRIMEVUE
//

// PrimeVue
import PrimeVue from "primevue/config";

// PrimeVue Components
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
// toast
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

// modal confirmacion
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";

// modal dinamico
import DynamicDialog from "primevue/dynamicdialog";
import DialogService from "primevue/dialogservice";

// modal
import Dialog from "primevue/dialog";

// tabla y componentes
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row

// Dropdown (Select)
import Dropdown from "primevue/dropdown";

// InputNumber
import InputNumber from "primevue/inputnumber";

// Switch
import InputSwitch from "primevue/inputswitch";

//Tag
import Tag from "primevue/tag";

// Button
import Button from "primevue/button";

// InputText
import InputText from "primevue/inputtext";

// Input Password
import Password from "primevue/password";

// Card
import Card from "primevue/card";

// ProgressSpinner
import ProgressSpinner from "primevue/progressspinner";

// FileUpload
import FileUpload from "primevue/fileupload";

// CascadeSelect
import CascadeSelect from "primevue/cascadeselect";

// TreeSelect
import TreeSelect from "primevue/treeselect";

// Rating
import Rating from "primevue/rating";

// Textarea
import Textarea from "primevue/textarea";

// Image
import Image from "primevue/image";

// prime flex
import "primeflex/primeflex.css";

//
// FIN PRIME VUE
//

import App from "./App.vue";

// importamos las rutas
import router from "./router/index.js";

// vuex
import { createStore } from "vuex";

import axios from "axios";
import VueAxios from "vue-axios";

// usado para login
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'X-CSRF-TOKEN': window.csrf_token
//   // 'X-CSRF-TOKEN': ('meta[name="csrf-token"]').attr('content')
// };

console.log(import.meta.env.VITE_API_URL);

const variableGlobal = {
  data() {
    return {
      // base_url: 'http://localhost:8000/api'
    };
  },
};

// Create a new store instance.
const store = createStore({
  state: {
    user: null,
    auth: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = Boolean(user);
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return dispatch("getUser");
    },

    async logout({ dispatch }) {
      await axios.post("/logout");
      return dispatch("getUser");
    },

    getUser({ commit }) {
      axios
        .get("/api/user")
        .then((res) => {
          commit("SET_USER", res.data);
        })
        .catch(() => {
          commit("SET_USER", null);
        });
    },
  },
  modules: {},
});

store.dispatch("getUser");

createApp(App)
  .component("Modal", Modal)
  .component("ModalSinCerrar", ModalSinCerrar)
  .component("Boton", Boton)
  .component("MacaSelectBox", MacaSelectBox)
  .component("Button", Button)
  .component("InputText", InputText)
  .component("Password", Password)
  .component("Toast", Toast)
  .component("ConfirmDialog", ConfirmDialog)
  .component("DynamicDialog", DynamicDialog)
  .component("Modal", Modal)
  .component("Dialog", Dialog)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("ColumnGroup", ColumnGroup)
  .component("Row", Row)
  .component("Dropdown", Dropdown)
  .component("InputNumber", InputNumber)
  .component("InputSwitch", InputSwitch)
  .component("Tag", Tag)
  .component("Card", Card)
  .component("ProgressSpinner", ProgressSpinner)
  .component("FileUpload", FileUpload)
  .component("CascadeSelect", CascadeSelect)
  .component("TreeSelect", TreeSelect)
  .component("Rating", Rating)
  .component("Textarea", Textarea)
  .component("Image", Image)
  .use(router)
  .use(ElementPlus, { locale })
  .use(ElMessage)
  .use(VueAxios, axios)
  .mixin(variableGlobal)
  .use(store)
  .use(PrimeVue, {
    locale: {
      startsWith: "Starts with",
      contains: "Contains",
      notContains: "Not contains",
      endsWith: "Ends with",
      equals: "Equals",
      notEquals: "Not equals",
      noFilter: "No Filter",
      lt: "Less than",
      lte: "Less than or equal to",
      gt: "Greater than",
      gte: "Greater than or equal to",
      dateIs: "Date is",
      dateIsNot: "Date is not",
      dateBefore: "Date is before",
      dateAfter: "Date is after",
      clear: "Clear",
      apply: "Apply",
      matchAll: "Match All",
      matchAny: "Match Any",
      addRule: "Add Rule",
      removeRule: "Remove Rule",
      accept: "Aceptar",
      reject: "Cancelar",
      choose: "Seleccionar",
      upload: "Upload",
      cancel: "Cancelar",
      completed: "Completed",
      pending: "Pending",
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      chooseYear: "Choose Year",
      chooseMonth: "Choose Month",
      chooseDate: "Choose Date",
      prevDecade: "Previous Decade",
      nextDecade: "Next Decade",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      prevHour: "Previous Hour",
      nextHour: "Next Hour",
      prevMinute: "Previous Minute",
      nextMinute: "Next Minute",
      prevSecond: "Previous Second",
      nextSecond: "Next Second",
      am: "am",
      pm: "pm",
      today: "Today",
      weekHeader: "Wk",
      firstDayOfWeek: 0,
      dateFormat: "mm/dd/yy",
      weak: "Débil",
      medium: "Media",
      strong: "Fuerte",
      passwordPrompt: "Ingresá tu contraseña",
      emptyFilterMessage: "No se encontraron resultados", // @deprecated Use 'emptySearchMessage' option instead.
      searchMessage: "{0} results are available",
      selectionMessage: "{0} items selected",
      emptySelectionMessage: "No selected item",
      emptySearchMessage: "No results found",
      emptyMessage: "No available options",
      aria: {
        trueLabel: "True",
        falseLabel: "False",
        nullLabel: "Not Selected",
        star: "1 star",
        stars: "{star} stars",
        selectAll: "All items selected",
        unselectAll: "All items unselected",
        close: "Close",
        previous: "Previous",
        next: "Next",
        navigation: "Navigation",
        scrollTop: "Scroll Top",
        moveTop: "Move Top",
        moveUp: "Move Up",
        moveDown: "Move Down",
        moveBottom: "Move Bottom",
        moveToTarget: "Move to Target",
        moveToSource: "Move to Source",
        moveAllToTarget: "Move All to Target",
        moveAllToSource: "Move All to Source",
        pageLabel: "{page}",
        firstPageLabel: "First Page",
        lastPageLabel: "Last Page",
        nextPageLabel: "Next Page",
        prevPageLabel: "Previous Page",
        rowsPerPageLabel: "Rows per page",
        jumpToPageDropdownLabel: "Jump to Page Dropdown",
        jumpToPageInputLabel: "Jump to Page Input",
        selectRow: "Row Selected",
        unselectRow: "Row Unselected",
        expandRow: "Row Expanded",
        collapseRow: "Row Collapsed",
        showFilterMenu: "Show Filter Menu",
        hideFilterMenu: "Hide Filter Menu",
        filterOperator: "Filter Operator",
        filterConstraint: "Filter Constraint",
        editRow: "Row Edit",
        saveEdit: "Save Edit",
        cancelEdit: "Cancel Edit",
        listView: "List View",
        gridView: "Grid View",
        slide: "Slide",
        slideNumber: "{slideNumber}",
        zoomImage: "Zoom Image",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        rotateRight: "Rotate Right",
        rotateLeft: "Rotate Left",
      },
    },
  })
  .use(ToastService)
  .use(ConfirmationService)
  .use(DialogService)
  .mount("#app");
