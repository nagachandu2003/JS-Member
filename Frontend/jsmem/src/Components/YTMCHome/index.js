import "./index.css"
import {Component} from 'react'
import { googleLogout } from '@react-oauth/google';
import {Navigate} from 'react-router-dom'
import DistrictItem from '../DistrictItem'
import {Popup} from 'reactjs-popup'
import {v4 as uuidv4} from 'uuid'

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

class YTMCHome extends Component{
    state = {channelUrl:'',channelsList:[]}
    

    onChangeChannelUrl = (event) => {
        this.setState({channelUrl:event.target.value})
    }

    onClickAddChannel = (event) => {
      event.preventDefault()
      const {channelUrl,channelsList} = this.state
      const newObj = [...channelsList,{channelUrl,id:uuidv4()}]
      this.setState({channelsList:newObj})
    }

    onClickLogout = () => {
        googleLogout();
        console.log("Logged out successfully")
        window.location.href="/ytmclogin"
        // return <Navigate to="/ytmclogin" replace={true}/>
    }

    render(){
      const {channelsList} = this.state
        return (
            <>
            <div className="ytmchome-main-container">
                <div>
                <Popup
                        trigger={<button className="ytmcreportBtn">+</button>}
                        modal
                        nested
                    >
                        {close => (
                        <div className="modal custom-popup">
                            {
                            /* <button className="close " onClick={close}>
                            &times;
                            </button> */
                            }
                            {/* <div className="header popup-cont"> Add Link </div> */}
                            <div className="content popup-cont2">
                            <form onSubmit={this.onSubmitUrl}>
                                <div>
                                <label htmlFor="channelurl">Channel URL</label>
                                <br/>
                                <input placeholder="Enter the Channel Url" onChange={this.onChangeChannelUrl} className="user-input2" type="url" id="channelurl" required/>
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
                            <button className="fetchBtn" onClick={this.onClickAddChannel} type="submit">Add Channel</button>
                            </div>

                            </form>
                            </div>                        
                            </div>
                        )}
                    </Popup>
                    </div>
                <div className="ytmchome-top-container">
                    <div className="ytmchome-top-flex-container">
                    <h1>YTMC</h1>
                    <button onClick={this.onClickLogout} type="button" className="logoutBtn">Log Out</button>
                    </div>
                </div>
                <div className="ytmchome-flex-container1">
                
                <div className="ytmchome-left-container">
                    <ul className="ytmchome-list-container">
                        <li className="ytmchome-list-item">Report</li>
                        <li className="ytmchome-list-item">Reward</li>
                        <li className="ytmchome-list-item">Content</li>
                        <li className="ytmchome-list-item">Profile</li>
                    </ul>
                </div>
                <div className="ytmchome-content-container">
                    <h1>Your Channels</h1>
                    {(channelsList.length===0)? (<p>Please add Channels</p>):
                    (<ul className="ytmchome-channel-container">
                      {channelsList.map((ele) => <li className="ytmchome-channel-item" key={ele.id}>
                        <a href={ele.channelUrl} target="_blank" rel="noreferrer">{ele.channelUrl}</a></li>)}
                    </ul>)
                    }
                </div>
                </div>
            </div>
            <footer className="ytmchome-footer">
                <ul className="ytmchome-list-container2">
                    <li className="ytmchome-list-item2">Report</li>
                    <li className="ytmchome-list-item2">Reward</li>
                    <li className="ytmchome-list-item2">Content</li>
                    <li className="ytmchome-list-item2">Profile</li>
                </ul>
            </footer>
            </>
        )
    }
}

export default YTMCHome