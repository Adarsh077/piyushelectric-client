import Axios from "axios";

Axios.defaults.baseURL = "https://piyushelectronics.herokuapp.com";

const initialClientState = {
  name: "",
  date: "",
  mobileNo: "",
  address: {
    wing: "",
    room: "",
    building: "",
    area: ""
  },
  work: []
};

const areaList = ["Global City", "Y. K Nagar", "HDIL Layout"];

const buildings = [
  "Agarwal Lifestyle A",
  "Agarwal Lifestyle B",
  "Agarwal Lifestyle C",
  "Agarwal Solitaire",
  "Agarwal Paramount",
  "Bhoomi Acropolis",
  "Bhavani View",
  "Blu Pearl",
  "Cosmos Regency",
  "M-Avenue",
  "J-Avenue",
  "H-Avenue",
  "G-Avenue",
  "I-Avenue",
  "K-Avenue",
  "L-Avenue",
  "D-Avenue",
  "Poonam Avenue",
  "Poonam ParkView",
  "Pooman Heights",
  "Poonam Imperial",
  "Bachraj Landmark",
  "Bachraj Residency",
  "Bachraj Paradise",
  "Bachraj LifeSpace",
  "Sumit Greendale",
  "Sumit Greendale NX",
  "Shree Shashwat",
  "Star Heights",
  "Shanti Homes",
  "Siddhi Homes",
  "Evershine Homes",
  "Evershine Avenue A3",
  "Evershine Avenue A6",
  "Ekta Parksville Central",
  "Ekta Parksville Lincoln",
  "Ekta Parksville Sentosa",
  "Ekta Parksville Regent",
  "Ekta Brooklyn Park",
  "Vinay Unique Gardens",
  "Vinay Unique Homes",
  "Vinay Unique Heights",
  "Vinay Unique Imperia",
  "Vinay Unique Corner",
  "Joyti Harmony",
  "Mandar Avenue",
  "Mandar Shlip",
  "Mahavir heights",
  "Casa Vista",
  "New Home Paradise",
  "Mathuresh Krupa",
  "Rachna Tower",
  "Datta Krishna Height"
];

export { Axios, buildings, areaList, initialClientState };
