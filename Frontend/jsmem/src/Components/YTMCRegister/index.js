import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import {useNavigate, useLocation } from 'react-router-dom';
// import {useHistory} from 'react-router-dom'
import DistrictItem from '../DistrictItem';
import "./index.css"
const constituencies = {
  "SELECT" : ['SELECT'],
  "PASCHIM CHAMPARAN": [
    "Valmiki Nagar",
    "Ramnagar (SC)",
    "Narkatiaganj",
    "Bagaha",
    "Lauriya",
    "Nautan",
    "Chanpatia",
    "Bettiah",
    "Sikta"
  ],
  "PURVI CHAMPARAN": [
    "Raxaul",
    "Sugauli",
    "Narkatia",
    "Harsidhi (SC)",
    "Govindganj",
    "Kesaria",
    "Kalyanpur",
    "Pipra",
    "Madhuban",
    "Motihari",
    "Chiraia",
    "Dhaka"
  ],
  "SHEOHAR": ["Sheohar"],
  "SITAMARHI": [
    "Riga",
    "Bathnaha (SC)",
    "Parihar",
    "Sursand",
    "Bajpatti",
    "Sitamarhi",
    "Runnisaidpur",
    "Belsand"
  ],
  "MADHUBANI": [
    "Harlakhi",
    "Benipatti",
    "Khajauli",
    "Babubarhi",
    "Bisfi",
    "Madhubani",
    "Rajnagar (SC)",
    "Jhanjharpur",
    "Phulparas",
    "Laukaha"
  ],
  "SUPAUL": [
    "Nirmali",
    "Pipra",
    "Supaul",
    "Triveniganj (SC)",
    "Chhatapur"
  ],
  "ARARIA": [
    "Narpatganj",
    "Raniganj (SC)",
    "Forbesganj",
    "Araria",
    "Jokihat",
    "Sikti"
  ],
  "KISHANGANJ": [
    "Bahadurganj",
    "Thakurganj",
    "Kishanganj",
    "Kochadhaman"
  ],
  "PURNIA": [
    "Amour",
    "Baisi",
    "Kasba",
    "Banmankhi (SC)",
    "Rupauli",
    "Dhamdaha",
    "Purnia"
  ],
  "KATIHAR": [
    "Katihar",
    "Kadwa",
    "Balrampur",
    "Pranpur",
    "Manihari (ST)",
    "Barari",
    "Korha (SC)"
  ],
  "MADHEPURA": [
    "Alamnagar",
    "Bihariganj",
    "Singheshwar (SC)",
    "Madhepura"
  ],
  "SAHARSA": [
    "Sonbarsha (SC)",
    "Saharsa",
    "Simri Bakhtiarpur",
    "Mahishi"
  ],
  "DARBHANGA": [
    "Kusheshwar Asthan (SC)",
    "Gaura Bauram",
    "Benipur",
    "Alinagar",
    "Darbhanga Rural",
    "Darbhanga",
    "Hayaghat",
    "Bahadurpur",
    "Keoti",
    "Jale"
  ],
  "MUZAFFARPUR": [
    "Gaighat",
    "Aurai",
    "Minapur",
    "Bochaha (SC)",
    "Sakra (SC)",
    "Kurhani",
    "Muzaffarpur",
    "Kanti",
    "Baruraj",
    "Paroo",
    "Sahebganj"
  ],
  "GOPALGANJ": [
    "Baikunthpur",
    "Barauli",
    "Gopalganj",
    "Kuchaikote",
    "Bhorey (SC)",
    "Hathua"
  ],
  "SIWAN": [
    "Siwan",
    "Ziradei",
    "Darauli (SC)",
    "Raghunathpur",
    "Daraundha",
    "Barharia",
    "Goriakothi",
    "Maharajganj"
  ],
  "SARAN": [
    "Ekma",
    "Manjhi",
    "Baniapur",
    "Taraiya",
    "Marhaura",
    "Chapra",
    "Garkha (SC)",
    "Amnour",
    "Parsa",
    "Sonepur"
  ],
  "VAISHALI": [
    "Hajipur",
    "Lalganj",
    "Vaishali",
    "Mahua",
    "Raja Pakar (SC)",
    "Raghopur",
    "Mahnar",
    "Patepur (SC)"
  ],
  "SAMASTIPUR": [
    "Kalyanpur (SC)",
    "Warisnagar",
    "Samastipur",
    "Ujiarpur",
    "Morwa",
    "Sarairanjan",
    "Mohiuddinnagar",
    "Bibhutipur",
    "Rosera (SC)",
    "Hasanpur"
  ],
  "BEGUSARAI": [
    "Cheria Bariarpur",
    "Bachhwara",
    "Teghra",
    "Matihani",
    "Sahebpur Kamal",
    "Begusarai",
    "Bakhri (SC)"
  ],
  "KHAGARIA": [
    "Alauli (SC)",
    "Khagaria",
    "Beldaur",
    "Parbatta"
  ],
  "BHAGALPUR": [
    "Bihpur",
    "Gopalpur",
    "Pirpainti (SC)",
    "Kahalgaon",
    "Bhagalpur",
    "Sultanganj",
    "Nathnagar"
  ],
  "BANKA": [
    "Amarpur",
    "Dhauraiya (SC)",
    "Banka",
    "Katoria (ST)",
    "Belhar"
  ],
  "MUNGER": [
    "Tarapur",
    "Munger",
    "Jamalpur"
  ],
  "LAKHISARAI": [
    "Suryagarha",
    "Lakhisarai"
  ],
  "SHEIKHPURA": [
    "Sheikhpura",
    "Barbigha"
  ],
  "NALANDA": [
    "Asthawan",
    "Biharsharif",
    "Rajgir (SC)",
    "Islampur",
    "Hilsa",
    "Nalanda",
    "Harnaut"
  ],
  "PATNA": [
      "Mokama",
      "Barh",
      "Bakhtiarpur",
      "Digha",
      "Bankipur",
      "Kumhrar",
      "Patna Sahib",
      "Fatuha",
      "Danapur",
      "Maner",
      "Phulwari (SC)",
      "Masaurhi (SC)",
      "Paliganj",
      "Bikram"
    ],
    "BHOJPUR": [
      "Sandesh",
      "Barhara",
      "Arrah",
      "Agiaon (SC)",
      "Tarari",
      "Jagdishpur",
      "Shahpur"
    ],
    "BUXAR": [
      "Brahampur",
      "Buxar",
      "Dumraon",
      "Rajpur (SC)"
    ],
    "KAIMUR (BHABHUA)": [
      "Ramgarh",
      "Mohania (SC)",
      "Bhabua",
      "Chainpur"
    ],
    "ROHTAS": [
      "Chenari (SC)",
      "Sasaram",
      "Kargahar",
      "Dinara",
      "Nokha",
      "Dehri",
      "Karakat"
    ],
    "ARWAL": [
      "Arwal",
      "Kurtha"
    ],
    "JAHANABAD": [
      "Jehanabad",
      "Ghosi",
      "Makhdumpur (SC)"
    ],
    "AURANGABAD": [
      "Goh",
      "Obra",
      "Nabinagar",
      "Kutumba (SC)",
      "Aurangabad",
      "Rafiganj"
    ],
    "GAYA": [
      "Gurua",
      "Sherghati",
      "Imamganj (SC)",
      "Barachatti (SC)",
      "Bodh Gaya (SC)",
      "Gaya Town",
      "Tikari",
      "Belaganj",
      "Atri",
      "Wazirganj"
    ],
    "NAWADA": [
      "Rajauli (SC)",
      "Hisua",
      "Nawada",
      "Gobindpur",
      "Warsaliganj"
    ],
    "JAMUI": [
      "Sikandra (SC)",
      "Jamui",
      "Jhajha",
      "Chakai"
    ]
  }  

