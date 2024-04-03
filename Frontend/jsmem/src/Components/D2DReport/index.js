import "./indexd2d.css"
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import StatsItem from '../StatsItem'


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


class D2DReport extends Component{
    state = {statsList:[], date : '',CampNo:'',CampName:'',THV:'',TPO:'',TWC:'',TSS:'',TYCS:'',TNRB:'',TNS:'',TCD:'',TV:''}

    componentDidMount = () => {
        const stat = localStorage.getItem("statsList2")
        if(stat)
        this.setState({statsList:JSON.parse(stat)})
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }

    onSubmitStatsForm = (event) => {
        event.preventDefault()
        const {statsList,date,CampNo,CampName,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD} = this.state
        const newObj = 
        {id:uuidv4(),date,CampNo,CampName,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD}
        const newStatList = [...statsList,newObj]
        localStorage.setItem("statsList2",JSON.stringify(newStatList))
        this.setState({statsList:newStatList})
    }

    render(){
        const {statsList,date,CampNo} = this.state
    return (
        <div className="main-container">
            <div className="top-container">
            <Link to="/" className="link-item">
                    <div className="flexi3">
                    <img src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" className="logo-img2" alt="logo"/>
                    <h2 className="main-heading1">JS Member</h2>
                    <h3>Camp Number : 1</h3>
                    </div>
                    </Link>
                    <div className="inner-top-container">
                    <h1>D2D Report</h1>
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
                            <form className="stats-form" onSubmit={this.onSubmitStatsForm}>
                                <h1>Enter D2D</h1>
                                <div className="stats-inp-cont">
                                <label htmlFor="date">Date</label>
                                <br/>
                                <input name="date" onChange={this.handleChange} className="stats-inp-ele" id="date" type="date" alt="date"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label  htmlFor="campNo">Camp Number</label>
                                <br/>
                                <input id="campNo" name="CampNo" onChange={this.handleChange} className="stats-inp-ele" type="number" placeholder="Enter the Camp Number " alt="campNo"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="campName">Camp Name</label>
                                <br/>
                                <input className="stats-inp-ele" name="CampName" onChange={this.handleChange} id="campName" type="text" placeholder="Enter the Camp Name" alt="campName"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="THV">THV (Total Household Visit)</label>
                                <br/>
                                <input name="THV" onChange={this.handleChange} className="stats-inp-ele" id="THV" type="text" placeholder="Enter the THV" alt="THV"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TPO">TPO (Total People Outreach)</label>
                                <br/>
                                <input name="TPO" onChange={this.handleChange} className="stats-inp-ele" id="TPO" type="text" placeholder="Enter the TPO" alt="TPO"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TWC">TWC (Total Whatsapp Count)</label>
                                <br/>
                                <input name="TWC" onChange={this.handleChange} className="stats-inp-ele" id="TWC" type="text" placeholder="Enter the TWC" alt="TWC"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TWC">TSS (Total Sansthapak Sadasya)</label>
                                <br/>
                                <input name="TSS" onChange={this.handleChange} className="stats-inp-ele" id="TSS" type="text" placeholder="Enter the TSS" alt="TSS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TYCS">TYCS (Total Youtube Channel Subscribers)</label>
                                <br/>
                                <input name="TYCS" onChange={this.handleChange} className="stats-inp-ele" id="TYCS" type="text" placeholder="Enter the TYCS" alt="TYCS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TNRB">TNRB (Total Non Resident Bihari)</label>
                                <br/>
                                <input name="TNRB" onChange={this.handleChange} className="stats-inp-ele" id="TNRB" type="text" placeholder="Enter the TNRB" alt="TNRB"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TNS">TNS (Total Nukkad Sabha)</label>
                                <br/>
                                <input name="TNS" onChange={this.handleChange} className="stats-inp-ele" id="TNS" type="text" placeholder="Enter the TNS" alt="TNS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TCD">TCD (Total Collateral Distributed)</label>
                                <br/>
                                <input name="TCD" onChange={this.handleChange} className="stats-inp-ele" id="TCD" type="text" placeholder="Enter the TCD" alt="TCD"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TV">TV (Total Villages)</label>
                                <br/>
                                <input name="TV" onChange={this.handleChange} className="stats-inp-ele" id="TV" type="text" placeholder="Enter the TV" alt="TCD"/>
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
                            <button className="fetchBtn" type="submit">Add</button>
                            </div>

                            </form>
                            </div>                        </div>
                        )}
                    </Popup>
                    <div className="date-cont">
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
                    <Link className="nav-link" to="/comingsoon">
                    <button className="nav-button">Attendance</button>
                    </Link>
                    <br/>
                    <button className="nav-button">D2D Report</button>
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
                    {(statsList.length!==0) && (
                        statsList.map((ele) => <StatsItem key={ele.id} statDetails={ele} />
                        ))}
                    <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Team Number
                    </th>
                    <th>
                        Team Name
                    </th>
                    <th>
                      Team Lead Name
                    </th>
                    <th>
                      District
                    </th>
                    <th>
                      Constituency
                    </th>
                    <th>
                      Block
                    </th>
                    <th>
                      Panchayat
                    </th>
                    <th>
                      Village
                    </th>
                    <th>
                    THV
                    </th>
                    <th>
                        TPO
                    </th>
                    <th>
                        TWC
                    </th>
                    <th>
                        TSS
                    </th>
                    <th>
                        TYCS
                    </th>
                    <th>
                        TNRB
                    </th>
                    <th>
                        TNS
                    </th>
                    <th>
                        TCD
                    </th>
                    <th>
                      TV
                    </th>
                    <th>
                        Edit
                    </th>
                </tr>
                </thead>
                {/* <tfoot>
                    <tr>
                        <th colSpan="3">Total</th>
                        <th>{views}</th>
                        <th>{likes}</th>
                        <th>{comments}</th>
                        <th>{rewards}</th>
                    </tr>
                </tfoot> */}
                </table>
            </div>
            </div>
        </div>
        </div>
        );
}
}
export default D2DReport