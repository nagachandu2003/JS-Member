import "./index.css"
import {Link} from 'react-router-dom'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup'
import DistrictItem from "../DistrictItem"
// 1. Add Link 
// 2. Create a table view with views , likes , comment count 
// 3. Add a date range filter to fetch the values got in these date , a quickly last 24 hours And last 48 hours button in the filter

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
  

class Camps extends Component {

    state = {yturl:'',usersList:[],recordCount:0,name:'',channelUrl:'',state:'Bihar',district:'SELECT',constituency:'',photo:'',whatsappnumber:'',selectedConstituency:'SELECT'}

    componentDidMount(){
        const reg_users = localStorage.getItem("users")
        if(reg_users)
        this.setState({usersList:JSON.parse(reg_users)})
    }

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


    onDeleteUser = (value) => {
       const {usersList} = this.state      
        const filteredDetails = usersList.filter((ele) => ele.id!==value)
        localStorage.setItem("users",JSON.stringify(filteredDetails))
        this.setState({usersList:filteredDetails})
    }

    onSubmitUrl = (event) => {
        event.preventDefault();
            const {usersList,name,channelUrl,state,district,selectedConstituency,photo,whatsappnumber} = this.state
            const imageUrl = URL.createObjectURL(photo);
            const {recordCount} = this.state // Create object URL for the file  
            console.log(whatsappnumber)
            const newObj = {
                id : uuidv4(),
                recordCount:recordCount+1,
                name,
                channelUrl,
                state,
                district,
                selectedConstituency,
                imageUrl,
                whatsappnumber
            } // Set the image source to the preview image element
            const newList = [...usersList,newObj]
            localStorage.setItem("users",JSON.stringify(newList))
            this.setState({usersList:newList,recordCount:recordCount+1})
        // const {name,channelUrl,state,district,constituency,photo,whatsappnumber} = this.state
            console.log(this.state);
    }

    render(){
        const {usersList,name,channelUrl,state,constituency,district,photo,whatsappnumber,selectedConstituency} = this.state
        return (
            <div className="main-container">
                <div className="top-container">
                    <Link to="/" className="link-item">
                    <div className="flexi3">
                    <img className="logo-img2" src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" alt="logo"/>
                    <h2 className="main-heading1">JS MEMBER</h2>
                    <h3>Camp No</h3>
                    </div>
                    </Link>
                    <div className="inner-top-container">
                    <h1>Camps</h1>
                    {/* <button className="addBtn" type="button">Add</button> */}
                        <Popup
                        trigger={<button className="addBtn" type="button"> Add </button>}
                        modal
                        nested
                    >
                        {close => (
                        <div className="modal custom-popup">
                            {/* <button className="close " onClick={close}>
                            &times;
                            </button> */}
                            {/* <div className="header popup-cont"> Add Link </div> */}
                            <div className="content popup-cont2">
                            <form onSubmit={this.onSubmitUrl}>
                                <div className="stats-inp-cont">
                                <label htmlFor="username">Username</label>
                                <br/>
                                <input placeholder="Enter the Name" onChange={this.onChangeName} className="user-input2" type="text" id="username" required/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="channelurl">Channel URL</label>
                                <br/>
                                <input placeholder="Enter the Channel Url" onChange={this.onChangeChannelUrl} className="user-input2" type="url" id="channelurl" required/>
                                </div>
                                <div className="stats-inp-cont">
                                    <label htmlFor="state">State</label>
                                    <br/>
                                    <select className="select-input" id="state" onChange={this.onChangeState} value={state}>
                                        {states.map((ele) =>  <option key={ele}>{ele}</option>)}
                                    </select>
                                    {/* <input placeholder="Enter the State : E.g: Bihar" onChange={this.onChangeState} type="text" className="user-input2" required/> */}
                                </div>
                                <div className="stats-inp-cont">
                                    <label htmlFor="district">District</label>
                                    <br/>
                                    <select onChange={this.onChangeDistrict} id="district" className="select-input">
                                        <option>SELECT</option>
                                        {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
                                    </select>
                                    </div>
                                    <div className="stats-inp-cont">
                                    <label htmlFor="constituency">Constituency</label>
                                    <br/>
                                    <select onChange={this.onChangeConstituency} id="constituency" className="select-input" >
                                        {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                                    </select>
                                </div>
                                <div className="stats-inp-cont">
                                    <label htmlFor="photo">Photo</label>
                                    <br/>
                                    <input className="user-input2" onChange={this.onChangePhoto} type="file" accept="images/*" id="photo" required/>
                                </div>
                                <div className="stats-inp-cont">
                                    <label htmlFor="whatsappno">Whatsapp Number</label>
                                    <br/>
                                    <input onChange={this.onChangeWhatsApp} placeholder="Enter the whatsapp number E.g : +91 987654321" pattern="^\+91(?:[0-9] ?){6,14}[0-9]$" className="user-input2" type="tel" id="whatsappno" required/>
                                </div>
                                <div className="actions">
                            <button
                                className="button closeBtn"
                                onClick={() => {
                                console.log('modal closed ');
                                close();
                                }}
                            >
                                Cancel
                            </button>
                            <button className="fetchBtn" type="submit">Add User</button>
                            </div>

                            </form>
                            </div>                        </div>
                        )}
                    </Popup>
                    <div className="date-cont">
                        <p>Beta Testing</p>
                    <p>{(new Date()).toDateString()}</p>
                    </div>
                    </div>
                </div>
                <div className="flex-cont1">
                <div className="left-container">
                    <div className="left-container-items">
                    <Link className="nav-link" to="/stats">
                    <button className="nav-button">Stats</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/attendance">
                    <button className="nav-button">Attendance</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/d2dreport">
                    <button className="nav-button">D2D Report</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/comingsoon">
                    <button className="nav-button">Team</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/members">
                    <button className="nav-button">Member</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/comingsoon">
                    <button className="nav-button">Support</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/support">
                    <button className="nav-button">Help</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/comingsoon">
                    <button className="nav-button">Camp Details</button>
                    </Link>
                    <br/>
                    <Link className="nav-link" to="/settings">
                    <button className="nav-button">Settings</button>
                    </Link>
                    <br/>
                    </div>
                </div>
                <div className="main-inner-container">
                    <div className="table-container">
                <table>
                    {/* {(usersList.length!==0) && (
                        usersList.map((ele) => <UserItem key={ele.id} userDetails={ele} onDeleteUser={this.onDeleteUser}/>
                        ))} */}
                    <thead>
                <tr>
                    <th>
                        Sno
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        Photo
                    </th>
                    <th>
                        ChannelURL
                    </th>
                    <th>
                    State
                    </th>
                    <th>
                        District
                    </th>
                    <th>
                        Constituency
                    </th>
                    <th>
                        WhatsApp Number
                    </th>
                    <th>
                        Edit/
                        Delete
                    </th>
                </tr>
                </thead>
                </table>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default Camps