const navlinks = [
  {
    id: 0,
    icon: "fa fa-home",
    toggle: "fa fa-angle-down",
    title: "Dashboard",
    collapseid: "item_1",
    url: "/",
    collapseitem: [
      {
        id: 0,
        item: "Vertical",
        url: "",
      },
      {
        id: 1,
        item: "Vertical Rtl",
        url: "",
      },
      {
        id: 2,
        item: "Horizontal",
        url: "",
      },
    ],
  },
  {
    id: 1,
    icon: "fa fa-wheelchair",
    title: "Patient",
    toggle: "fa fa-angle-down",
    collapseid: "item_2",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Add Patient",
        url: "Patient/Addpatient",
      },
      {
        id: 1,
        item: "All Patient",
        url: "Patient/Allpatient",
      },
      {
        id: 2,
        item: "Patient Details",
        url: "Patient/PatientDetail",
      },
      {
        id: 3,
        item: "Edit Patient",
        url: "Patient/EditPatient",
      },
    ],
  },
  {
    id: 2,
    icon: "fa fa-user",
    toggle: "fa fa-angle-down",
    title: "Doctor",
    collapseid: "item_3",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Add Doctor",
        url: "Doctor/AddDoctor",
      },
      {
        id: 1,
        item: "All Doctors",
        url: "Doctor/AllDoctors",
      },
      {
        id: 2,
        item: "Doctor Details",
        url: "Doctor/DoctorDetail",
      },
      {
        id: 3,
        item: "Edit Doctor",
        url: "Doctor/EditDoctor",
      },
    ],
  },
  {
    id: 3,
    icon: "fa fa-edit",
    title: "Appointments",
    toggle: "fa fa-angle-down",
    collapseid: "item_4",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Add Appointment",
        url: "Appointment/AddAppointment",
      },
      {
        id: 1,
        item: "All Appointments",
        url: "Appointment/AllAppointment",
      },
      {
        id: 2,
        item: "Appointment Details",
        url: "Appointment/AppointmentDetail",
      },
      {
        id: 3,
        item: "Edit Appointment",
        url: "Appointment/EditAppointment",
      },
    ],
  },
  {
    id: 4,
    icon: "fa fa-dollar",
    title: "Payments",
    toggle: "fa fa-angle-down",
    collapseid: "item_5",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Add Payment",
        url: "Payment/AddPayment",
      },
      {
        id: 1,
        item: "All Payments",
        url: "Payment/AllPayment",
      },
      {
        id: 2,
        item: "Payment Invoice",
        url: "Payment/Paymentinvoice",
      },
    ],
  },
  {
    id: 5,
    icon: "fa fa-key",
    toggle: "fa fa-angle-down",
    title: "Room Allotments",
    collapseid: "item_6",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Add Room Allotment",
        url: "Room/AddRoom",
      },
      {
        id: 1,
        item: "All Rooms",
        url: "Room/AllRoom",
      },
      {
        id: 2,
        item: "Edit Room Allotment",
        url: "Room/EditRoomAlllotment",
      },
    ],
  },
  {
    id: 6,
    icon: "fa fa-files-o",
    title: "UI KIT",
    toggle: "fa fa-angle-down",
    collapseid: "item_7",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Typography",
        url: null,
      },
      {
        id: 2,
        item: "Buttons",
        url: null,
      },
      {
        id: 3,
        item: "Cards",
        url: null,
      },
      {
        id: 4,
        item: "Tabs",
        url: null,
      },
      {
        id: 5,
        item: "Accordions",
        url: null,
      },
      {
        id: 6,
        item: "Modals",
        url: null,
      },
      {
        id: 7,
        item: "List & Media Object",
        url: null,
      },
      {
        id: 8,
        item: "Grid",
        url: null,
      },
      {
        id: 9,
        item: "Progress Bars",
        url: null,
      },
      {
        id: 10,
        item: "Notification & Alerts",
        url: null,
      },
      {
        id: 11,
        item: "Pagination",
        url: null,
      },
      {
        id: 12,
        item: "Carousel",
        url: null,
      },
    ],
  },
  {
    id: 7,
    icon: "fa fa-bars",
    title: "Tables",
    toggle: null,
    collapseid: "item_8",
    url: "Tables",
    collapseitem: [
      {
        id: 0,
        item: null,
        url: null,
      },
    ],
  },
  {
    id: 8,
    icon: "fa fa-pie-chart",
    toggle: "fa fa-angle-down",
    title: "Charts",
    collapseid: "item_9",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Morris",
        url: "MorrisChart",
      },
      {
        id: 1,
        item: "Flot",
        url: "FloatChart",
      },
    ],
  },
  {
    id: 9,
    icon: "fa fa-map-marker",
    toggle: "fa fa-angle-down",
    title: "Maps",
    collapseid: "item_10",
    collapseitem: [
      {
        id: 0,
        item: "Google Maps",
        url: "google",
      },
      {
        id: 1,
        item: "Vector Maps",
        url: "vector",
      },
    ],
  },
  {
    id: 10,
    icon: "fa fa-minus-square-o",
    toggle: null,
    title: "Forms",
    collapseid: "item_11",
    url: "Form",
    collapseitem: [
      {
        id: 0,
        item: null,
        url: null,
      },
    ],
  },
  {
    id: 11,
    icon: "fa fa-book",
    title: "Icons",
    toggle: "fa fa-angle-down",
    collapseid: "item_12",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "Font Awesome",
        url: "FontAwesome",
      },
      {
        id: 1,
        item: "Themify",
        url: "Themify",
      },
    ],
  },
  {
    id: 12,
    icon: "fa fa-folder",
    toggle: "fa fa-angle-down",
    title: "Other Pages",
    collapseid: "item_13",
    url: null,
    collapseitem: [
      {
        id: 0,
        item: "404",
        url: "404",
      },
      {
        id: 1,
        item: "Blank Page",
        url: "BlankPage",
      },
      {
        id: 2,
        item: "Pricing",
        url: "Pricing",
      },
      {
        id: 3,
        item: "FAQ",
        url: "Faq",
      },
      {
        id: 4,
        item: "Invoice",
        url: "Invoice",
      },
    ],
  },
  {
    id: 12,
    icon: "fa fa-sign-in",
    title: "Login",
    collapseid: "item_13",
    url: "Login",
    collapseitem: [
      {
        id: 0,
        item: null,
        url: null,
      },
    ],
  },
  {
    id: 13,
    url: "SignUp",
    icon: "fa fa-user-plus",
    title: "Sign Up",
    collapseid: "item_14",
    collapseitem: [
      {
        id: 0,
        item: null,
        url: null,
      },
    ],
  },
];
const menu = [
  {
    id: 1,
    menu_icon: "fa fa-bars",
    color: "bg-black text-white",
    zoom_icon: "fa fa-expand",
    search_icon: "fa fa-search",
    Notification_icon: "fa fa-bell",
    user_icon: "fa fa-user",
  },
];
const contactdetailposter = [
  {
    id: 1,
    header_icon: "fa fa-comments-o",
    header: "Need Help",
    ph_icon: "fa fa-phone",
    ph_no: "+91 6201269225",
    email_icon: "fa fa-envelope",
    email: "nirajsingh4141@gmail.com",
    rights: "Copy rights © 2024",
    creator: " Niraj Singh | Full Stack ",
    title: "Creator :-",
  },
];
const headernav = [
  {
    id: 1,
    icon: "fa fa-home",
    space: "/",
  },
];
const medicalRooms = [
  "Emergency Room 1",
  "Emergency Room 2",
  "Emergency Room 3",
  "Operating Room 1",
  "Operating Room 2",
  "Operating Room 3",
  "ICU Room 1",
  "ICU Room 2",
  "ICU Room 3",
  "Laboratory 1",
  "Laboratory 2",
  "Radiology 1",
  "Radiology 2",
  "Patient Room 1",
  "Patient Room 2",
  "Patient Room 3",
  "Exam Room 1",
  "Exam Room 2",
  "Exam Room 3",
  "Pharmacy",
  "Waiting Room 1",
  "Waiting Room 2",
  "Waiting Room 3",
  "Recovery Room 1",
  "Recovery Room 2",
  "Recovery Room 3",
  "Consultation Room 1",
  "Consultation Room 2",
  "Consultation Room 3",
];
export { navlinks, contactdetailposter, menu, headernav, medicalRooms };