const options = [
      {
        OptionId : "PASCHIM CHAMPARAN"
      },
      {
          OptionId : "PURVI CHAMPARAN"
      },
      {
          OptionId : "SHEOHAR"
      },
      {
          OptionId : "SITAMARHI"
      },
      {
          OptionId : "MADHUBANI"
      },
      {
          OptionId : "SUPAUL"
      },
      {
          OptionId : "ARARIA"
      },
      {
          OptionId : "KISHANGANJ"
      },
      {
          OptionId : "PURNIA"
      },
      {
          OptionId : "KATIHAR"
      },
      {
          OptionId : "MADHEPURA"
      },
      {
          OptionId : "SAHARSA"
      },
      {
          OptionId : "DARBHANGA"
      },
      {
          OptionId : "MUZAFFARPUR"
      },
      {
          OptionId : "GOPALGANJ"
      },
      {
          OptionId : "SIWAN"
      },
      {
          OptionId : "SARAN"
      },
      {
          OptionId : "VAISHALI"
      },
      {
          OptionId : "SAMASTIPUR"
      },
      {
          OptionId : "BEGUSARAI"
      },
      {
          OptionId : "KHAGARIA"
      },
      {
          OptionId : "BHAGALPUR"
      },
      {
          OptionId : "BANKA"
      },
      {
          OptionId : "MUNGER"
      },
      {
          OptionId : "LAKHISARAI"
      },
      {
          OptionId : "SHEIKHPURA"
      },
      {
          OptionId : "NALANDA"
      },
      {
          OptionId : "PATNA"
      },
      {
          OptionId : "BHOJPUR"
      },
      {
          OptionId : "BUXAR"
      },
      {
          OptionId : "KAIMUR (BHABHUA)"
      },
      {
          OptionId : "ROHTAS"
      },
      {
          OptionId : "ARWAL"
      },
      {
          OptionId : "JAHANABAD"
      },
      {
          OptionId : "AURANGABAD"
      },
      {
          OptionId : "GAYA"
      },
      {
          OptionId : "NAWADA"
      },
      {
          OptionId : "JAMUI"
      }
    ]

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

