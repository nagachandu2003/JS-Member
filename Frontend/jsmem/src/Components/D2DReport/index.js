import "../D2DReport/indexd2d.css"
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import StatsItem from '../StatsItem'
import DistrictItem from "../DistrictItem"
import Navbar from '../Navbar'
import Dashboard from '../Dashboard'

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
    
const blocks = {
        "SELECT" : ["SELECT"],
        "ARARIA": [
          "Araria",
          "Bhargama",
          "Forbesganj",
          "Jokihat",
          "Kursakanta",
          "Narpatganj",
          "Palasi",
          "Raniganj",
          "Sikti"
        ],
        "ARWAL": [
          "Arwal",
          "Kaler",
          "Kurtha",
          "Sonbhadra-Bikramganj"
        ],
        "AURANGABAD": [
          "Aurangabad",
          "Barun",
          "Daudnagar",
          "Deo",
          "Goh",
          "Haspura",
          "Kutumba",
          "Madanpur",
          "Nabinagar",
          "Obra",
          "Rafiganj"
        ],
        "BANKA": [
          "Amarpur",
          "Banka",
          "Barahat",
          "Belhar",
          "Chandan",
          "Dhoraiya",
          "Katoria",
          "Phulidumar",
          "Shambhuganj"
        ],
        "BEGUSARAI": [
          "Bachhwara",
          "Bakhri",
          "Barauni",
          "Begusarai",
          "Bhagwanpur",
          "Birpur",
          "Cheria Bariarpur",
          "Mansurchak",
          "Matihani",
          "Naokothi",
          "Sahebpur Kamal",
          "Teghra"
        ],
        "BHAGALPUR": [
          "Bhagalpur",
          "Colgong",
          "Kahalgaon",
          "Kharik",
          "Narayanpur",
          "Pirpainti",
          "Sabour",
          "Sultanganj"
        ],
        "BHOJPUR": [
          "Agiaon",
          "Arrah",
          "Barhara",
          "Behea",
          "Charpokhari",
          "Garhani",
          "Jagdishpur",
          "Koilwar",
          "Piro",
          "Sahar",
          "Sandesh",
          "Shahpur"
        ],
        "BUXAR": [
          "Buxar",
          "Chausa",
          "Dumraon",
          "Itarhi",
          "Nawanagar",
          "Rajpur"
        ],
        "DARBHANGA": [
          "Alinagar",
          "Bahadurpur",
          "Benipur",
          "Biraul",
          "Ghanshyampur",
          "Hanuman Nagar",
          "Hayaghat",
          "Jale",
          "Keoti",
          "Kiratpur",
          "Kusheshwar Asthan",
          "Singhwara"
        ],
        "PURVI CHAMPARAN": [
          "Adapur",
          "Areraj",
          "Banjariya",
          "Chakia",
          "Chiraia",
          "Dhaka",
          "Harsidhi",
          "Kesaria",
          "Kotwa",
          "Madhuban",
          "Motihari",
          "Paharpur",
          "Pakridayal",
          "Phenhara",
          "Piprakothi",
          "Raxaul",
          "Sangrampur",
          "Sugauli",
          "Tetaria",
          "Turkaulia"
        ],
        "GAYA": [
          "Belaganj",
          "BodhGaya",
          "Dobhi",
          "Fatehpur",
          "GayaTown",
          "Guraru",
          "Imamganj",
          "Khizarsarai",
          "Manpur",
          "Mohanpur",
          "Paraiya",
          "Sherghati",
          "Tankuppa"
        ],
        "GOPALGANJ": [
          "Baikunthpur",
          "Barauli",
          "Bhorey",
          "Gopalganj",
          "Hathua",
          "Kuchaikote",
          "Manjha",
          "Phulwaria",
          "Sidhwalia",
          "Thawe",
          "Uchkagaon"
        ],
        "JAMUI": [
          "Barhat",
          "Chakai",
          "Gidhaur",
          "IslamnagarAliganj",
          "Jamui",
          "Jhajha",
          "Khaira",
          "Lakshmipur",
          "Sikandra",
          "Sono"
        ],
        "JEHANABAD": [
          "Ghoshi",
          "Hulasganj",
          "Jehanabad",
          "Kako",
          "Makhdumpur",
          "Modanganj",
          "Parbatta",
          "RatniFaridpur"
        ],
        "KAIMUR (BHABHUA)": [
          "Adhaura",
          "Bhabua",
          "Chainpur",
          "Chand",
          "Durgawati",
          "Kudra",
          "Mohania",
          "Ramgarh",
          "Rampur",
          "Rohtas"
        ],
        "KATIHAR": [
          "Amdabad",
          "Azamnagar",
          "Balrampur",
          "Barari",
          "Barsoi",
          "Dandkhora",
          "Falka",
          "Hasanganj",
          "Kadwa",
          "Katihar",
          "Korha",
          "Manihari"
        ],
        "KHAGARIA": [
          "Alauli",
          "Beldaur",
          "Chautham",
          "Gogri",
          "Khagaria",
          "Mansi",
          "Parbatta"
        ],
        "KISHANGANJ": [
          "Bahadurganj",
          "Dighalbank",
          "Kishanganj",
          "Kochadhaman",
          "Pothia",
          "Terhagachh",
          "Thakurganj"
        ],
        "LAKHISARAI": [
          "Barahiya",
          "Halsi",
          "Lakhisarai",
          "Pipariya",
          "RamgarhChowk"
        ],
        "MADHEPURA": [
          "Alamnagar",
          "Bihariganj",
          "Chausa",
          "Ghelarh",
          "Kumarkhand",
          "Madhepura",
          "Murliganj",
          "Puraini",
          "Singheshwar"
        ],
        "MADHUBANI": [
          "Andhratharhi",
          "Babubarhi",
          "Basopatti",
          "Benipatti",
          "Bisfi",
          "Harlakhi",
          "Jainagar",
          "Jhanjharpur",
          "Kaluahi",
          "Khajauli",
          "Ladania",
          "Laukahi",
          "Laukaha",
          "Madhubani",
          "Madhwapur",
          "Pandaul",
          "Phulparas",
          "Rajnagar",
          "Sahidabad"
        ],
        "MUNGER": [
          "Asarganj",
          "Bariarpur",
          "Dharhara",
          "HaveliKharagpur",
          "Jamalpur",
          "Kharagpur",
          "Munger",
          "Tarapur"
        ],
        "MUZAFFARPUR": [
          "Ahiapur",
          "Bandra",
          "Baruraj",
          "Bochaha",
          "Gaighat",
          "Kanti",
          "Katra",
          "Kurhani",
          "Marwan",
          "Minapur",
          "Motipur",
          "Mushahari",
          "Paroo",
          "Sahebganj",
          "Saraiya"
        ],
        "NALANDA": [
          "Asthawan",
          "Ben",
          "Biharsharif",
          "Bind",
          "Chandi",
          "Ekangarsarai",
          "Giriyak",
          "Harnaut",
          "Islampur",
          "KaraiParsurai",
          "NagarNausa",
          "Noorsarai",
          "Rahui",
          "Rajgir",
          "Sarmera",
          "Silao",
          "Tharthari"
        ],
        "NAWADA": [
          "Akbarpur",
          "Gobindpur",
          "Hisua",
          "KashiChak",
          "Meskaur",
          "Narhat",
          "Nawada",
          "Pakribarawan",
          "Rajauli",
          "Roh"
        ],
        "PASCHIM CHAMPARAN": [
          "Bagaha",
          "Bairia",
          "Bhitaha",
          "Jogapatti",
          "Lauriya",
          "Madhuban",
          "Narkatiaganj",
          "Ramnagar",
          "Sikta",
          "Thakrahan"
        ],
        "PATNA": [
          "Athmalgola",
          "Bakhtiarpur",
          "Barh",
          "Belchhi",
          "Bihta",
          "Bikram",
          "Daniawan",
          "Dhanarua",
          "DulhinBazar",
          "Fatwah",
          "Khusrupur",
          "Maner",
          "Masaurhi",
          "Naubatpur",
          "Paliganj",
          "Pandarak",
          "PatnaSadar",
          "PhulwariSharif"
        ],
        "PURNIA": [
          "Amour",
          "Baisi",
          "Banmankhi",
          "Bhawanipur",
          "Dagarua",
          "Dhamdaha",
          "Jalalgarh",
          "Kasba",
          "KrityanandNagar",
          "PurniaEast",
          "PurniaWest",
          "Rupauli",
          "Srinagar",
          "Visheshwarganj"
        ],
        "ROHTAS": [
          "AkorhiGola",
          "Bhabua",
          "Chainpur",
          "Chenari",
          "Dalmianagar",
          "Dawath",
          "Dehri",
          "Dinara",
          "Karakat",
          "Kargahar",
          "Kochas",
          "Nasriganj",
          "Nauhatta",
          "Nokha"
        ],
        "SAHARSA": [
          "BanmaItahari",
          "Kahara",
          "Mahishi",
          "Nauhatta",
          "Salkhua",
          "Sonbarsa",
          "SaurBazar",
          "SimriBakhtiarpur"
        ],
        "SAMASTIPUR": [
          "Bibhutpur",
          "Bithan",
          "Dalsinghsarai",
          "Hasanpur",
          "Khanpur",
          "Mohiuddinagar",
          "Morwa",
          "Patori",
          "Rosera",
          "Sarairanjan",
          "ShivajiNagar",
          "Singhia",
          "Tajpur",
          "Ujiarpur",
          "VidyapatiNagar",
          "Warisnagar"
        ],
        "SARAN": [
          "Amnour",
          "Baniapur",
          "Chapra",
          "Dariapur",
          "Dighwara",
          "Ekma",
          "Garkha",
          "Ishupur",
          "Jalalpur",
          "Lahladpur",
          "Maker",
          "Manjhi",
          "Marhaura",
          "Mashrakh",
          "Nagra",
          "Panapur",
          "Parsa",
          "Revelganj",
          "Taraiya"
        ],
        "SHEIKHPURA": [
          "Ariari",
          "Barbigha",
          "Chewara",
          "Ghatkusumbha",
          "Sheikhpura",
          "ShekhopurSarai"
        ],
        "SHEOHAR": [
          "DumriKatsari",
          "Piprarhi",
          "Purnahiya",
          "Sheohar",
          "TarianiChowk"
        ],
        "SITAMARHI": [
          "Bairgania",
          "Bajpatti",
          "Bathnaha",
          "Belsand",
          "Dumra",
          "Majorganj",
          "Nanpur",
          "Parihar",
          "Parsauni",
          "Pupri",
          "Riga",
          "Runnisaidpur",
          "Sonbarsa",
          "Suppi",
          "Sursand",
          "Tetaria"
        ],
        "SIWAN": [
          "Andar",
          "Barharia",
          "Basantpur",
          "BhagwanpurHat",
          "Darauli",
          "Daraundha",
          "Goriakothi",
          "Guthani",
          "HasanPura",
          "Hussainganj",
          "LakriNabiganj",
          "Maharajganj",
          "Mairwa",
          "Nautan",
          "Pachrukhi",
          "Raghunathpur",
          "Siwan"
        ],
        "SUPAUL": [
          "Amour",
          "Birpur",
          "Chhatapur",
          "Kishanpur",
          "Marauna",
          "Nirmali",
          "Pipra",
          "Pratapganj",
          "Raghopur",
          "SaraigarhBhaptiyahi",
          "Supaul",
          "Triveniganj"
        ],
        "VAISHALI": [
          "Bhagwanpur",
          "Bidupur",
          "Chehrakala",
          "Desri",
          "Hajipur",
          "Jandaha",
          "Lalganj",
          "Mahnar",
          "Mahua",
          "PatedhiBelsar",
          "Patepur",
          "Raghopur"
        ]
      }


