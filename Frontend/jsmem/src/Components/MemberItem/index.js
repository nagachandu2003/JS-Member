import "./index.css"
import Popup from 'reactjs-popup'
import { Component } from "react"

class MemberItem extends Component {

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
          MemberSno,JSID,Name,Number,district,constituency,selectedConstituency,Block,Panchayat,Village,Team,DOB
        } = statDetails
    return (
        <tbody className="table-body">
                <tr>
                    <td>{MemberSno}</td>
                    <td>{JSID}</td>
                    <td>{Name}</td>
                    <td>{Number}</td>
                    <td>{district}</td>
                    <td>{selectedConstituency}</td>
                    <td>{Block}</td>
                    <td>{Panchayat}</td>
                    <td>{Village}</td>
                    <td>{Team}</td>
                    <td>{DOB}</td>
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
export default MemberItem