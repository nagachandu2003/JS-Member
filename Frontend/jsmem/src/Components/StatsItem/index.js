import "./index.css"
import Popup from 'reactjs-popup'
const MemberItem = (props) => {
        const {statDetails,onDeleteReport,belong} = props
        const {
          id,TeamName,TeamNo,TeamLeadName,date ,district,constituency,selectedConstituency,	Block,	Panchayat,	Village,THV,TPO,TWC,TSS,TYCS,TNRB,TNS,TCD,TV
        } = statDetails
        const onDelete = () => {
          onDeleteReport(id);
        }
    return (
        <tbody className="table-body">
                <tr>
                <td>{date}</td>
                  <td>{TeamName}</td>
                    <td>{TeamNo}</td>
                    <td>{TeamLeadName}</td>
                    <td>{district}</td>
                    <td>{selectedConstituency}</td>
                    <td>{Block}</td>
                    <td>{Panchayat}</td>
                    <td>{Village}</td>
                    <td>{THV}</td>
                    <td>{TPO}</td>
                    <td>{TWC}</td>
                    <td>{TSS}</td>
                    <td>{TYCS}</td>
                    <td>{TNRB}</td>
                    <td>{TNS}</td>
                    <td>{TCD}</td>
                    <td>{TV}</td>
                    {belong==="d2d" && (<td>
                    <Popup
    trigger={<button className="closeBtn" type="button"> Delete </button>}
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
                    </td>)}
                </tr>
        </tbody>
    )
}
export default MemberItem