const YTMCRegister = () => {
    const [name, setName] = useState('');
    const [channelUrl, setChannelUrl] = useState('');
    const [state, setState] = useState('Bihar');
    const [district, setDistrict] = useState('SELECT');
    const [constituency, setConstituency] = useState('SELECT');
    const [photo, setPhoto] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('SELECT');
    const [registeredStatus, setRegisteredStatus] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    // const history = useHistory();
    const {Googlename,email} = location.state

    const onChangeName = (event) => setName(event.target.value);
    const onChangeChannelUrl = (event) => setChannelUrl(event.target.value);
    const onChangeState = (event) => setState(event.target.value);
    const onChangeDistrict = (event) => {
        setDistrict(event.target.value);
        setSelectedConstituency(constituencies[event.target.value][0]);
    };
    const onChangeConstituency = (event) => setSelectedConstituency(event.target.value);
    const onChangePhoto = (event) => setPhoto(event.target.files[0]);
    const onChangeWhatsApp = (event) => setWhatsappNumber(event.target.value);

    const postData = async (value) => {
      let options = {
        method : "POST",
        headers : {
          "Content-Type":"application/json"
        },
        body : JSON.stringify(value)
      }
      const response = await fetch("https://js-member-backend.vercel.app/users",options)
      const data = await response.json()
      console.log(data)
    }

    const onSubmitRegisterYTMC = (event) => {
        event.preventDefault();
        const formData = {
            name,
            channelUrl,
            state,
            district,
            constituency: selectedConstituency,
            whatsappNumber,
            Googlename,
            email,
            regstatus:"pending",
            channels:[],
            videos:[]
        };
        postData(formData);
        // history.replace("/regpending")
        navigate("/regpending",{replace:true})
        setRegisteredStatus(!registeredStatus);
    };

    const onLogOut = () => {
        googleLogout();
        navigate("/",{replace:true})
    };

    return (
      <div className="ytmcregister-main-container">
          {registeredStatus===false && (
              <>
          <div className="ytmcregister-top-container">
              <h1>Register</h1>
          </div>
          <div className="ytmcregister-form-container">
          <form onSubmit={onSubmitRegisterYTMC}>
              <div className="ytmcregister-cont-ele">
              <label htmlFor="username">Username</label>
              <br/>
              <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required/>
              </div>
              <div className="ytmcregister-cont-ele">
              <label htmlFor="channelurl">Channel URL</label>
              <br/>
              <input placeholder="Enter the Channel Url" onChange={onChangeChannelUrl} className="ytmcregister-user-input" type="url" id="channelurl" required/>
              </div>
              <div className="ytmcregister-cont-ele">
                  <label htmlFor="state">State</label>
                  <br/>
                  <select className="ytmcregister-user-input" id="state" onChange={onChangeState} value={state}>
                      {states.map((ele) =>  <option key={ele}>{ele}</option>)}
                  </select>
                  {/* <input placeholder="Enter the State : E.g: Bihar" onChange={onChangeState} type="text" className="ytmchome-user-input" required/> */}
              </div>
              <div className="ytmcregister-cont-ele">
                  <label htmlFor="district">District</label>
                  <br/>
                  <select onChange={onChangeDistrict} id="district" className="ytmcregister-user-input">
                      <option>SELECT</option>
                      {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
                  </select>
                  </div>
                  <div className="ytmcregister-cont-ele">
                  <label htmlFor="constituency">Constituency</label>
                  <br/>
                  <select onChange={onChangeConstituency} id="constituency" className="ytmcregister-user-input" >
                      {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                  </select>
              </div>
              {/* <div className="ytmcregister-cont-ele">
                  <label htmlFor="photo">Photo</label>
                  <br/>
                  <input className="ytmcregister-user-input" onChange={onChangePhoto} type="file" id="photo" required/>
              </div> */}
              <div className="ytmcregister-cont-ele">
                  <label htmlFor="whatsappno">Whatsapp Number</label>
                  <br/>
                  <input onChange={onChangeWhatsApp} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="ytmcregister-user-input" type="tel" id="whatsappno" required/>
              </div>
              <button className="fetchBtn" type="submit">Register</button>
          </form>
      </div>
      </>
      )}
      {/* {registeredStatus && (
          <div style={{textAlign:'center'}} className="ytmcregister-form-container">
              <img style={{height:'50px',width:'50px'}} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image"/>
              <h1>Your Registration is Pending...</h1>
              <p>We will get back to you soon.</p>
              <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
          </div>
      )} */}
      </div>
      )

    // return (
    //     <div className="ytmcregister-main-container">
    //         {!registeredStatus && (
    //             <>
    //                 <div className="ytmcregister-top-container">
    //                     <h1>Register</h1>
    //                 </div>
    //                 <div className="ytmcregister-form-container">
    //                     <form onSubmit={onSubmitRegisterYTMC}>
    //             <div className="ytmcregister-cont-ele">
    //             <label htmlFor="username">Username</label>
    //             <br/>
    //             <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required/>
    //             </div>
    //             <div className="ytmcregister-cont-ele">
    //             <label htmlFor="channelurl">Channel URL</label>
    //             <br/>
    //             <input placeholder="Enter the Channel Url" onChange={onChangeChannelUrl} className="ytmcregister-user-input" type="url" id="channelurl" required/>
    //             </div>
    //             <div className="ytmcregister-cont-ele">
    //                 <label htmlFor="state">State</label>
    //                 <br/>
    //                 <select className="ytmcregister-user-input" id="state" onChange={onChangeState} value={state}>
    //                     {states.map((ele) =>  <option key={ele}>{ele}</option>)}
    //                 </select>
    //                 {/* <input placeholder="Enter the State : E.g: Bihar" onChange={onChangeState} type="text" className="ytmchome-user-input" required/> */}
    //             </div>
    //             <div className="ytmcregister-cont-ele">
    //                 <label htmlFor="district">District</label>
    //                 <br/>
    //                 <select onChange={onChangeDistrict} id="district" className="ytmcregister-user-input">
    //                     <option>SELECT</option>
    //                     {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
    //                 </select>
    //                 </div>
    //                 <div className="ytmcregister-cont-ele">
    //                 <label htmlFor="constituency">Constituency</label>
    //                 <br/>
    //                 <select onChange={onChangeConstituency} id="constituency" className="ytmcregister-user-input" >
    //                     {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
    //                 </select>
    //             </div>
    //             {/* <div className="ytmcregister-cont-ele">
    //                 <label htmlFor="photo">Photo</label>
    //                 <br/>
    //                 <input className="ytmcregister-user-input" onChange={onChangePhoto} type="file" id="photo" required/>
    //             </div> */}
    //             <div className="ytmcregister-cont-ele">
    //                 <label htmlFor="whatsappno">Whatsapp Number</label>
    //                 <br/>
    //                 <input onChange={onChangeWhatsApp} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="ytmcregister-user-input" type="tel" id="whatsappno" required/>
    //             </div>
    //             <button className="fetchBtn" type="submit">Register</button>
    //                     </form>
    //                 </div>
    //             </>
    //         )}
    //         {registeredStatus && (
    //             <div style={{ textAlign: 'center' }} className="ytmcregister-form-container">
    //                 <img style={{ height: '50px', width: '50px' }} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image" />
    //                 <h1>Your Registration is Pending...</h1>
    //                 <p>We will get back to you soon.</p>
    //                 <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default YTMCRegister;

// import "./index.css"
// import { Component } from "react";
// import DistrictItem from "../DistrictItem";
// import { googleLogout } from "@react-oauth/google";
// import {useLocation} from 'react-router-dom'

// // const fun = () => {
// //   const location = useLocation()

// // const {name,email} = location.state
// // console.log(name)
// // console.log(email)
// // }

// // fun()


// const constituencies = {
//     "SELECT" : ['SELECT'],
//     "PASCHIM CHAMPARAN": [
//       "Valmiki Nagar",
//       "Ramnagar (SC)",
//       "Narkatiaganj",
//       "Bagaha",
//       "Lauriya",
//       "Nautan",
//       "Chanpatia",
//       "Bettiah",
//       "Sikta"
//     ],
//     "PURVI CHAMPARAN": [
//       "Raxaul",
//       "Sugauli",
//       "Narkatia",
//       "Harsidhi (SC)",
//       "Govindganj",
//       "Kesaria",
//       "Kalyanpur",
//       "Pipra",
//       "Madhuban",
//       "Motihari",
//       "Chiraia",
//       "Dhaka"
//     ],
//     "SHEOHAR": ["Sheohar"],
//     "SITAMARHI": [
//       "Riga",
//       "Bathnaha (SC)",
//       "Parihar",
//       "Sursand",
//       "Bajpatti",
//       "Sitamarhi",
//       "Runnisaidpur",
//       "Belsand"
//     ],
//     "MADHUBANI": [
//       "Harlakhi",
//       "Benipatti",
//       "Khajauli",
//       "Babubarhi",
//       "Bisfi",
//       "Madhubani",
//       "Rajnagar (SC)",
//       "Jhanjharpur",
//       "Phulparas",
//       "Laukaha"
//     ],
//     "SUPAUL": [
//       "Nirmali",
//       "Pipra",
//       "Supaul",
//       "Triveniganj (SC)",
//       "Chhatapur"
//     ],
//     "ARARIA": [
//       "Narpatganj",
//       "Raniganj (SC)",
//       "Forbesganj",
//       "Araria",
//       "Jokihat",
//       "Sikti"
//     ],
//     "KISHANGANJ": [
//       "Bahadurganj",
//       "Thakurganj",
//       "Kishanganj",
//       "Kochadhaman"
//     ],
//     "PURNIA": [
//       "Amour",
//       "Baisi",
//       "Kasba",
//       "Banmankhi (SC)",
//       "Rupauli",
//       "Dhamdaha",
//       "Purnia"
//     ],
//     "KATIHAR": [
//       "Katihar",
//       "Kadwa",
//       "Balrampur",
//       "Pranpur",
//       "Manihari (ST)",
//       "Barari",
//       "Korha (SC)"
//     ],
//     "MADHEPURA": [
//       "Alamnagar",
//       "Bihariganj",
//       "Singheshwar (SC)",
//       "Madhepura"
//     ],
//     "SAHARSA": [
//       "Sonbarsha (SC)",
//       "Saharsa",
//       "Simri Bakhtiarpur",
//       "Mahishi"
//     ],
//     "DARBHANGA": [
//       "Kusheshwar Asthan (SC)",
//       "Gaura Bauram",
//       "Benipur",
//       "Alinagar",
//       "Darbhanga Rural",
//       "Darbhanga",
//       "Hayaghat",
//       "Bahadurpur",
//       "Keoti",
//       "Jale"
//     ],
//     "MUZAFFARPUR": [
//       "Gaighat",
//       "Aurai",
//       "Minapur",
//       "Bochaha (SC)",
//       "Sakra (SC)",
//       "Kurhani",
//       "Muzaffarpur",
//       "Kanti",
//       "Baruraj",
//       "Paroo",
//       "Sahebganj"
//     ],
//     "GOPALGANJ": [
//       "Baikunthpur",
//       "Barauli",
//       "Gopalganj",
//       "Kuchaikote",
//       "Bhorey (SC)",
//       "Hathua"
//     ],
//     "SIWAN": [
//       "Siwan",
//       "Ziradei",
//       "Darauli (SC)",
//       "Raghunathpur",
//       "Daraundha",
//       "Barharia",
//       "Goriakothi",
//       "Maharajganj"
//     ],
//     "SARAN": [
//       "Ekma",
//       "Manjhi",
//       "Baniapur",
//       "Taraiya",
//       "Marhaura",
//       "Chapra",
//       "Garkha (SC)",
//       "Amnour",
//       "Parsa",
//       "Sonepur"
//     ],
//     "VAISHALI": [
//       "Hajipur",
//       "Lalganj",
//       "Vaishali",
//       "Mahua",
//       "Raja Pakar (SC)",
//       "Raghopur",
//       "Mahnar",
//       "Patepur (SC)"
//     ],
//     "SAMASTIPUR": [
//       "Kalyanpur (SC)",
//       "Warisnagar",
//       "Samastipur",
//       "Ujiarpur",
//       "Morwa",
//       "Sarairanjan",
//       "Mohiuddinnagar",
//       "Bibhutipur",
//       "Rosera (SC)",
//       "Hasanpur"
//     ],
//     "BEGUSARAI": [
//       "Cheria Bariarpur",
//       "Bachhwara",
//       "Teghra",
//       "Matihani",
//       "Sahebpur Kamal",
//       "Begusarai",
//       "Bakhri (SC)"
//     ],
//     "KHAGARIA": [
//       "Alauli (SC)",
//       "Khagaria",
//       "Beldaur",
//       "Parbatta"
//     ],
//     "BHAGALPUR": [
//       "Bihpur",
//       "Gopalpur",
//       "Pirpainti (SC)",
//       "Kahalgaon",
//       "Bhagalpur",
//       "Sultanganj",
//       "Nathnagar"
//     ],
//     "BANKA": [
//       "Amarpur",
//       "Dhauraiya (SC)",
//       "Banka",
//       "Katoria (ST)",
//       "Belhar"
//     ],
//     "MUNGER": [
//       "Tarapur",
//       "Munger",
//       "Jamalpur"
//     ],
//     "LAKHISARAI": [
//       "Suryagarha",
//       "Lakhisarai"
//     ],
//     "SHEIKHPURA": [
//       "Sheikhpura",
//       "Barbigha"
//     ],
//     "NALANDA": [
//       "Asthawan",
//       "Biharsharif",
//       "Rajgir (SC)",
//       "Islampur",
//       "Hilsa",
//       "Nalanda",
//       "Harnaut"
//     ],
//     "PATNA": [
//         "Mokama",
//         "Barh",
//         "Bakhtiarpur",
//         "Digha",
//         "Bankipur",
//         "Kumhrar",
//         "Patna Sahib",
//         "Fatuha",
//         "Danapur",
//         "Maner",
//         "Phulwari (SC)",
//         "Masaurhi (SC)",
//         "Paliganj",
//         "Bikram"
//       ],
//       "BHOJPUR": [
//         "Sandesh",
//         "Barhara",
//         "Arrah",
//         "Agiaon (SC)",
//         "Tarari",
//         "Jagdishpur",
//         "Shahpur"
//       ],
//       "BUXAR": [
//         "Brahampur",
//         "Buxar",
//         "Dumraon",
//         "Rajpur (SC)"
//       ],
//       "KAIMUR (BHABHUA)": [
//         "Ramgarh",
//         "Mohania (SC)",
//         "Bhabua",
//         "Chainpur"
//       ],
//       "ROHTAS": [
//         "Chenari (SC)",
//         "Sasaram",
//         "Kargahar",
//         "Dinara",
//         "Nokha",
//         "Dehri",
//         "Karakat"
//       ],
//       "ARWAL": [
//         "Arwal",
//         "Kurtha"
//       ],
//       "JAHANABAD": [
//         "Jehanabad",
//         "Ghosi",
//         "Makhdumpur (SC)"
//       ],
//       "AURANGABAD": [
//         "Goh",
//         "Obra",
//         "Nabinagar",
//         "Kutumba (SC)",
//         "Aurangabad",
//         "Rafiganj"
//       ],
//       "GAYA": [
//         "Gurua",
//         "Sherghati",
//         "Imamganj (SC)",
//         "Barachatti (SC)",
//         "Bodh Gaya (SC)",
//         "Gaya Town",
//         "Tikari",
//         "Belaganj",
//         "Atri",
//         "Wazirganj"
//       ],
//       "NAWADA": [
//         "Rajauli (SC)",
//         "Hisua",
//         "Nawada",
//         "Gobindpur",
//         "Warsaliganj"
//       ],
//       "JAMUI": [
//         "Sikandra (SC)",
//         "Jamui",
//         "Jhajha",
//         "Chakai"
//       ]
//     }  

// const options = [
//         {
//           OptionId : "PASCHIM CHAMPARAN"
//         },
//         {
//             OptionId : "PURVI CHAMPARAN"
//         },
//         {
//             OptionId : "SHEOHAR"
//         },
//         {
//             OptionId : "SITAMARHI"
//         },
//         {
//             OptionId : "MADHUBANI"
//         },
//         {
//             OptionId : "SUPAUL"
//         },
//         {
//             OptionId : "ARARIA"
//         },
//         {
//             OptionId : "KISHANGANJ"
//         },
//         {
//             OptionId : "PURNIA"
//         },
//         {
//             OptionId : "KATIHAR"
//         },
//         {
//             OptionId : "MADHEPURA"
//         },
//         {
//             OptionId : "SAHARSA"
//         },
//         {
//             OptionId : "DARBHANGA"
//         },
//         {
//             OptionId : "MUZAFFARPUR"
//         },
//         {
//             OptionId : "GOPALGANJ"
//         },
//         {
//             OptionId : "SIWAN"
//         },
//         {
//             OptionId : "SARAN"
//         },
//         {
//             OptionId : "VAISHALI"
//         },
//         {
//             OptionId : "SAMASTIPUR"
//         },
//         {
//             OptionId : "BEGUSARAI"
//         },
//         {
//             OptionId : "KHAGARIA"
//         },
//         {
//             OptionId : "BHAGALPUR"
//         },
//         {
//             OptionId : "BANKA"
//         },
//         {
//             OptionId : "MUNGER"
//         },
//         {
//             OptionId : "LAKHISARAI"
//         },
//         {
//             OptionId : "SHEIKHPURA"
//         },
//         {
//             OptionId : "NALANDA"
//         },
//         {
//             OptionId : "PATNA"
//         },
//         {
//             OptionId : "BHOJPUR"
//         },
//         {
//             OptionId : "BUXAR"
//         },
//         {
//             OptionId : "KAIMUR (BHABHUA)"
//         },
//         {
//             OptionId : "ROHTAS"
//         },
//         {
//             OptionId : "ARWAL"
//         },
//         {
//             OptionId : "JAHANABAD"
//         },
//         {
//             OptionId : "AURANGABAD"
//         },
//         {
//             OptionId : "GAYA"
//         },
//         {
//             OptionId : "NAWADA"
//         },
//         {
//             OptionId : "JAMUI"
//         }
//       ]

// const states = [
//     "Andhra Pradesh",
//     "Arunachal Pradesh",
//     "Assam",
//     "Bihar",
//     "Chhattisgarh",
//     "Goa",
//     "Gujarat",
//     "Haryana",
//     "Himachal Pradesh",
//     "Jharkhand",
//     "Karnataka",
//     "Kerala",
//     "Madhya Pradesh",
//     "Maharashtra",
//     "Manipur",
//     "Meghalaya",
//     "Mizoram",
//     "Nagaland",
//     "Odisha",
//     "Punjab",
//     "Rajasthan",
//     "Sikkim",
//     "Tamil Nadu",
//     "Telangana",
//     "Tripura",
//     "Uttar Pradesh",
//     "Uttarakhand",
//     "West Bengal"
//   ]

// class YTMCRegister extends Component {
//     state = {name:'',channelUrl:'',state:'Bihar',district:'SELECT',constituency:'SELECT',photo:'',whatsappnumber:'',selectedConstituency:'SELECT',registeredStatus:false}
    
//     onChangeSearchInput = (event) => {
//         setState({userinput:event.target.value})
//     }

//     onChangeName = (event) => {
//         setState({name:event.target.value})
//     }

//     onChangeChannelUrl = (event) => {
//         setState({channelUrl:event.target.value})
//     }

//     onChangeState = (event) => {
//         setState({state:event.target.value})
//     }

//     onChangeDistrict = (event) => {
//         setState({district:event.target.value,selectedConstituency:constituencies[event.target.value][0]})
//     }

//     onChangeConstituency = (event) => {
//         setState({selectedConstituency:event.target.value})
//     }

//     onChangePhoto = (event) => {
//         setState({photo:event.target.files[0]})
//     }

//     onChangeWhatsApp = (event) => {
//         setState({whatsappnumber:event.target.value})
//     }

//     onSubmitRegisterYTMC = (event) => {
//         event.preventDefault()
//         const {name,channelUrl,state,district,constituency,photo,whatsappnumber,selectedConstituency} = state
//         console.log(state)

//         setState((prevState) => ({registeredStatus:!prevState.registeredStatus}))
//     }

//     onLogOut = () => {
//       googleLogout()
//       window.location.href = '/';
//     }


//     render(){
//         const {name,channelUrl,state,district,constituency,photo,whatsappnumber,selectedConstituency,registeredStatus} = state
//         // const {Googlename,email} = props.route.params
//         // console.log(Googlename)
//         // console.log(email)
//         return (
//         <div className="ytmcregister-main-container">
//             {registeredStatus===false && (
//                 <>
//             <div className="ytmcregister-top-container">
//                 <h1>Register</h1>
//             </div>
//             <div className="ytmcregister-form-container">
//             <form onSubmit={onSubmitRegisterYTMC}>
//                 <div className="ytmcregister-cont-ele">
//                 <label htmlFor="username">Username</label>
//                 <br/>
//                 <input placeholder="Enter the Name" onChange={onChangeName} className="ytmcregister-user-input" type="text" id="username" required/>
//                 </div>
//                 <div className="ytmcregister-cont-ele">
//                 <label htmlFor="channelurl">Channel URL</label>
//                 <br/>
//                 <input placeholder="Enter the Channel Url" onChange={onChangeChannelUrl} className="ytmcregister-user-input" type="url" id="channelurl" required/>
//                 </div>
//                 <div className="ytmcregister-cont-ele">
//                     <label htmlFor="state">State</label>
//                     <br/>
//                     <select className="ytmcregister-user-input" id="state" onChange={onChangeState} value={state}>
//                         {states.map((ele) =>  <option key={ele}>{ele}</option>)}
//                     </select>
//                     {/* <input placeholder="Enter the State : E.g: Bihar" onChange={onChangeState} type="text" className="ytmchome-user-input" required/> */}
//                 </div>
//                 <div className="ytmcregister-cont-ele">
//                     <label htmlFor="district">District</label>
//                     <br/>
//                     <select onChange={onChangeDistrict} id="district" className="ytmcregister-user-input">
//                         <option>SELECT</option>
//                         {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
//                     </select>
//                     </div>
//                     <div className="ytmcregister-cont-ele">
//                     <label htmlFor="constituency">Constituency</label>
//                     <br/>
//                     <select onChange={onChangeConstituency} id="constituency" className="ytmcregister-user-input" >
//                         {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
//                     </select>
//                 </div>
//                 {/* <div className="ytmcregister-cont-ele">
//                     <label htmlFor="photo">Photo</label>
//                     <br/>
//                     <input className="ytmcregister-user-input" onChange={onChangePhoto} type="file" id="photo" required/>
//                 </div> */}
//                 <div className="ytmcregister-cont-ele">
//                     <label htmlFor="whatsappno">Whatsapp Number</label>
//                     <br/>
//                     <input onChange={onChangeWhatsApp} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="ytmcregister-user-input" type="tel" id="whatsappno" required/>
//                 </div>
//                 <button className="fetchBtn" type="submit">Register</button>
//             </form>
//         </div>
//         </>
//         )}
//         {registeredStatus && (
//             <div style={{textAlign:'center'}} className="ytmcregister-form-container">
//                 <img style={{height:'50px',width:'50px'}} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image"/>
//                 <h1>Your Registration is Pending...</h1>
//                 <p>We will get back to you soon.</p>
//                 <button onClick={onLogOut} type="button" className="last24HrsBtn">Log Out</button>
//             </div>
//         )}
//         </div>
//         )
//     }
// }

// export default YTMCRegister