class D2DReport extends Component{
    state = {statsList:[],TeamName:'', TeamNo:'',TeamLeadName:'', date : '',district:'SELECT',constituency:'',selectedConstituency:'',	Block:'SELECT',	Panchayat:'',	Village:'',THV:'',TPO:'',TWC:'',TSS:'',TYCS:'',TNRB:'',TNS:'',TCD:'',TV:''}

    componentDidMount = () => {
        const stat = localStorage.getItem("statsListd")
        if(stat)
        this.setState({statsList:JSON.parse(stat)})
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }

      onChangeDistrict = (event) => {
        this.setState({district:event.target.value})
    }

    onChangeConstituency = (event) => {
        this.setState({selectedConstituency:event.target.value})
    }

    onChangeBlock = (event) => {
      this.setState({Block:event.target.value})
    }

    onDeleteReport = (value) => {
      const {statsList} = this.state
      const filteredDetails = statsList.filter((ele) => ele.id!==value)
      localStorage.setItem("statsListd",JSON.stringify(filteredDetails))
      this.setState({statsList:filteredDetails})
    }

    onSubmitStatsForm = (event) => {
        event.preventDefault()
        const {statsList,TeamNo,TeamName,TeamLeadName,date ,district,selectedConstituency,	Block,	Panchayat,	Village,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD,TV} = this.state
        const newObj = 
        {id:uuidv4(),TeamNo,TeamName,TeamLeadName,date,district,selectedConstituency,	Block,	Panchayat,	Village,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD,TV}
        const newStatList = [...statsList,newObj]
        console.log(newObj)
        localStorage.setItem("statsListd",JSON.stringify(newStatList))
        this.setState({statsList:newStatList})
    }

