import "./index.css"
import Popup from 'reactjs-popup'
import { Component } from "react"

const MemberItem = (props) => {
        const {statDetails,onDeleteMember,sno} = props
        const {
          id,MemberSno,JSID,Name,Number,district,constituency,selectedConstituency,Block,Panchayat,Village,Team,DOB
        } = statDetails
        const onDelete = () => {
          // console.log("I am called")
          onDeleteMember(id);
        }
    return (
                <tr>
                    <td>{sno}</td>
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
    trigger={<button className="edit-Btn" type="button"> Delete </button>}
    modal
    nested
  >
    {close => (
      <div className="modal custom-popup">
        {/* <button className="close " onClick={close}>
          &times;
        </button> */}
        <div className="content popup-cont delete-cont">
            <h1>Are you sure want to Delete?</h1>
            {/* <form onSubmit={this.onSubmitEditStatForm}>
            <input onChange={this.handleChange} name="date" type="date" value={newDate} className="stats-inp-ele"/>
            <input onChange={this.handleChange} name="CampNo" type="number" value={newCampNo} className="stats-inp-ele"/> */}
            {/* </form> */}
        <div className="actions">
          <button
            className="button closeBtn cancel-Btn"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Cancel
          </button>
          <button className="closeBtn" type="button" onClick={onDelete} >Delete</button>
          </div>
        </div>
      </div>
    )}
  </Popup>
                    </td>
                </tr>
    )
}
export default MemberItem