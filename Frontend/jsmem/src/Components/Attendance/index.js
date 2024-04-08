import "./attendance.css"
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AttendanceItem from '../AttendanceItem'



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


class Attendance extends Component{
    state = {statsList:[], date : '',viewMark:false,newAttendanceList:[]}

    componentDidMount = () => {
        let atte = localStorage.getItem("attendanceList")
        let stat = localStorage.getItem("statsListm")
        if(atte)
        this.setState({newAttendanceList:JSON.parse(atte)})
        if(stat){
          stat = JSON.parse(stat)
          stat = stat.map((ele) => {
            return {...ele,present:"",attendDate:''}
          })
          this.setState({statsList:stat})
        }

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }

      onChangeDate = (event) => {
        this.setState({date:event.target.value})
      }

      onClickMarkAttendance = () => {
        this.setState((prevState) => ({viewMark:!prevState.viewMark}))
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

    onChangePresentStatus = (uno,sta) => {
      const {statsList,date} = this.state
      const updatedList = statsList.map((ele) => {
        if(ele.id===uno)
        {
          return {...ele,present:sta,date}
        }
        return ele
      })
      this.setState({statsList:updatedList})
    }

    onClickSave = () => {
      const {statsList,newAttendanceList,date,viewMark} = this.state
      let present = 0;
      let absent = 0;
        statsList.forEach((ele) => {
          if(ele.present==="present")
          present += 1;
          if(ele.present==="absent")
          absent += 1;
        })
      const newLi = [...newAttendanceList,{
        date,
        totMembers:statsList.length,
        totPresent:present,
        totAbsent:absent
      }]
      localStorage.setItem("attendanceList",JSON.stringify(newLi))
      this.setState({newAttendanceList:newLi,viewMark:!viewMark})
    }

    render(){
        let {statsList,date,viewMark,newAttendanceList} = this.state
        // console.log(newAttendanceList)
        if(statsList.length===0)
        alert("Add Members to mark attendance")
        let present = 0;
        let absent = 0;
        statsList.forEach((ele) => {
          if(ele.present==="present")
          present += 1;
          if(ele.present==="absent")
          absent += 1;
        })
        // const uniqueDates = [...new Set(statsList.map(obj => obj.date))];
        // console.log(uniqueDates)
    return (
        <div className="main-container">
            <div className="top-container">
            <Link to="/" className="link-item">
                    <div className="flexi3">
                    <img src="https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" className="logo-img2" alt="logo"/>
                    <h2 className="main-heading1">JS MEMBER</h2>
                    <h3>Camp No : 1</h3>
                    </div>
                    </Link>
                    <div className="inner-top-container">
                    <h1>Attendance</h1>
                    <button onClick={this.onClickMarkAttendance} className="addBtn" type="button"> Mark Attendance </button>
                    <div className="date-cont">
                    <p>{(new Date()).toDateString()}</p>
                    <p>Beta</p>
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
                    {/* <Link className="nav-link" to="/comingsoon"> */}
                    <button className="nav-button">Attendance</button>
                    {/* </Link */}
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
                    { viewMark===false && (
                    <table> 
                    {/* {(statsList.length!==0) && (
                        statsList.map((ele) => <StatsItem key={ele.id} statDetails={ele} onDeleteReport={this.onDeleteReport} />
                        ))} */}
                    <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Total Members
                    </th>
                    <th>
                        Present
                    </th>
                    <th>
                        Absent
                    </th>
                </tr>
                </thead>
                <tbody>
                  {newAttendanceList.map((ele) => {
                    return (<tr key={ele.date}>
                      <td>{ele.date}</td>
                      <td>{ele.totMembers}</td>
                      <td>{ele.totPresent}</td>
                      <td>{ele.totAbsent}</td>
                    </tr>)
                  })}
                </tbody>
                <tfoot>
                    {/* <tr>
                        <th colSpan="9">Total</th>
                        <th>{THV}</th>
                        <th>{TPO}</th>
                        <th>{TWC}</th>
                        <th>{TSS}</th>
                        <th>{TYCS}</th>
                        <th>{TNRB}</th>
                        <th>{TNS}</th>
                        <th>{TCD}</th>
                        <th>{TV}</th>
                    </tr> */}
                </tfoot>
                </table>
                )}
                {viewMark===true && (
                  <>
                  <table>
                  <thead>
                    <tr >
                      <th colSpan="4">
                        Date
                      </th>
                      <th colSpan="3">
                        <input type="date" onChange={this.onChangeDate}/>
                      </th>
                    </tr>
                  <tr>
                      <th>
                          S.No.
                      </th>
                      <th>
                          JSID
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Number
                      </th>
                      <th>
                        Total Present
                      </th>
                      <th>
                          Total Absent
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {statsList.map((ele,index) => <AttendanceItem sno={index+1} key={ele.id} attendDetails={ele} onChangePresentStatus={this.onChangePresentStatus}/>)}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="4">
                        Total
                      </th>
                      <th>
                        {present}
                      </th>
                      <th>
                        {absent}
                      </th>
                    </tr>
                </tfoot>
                  </table>
                  <button onClick={this.onClickMarkAttendance} className="cancelBtn">Cancel</button>
                  <button type="button" onClick={this.onClickSave} className="saveBtn">Save</button>
                  </>
                )}
            </div>
            </div>
        </div>
        </div>
        );
}
}
export default Attendance