    render(){
        const {statsList,date,TeamNo,district} = this.state
        let THV = 0;
        let TPO = 0;
        let TWC = 0;
        let TSS = 0;
        let TYCS = 0;
        let TNRB = 0;
        let TNS = 0;
        let TCD = 0;
       let TV = 0;
       statsList.forEach((ele) => {
        if(ele.THV)
        THV += parseInt(ele.THV)
        if(ele.TPO)
        TPO += parseInt(ele.TPO)
        if(ele.TWC)
        TWC += parseInt(ele.TWC)
        if(ele.TSS)
        TSS += parseInt(ele.TSS)
        if(ele.TYCS)
        TYCS += parseInt(ele.TYCS)
        if(ele.TNRB)
        TNRB += parseInt(ele.TNRB) 
        if(ele.TNS)
        TNS += parseInt(ele.TNS)
        if(ele.TCD)
        TCD += parseInt(ele.TCD)
        if(ele.TV)
        TV += parseInt(ele.TV)
       })
    return (
      <>
            <Navbar/>
        <div className="stats-main-container">
           <div className="stats-sidebar-container">
            <Dashboard />
           </div>
           <div className="stats-content-container">
        <div className="main-container">
            <div className="top-container">
                    <div className="inner-top-container">
                    <h1 className="stats-main-heading">D2D Report</h1>
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
                                <label  htmlFor="teamName">Team Name</label>
                                <br/>
                                <select id="teamName" name="TeamName" onChange={this.handleChange} className="stats-inp-ele">
                                  <option value="Team1">Team1</option>
                                  <option value="Team2">Team2</option>
                                  <option value="Team3">Team3</option>
                                  <option value="Team4">Team4</option>
                                  <option value="Team5">Team5</option>
                                  <option value="Team6">Team6</option>
                                  <option value="Team7">Team7</option>
                                  <option value="Team8">Team8</option>
                                  <option value="Team9">Team9</option>
                                  <option value="Team10">Team10</option>
                                  <option value="Team11">Team11</option>
                                  <option value="Team12">Team12</option>
                                </select>
                                {/* <input id="teamNo" name="TeamNo" onChange={this.handleChange} className="stats-inp-ele" type="number" placeholder="Enter the Camp Number " alt="campNo"/> */}
                                </div>
                                <div className="stats-inp-cont">
                                <label  htmlFor="teamNo">Team Number</label>
                                <br/>
                                <select id="teamNo" name="TeamNo" onChange={this.handleChange} className="stats-inp-ele">
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                </select>
                                {/* <input id="teamNo" name="TeamNo" onChange={this.handleChange} className="stats-inp-ele" type="number" placeholder="Enter the Camp Number " alt="campNo"/> */}
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="teamleadname">Team Lead Name</label>
                                <br/>
                                <input className="stats-inp-ele" name="TeamLeadName" onChange={this.handleChange} id="teamLeadName" type="text" placeholder="Enter the Camp Name" alt="campName"/>
                                </div>
                                <div className="stats-inp-cont">
                                  <label htmlFor="district">District</label>
                                <select onChange={this.onChangeDistrict} id="district" className="stats-inp-ele" required>
                                        <option>SELECT</option>
                                        {options.map((ele) => <DistrictItem key={ele.OptionId} optionDetails={ele} checked/>)}
                                 </select>
                                </div>
                                <div className="stats-inp-cont">
                                    <label htmlFor="constituency">Constituency</label>
                                    <br/>
                                    <select onChange={this.onChangeConstituency} id="constituency" className="stats-inp-ele" required>
                                        {constituencies[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                                    </select>
                                </div>

                                <div className="stats-inp-cont">
                                <label htmlFor="block">Block</label>
                                <br/>
                                <select onChange={this.onChangeBlock} id="block" className="stats-inp-ele" >
                                    {blocks[district].map((ele) => (<option key={ele} value={ele}>{ele}</option>))}
                                </select>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="panchayat">Panchayat</label>
                                <br/>
                                <input name="Panchayat" onChange={this.handleChange} className="stats-inp-ele" id="panchayat" type="text" placeholder="Enter the Panchayat" alt="panchayat" required/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="village">Village</label>
                                <br/>
                                <input name="Village" onChange={this.handleChange} className="stats-inp-ele" id="village" type="text" placeholder="Enter the Village" alt="Village" required/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="THV">THV (Total Household Visit)</label>
                                <br/>
                                <input name="THV" onChange={this.handleChange} className="stats-inp-ele" id="THV" type="number" placeholder="Enter the THV" alt="THV"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TPO">TPO (Total People Outreach)</label>
                                <br/>
                                <input name="TPO" onChange={this.handleChange} className="stats-inp-ele" id="TPO" type="number" placeholder="Enter the TPO" alt="TPO"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TWC">TWC (Total Whatsapp Count)</label>
                                <br/>
                                <input name="TWC" onChange={this.handleChange} className="stats-inp-ele" id="TWC" type="number" placeholder="Enter the TWC" alt="TWC"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TWC">TSS (Total Sansthapak Sadasya)</label>
                                <br/>
                                <input name="TSS" onChange={this.handleChange} className="stats-inp-ele" id="TSS" type="number" placeholder="Enter the TSS" alt="TSS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TYCS">TYCS (Total Youtube Channel Subscribers)</label>
                                <br/>
                                <input name="TYCS" onChange={this.handleChange} className="stats-inp-ele" id="TYCS" type="number" placeholder="Enter the TYCS" alt="TYCS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TNRB">TNRB (Total Non Resident Bihari)</label>
                                <br/>
                                <input name="TNRB" onChange={this.handleChange} className="stats-inp-ele" id="TNRB" type="number" placeholder="Enter the TNRB" alt="TNRB"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TNS">TNS (Total Nukkad Sabha)</label>
                                <br/>
                                <input name="TNS" onChange={this.handleChange} className="stats-inp-ele" id="TNS" type="number" placeholder="Enter the TNS" alt="TNS"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TCD">TCD (Total Collateral Distributed)</label>
                                <br/>
                                <input name="TCD" onChange={this.handleChange} className="stats-inp-ele" id="TCD" type="number" placeholder="Enter the TCD" alt="TCD"/>
                                </div>
                                <div className="stats-inp-cont">
                                <label htmlFor="TV">TV (Total Villages)</label>
                                <br/>
                                <input name="TV" onChange={this.handleChange} className="stats-inp-ele" id="TV" type="number" placeholder="Enter the TV" alt="TCD"/>
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
                            </div>                        
                            </div>
                        )}
                    </Popup>
                    <div className="date-cont">
                    <p>{(new Date()).toDateString()}</p>
                    <p>Beta</p>
                    </div>
                    </div>
            </div>
            {/* <div className="flex-cont1">
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
                </div> */}
                <div className="stats-main-inner-container">
                    <div className="stats-table-container">
                    <table> 
                    {(statsList.length!==0) && (
                        statsList.map((ele) => <StatsItem key={ele.id} statDetails={ele} onDeleteReport={this.onDeleteReport} belong={"d2d"} />
                        ))}
                    <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                      Team Name
                    </th>
                    <th>
                        Team Number
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
                        Delete
                    </th>
                </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th style={{textAlign:'center'}} colSpan="9">Total</th>
                        <th>{THV}</th>
                        <th>{TPO}</th>
                        <th>{TWC}</th>
                        <th>{TSS}</th>
                        <th>{TYCS}</th>
                        <th>{TNRB}</th>
                        <th>{TNS}</th>
                        <th>{TCD}</th>
                        <th>{TV}</th>
                    </tr>
                </tfoot>
                </table>
            </div>
            </div>
        </div>
        </div>
        </div>
        </>
        );
}
}
export default D2DReport