import "./index.css"
import Popup from 'reactjs-popup'
import { Component } from "react"

class StatsItem extends Component{

    state = {newdate:'',newCampNo:0,newCampName:'',newTHV:'',newTPO:'',newTWC:'',newTSS:'',newTYCS:'',newTNRB:'',newTNS:'',newTCD:''}

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }

    onSubmitEditStatForm = () => {
        const {newdate,newCampNo,newCampName,newTHV,newTPO,newTWC,newTSS,newTYCS,newTNRB,newTNS,newTCD} = this.state
        const editedObj = {
          newdate,
          newCampNo,
          newCampName,
          newTHV,
          newTPO,
          newTWC,
          newTSS,
          newTYCS,
          newTNRB,
          newTNS,
          newTCD
        }
    }

    render(){
        const {newDate,newCampNo} = this.state
        const {statDetails} = this.props
        const {
            id,date,CampNo,CampName,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD
        } = statDetails
    return (
        <tbody className="table-body">
                <tr>
                    <td>{date}</td>
                    <td>{CampNo}</td>
                    <td>{CampName}</td>
                    <td>{THV}</td>
                    <td>{TPO}</td>
                    <td>{TWC}</td>
                    <td>{TSS}</td>
                    <td>{TYCS}</td>
                    <td>{TNRB}</td>
                    <td>{TNS}</td>
                    <td>{TCD}</td>
                    <td>
                    <Popup
    trigger={<button className="edit-Btn" type="button"> Edit </button>}
    modal
    nested
  >
    {close => (
      <div className="modal custom-popup">
        {/* <button className="close " onClick={close}>
          &times;
        </button> */}
        <div className="content popup-cont">
            <h1>Edit Details</h1>
            <form onSubmit={this.onSubmitEditStatForm}>
            <input onChange={this.handleChange} name="date" type="date" value={newDate} className="stats-inp-ele"/>
            <input onChange={this.handleChange} name="CampNo" type="number" value={newCampNo} className="stats-inp-ele"/>
            <button className="deleteBtn" type="submit" >Edit</button>
            </form>
        </div>
        <div className="actions">
          <button
            className="button closeBtn"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
                    </td>
                </tr>
        </tbody>
    )
        }
}
export default StatsItem