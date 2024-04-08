import "./index.css"
const AttendanceItem = (props) => {
    const {attendDetails,sno,onChangePresentStatus} = props
    const {id,JSID,Name,Number} = attendDetails

    let {present} = attendDetails
    const handleOptionChange = (event) => {
        onChangePresentStatus(id,event.target.value)
    };

    const radioName=`attend${id}`

    return (
        <tr>
            <td>{sno}</td>
            <td>{JSID}</td>
            <td>{Name}</td>
            <td>{Number}</td>
            <td style={{textAlign:'center'}}>
                <input onChange={handleOptionChange} type="radio" name={radioName} value="present" className="present-radioBtn" id="attendBtn1" />
            </td>
            <td style={{textAlign:'center'}}>
                <input onChange={handleOptionChange} type="radio" name={radioName} value="absent" className="absent-radioBtn" id="attendBtn2"/>
            </td>
        </tr>
    )
}

export default AttendanceItem