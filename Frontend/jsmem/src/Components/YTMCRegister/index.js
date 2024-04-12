import "./index.css"
import { Component } from "react";
import DistrictItem from "../DistrictItem";

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

class YTMCRegister extends Component {
    state = {name:'',channelUrl:'',state:'Bihar',district:'SELECT',constituency:'',photo:'',whatsappnumber:'',selectedConstituency:'SELECT',registeredStatus:false}
    
    onChangeSearchInput = (event) => {
        this.setState({userinput:event.target.value})
    }

    onChangeName = (event) => {
        this.setState({name:event.target.value})
    }

    onChangeChannelUrl = (event) => {
        this.setState({channelUrl:event.target.value})
    }

    onChangeState = (event) => {
        this.setState({state:event.target.value})
    }

    onChangeDistrict = (event) => {
        this.setState({district:event.target.value})
    }

    onChangeConstituency = (event) => {
        this.setState({selectedConstituency:event.target.value})
    }

    onChangePhoto = (event) => {
        this.setState({photo:event.target.files[0]})
    }

    onChangeWhatsApp = (event) => {
        this.setState({whatsappnumber:event.target.value})
    }

    onSubmitRegisterYTMC = (event) => {
        event.preventDefault()
        const {name,channelUrl,state,district,constituency,photo,whatsappnumber,selectedConstituency} = this.state

        this.setState((prevState) => ({registeredStatus:!prevState.registeredStatus}))
    }


    render(){
        const {name,channelUrl,state,district,constituency,photo,whatsappnumber,selectedConstituency,registeredStatus} = this.state
        return (
        <div className="ytmcregister-main-container">
            {registeredStatus===false && (
                <>
            <div className="ytmcregister-top-container">
                <h1>Register</h1>
            </div>
            <div className="ytmcregister-form-container">
            <form onSubmit={this.onSubmitRegisterYTMC}>
                <div className="ytmcregister-cont-ele">
                <label htmlFor="username">Username</label>
                <br/>
                <input placeholder="Enter the Name" onChange={this.onChangeName} className="ytmcregister-user-input" type="text" id="username" required/>
                </div>
                <div className="ytmcregister-cont-ele">
                <label htmlFor="channelurl">Channel URL</label>
                <br/>
                <input placeholder="Enter the Channel Url" onChange={this.onChangeChannelUrl} className="ytmcregister-user-input" type="url" id="channelurl" required/>
                </div>
                <div className="ytmcregister-cont-ele">
                    <label htmlFor="state">State</label>
                    <br/>
                    <select className="ytmcregister-user-input" id="state" onChange={this.onChangeState} value={state}>
                        {states.map((ele) =>  <option key={ele}>{ele}</option>)}
                    </select>
                    {/* <input placeholder="Enter the State : E.g: Bihar" onChange={this.onChangeState} type="text" className="ytmchome-user-input" required/> */}
                </div>
                <div className="ytmcregister-cont-ele">
                    <label htmlFor="district">District</label>
                    <br/>
                    <select onChange={this.onChangeDistrict} id="district" className="ytmcregister-user-input">
                        <option>SELECT</option>
                        {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
                    </select>
                    </div>
                    <div className="ytmcregister-cont-ele">
                    <label htmlFor="constituency">Constituency</label>
                    <br/>
                    <select onChange={this.onChangeConstituency} id="constituency" className="ytmcregister-user-input" >
                        {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                    </select>
                </div>
                <div className="ytmcregister-cont-ele">
                    <label htmlFor="photo">Photo</label>
                    <br/>
                    <input className="ytmcregister-user-input" onChange={this.onChangePhoto} type="file" id="photo" required/>
                </div>
                <div className="ytmcregister-cont-ele">
                    <label htmlFor="whatsappno">Whatsapp Number</label>
                    <br/>
                    <input onChange={this.onChangeWhatsApp} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="ytmcregister-user-input" type="tel" id="whatsappno" required/>
                </div>
                <button className="fetchBtn" type="submit">Register</button>
            </form>
        </div>
        </>
        )}
        {registeredStatus && (
            <div style={{textAlign:'center'}} className="ytmcregister-form-container">
                <img style={{height:'50px',width:'50px'}} src="https://imgs.search.brave.com/pCrYBKil64ozCVM6c4QGMgFj6qCLcSGLMTSRHJOimbw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzgxLzM0Lzc4/LzM2MF9GXzU4MTM0/Nzg5N19zZ1lnVEVR/MFBCSEtONER3dXhX/UkFucGxOemtlNXNk/Ni5qcGc" alt="image"/>
                <h1>Your Registration is Pending...</h1>
                <p>We will get back to you soon.</p>
            </div>

        )}
        </div>
        )
    }
}

export default YTMCRegister