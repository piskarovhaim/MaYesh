import React from "react"
import "./Class.css"
import IconCross from "../NetflixSlider/components/Icons/IconCross";


/*
    ParticipantList - return the button display.
    ParticipantList used by 'Class' component.
    there is 3 options of displays:
    1. list for who isnot the manager - just the names of participants
    2. list for the manager - includeing the phone numbers and the mail adressses of participants
    3. There are no participants in this course yet 
*/

class ParticipantList extends React.Component
{
    //participant list for user that is not the maneger of this class
    partiList()
    {
        if(this.props.list.length <= 0)
            return <p>     
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    אין עדיין משתתפים בקורס זה
                 </p>
        const list = this.props.list.map((participant, key) => {
            return(
                <div key = {participant.id}>
                    <div className = "participant">
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">{participant.name}</div>
                        </div>
                        <img  className = "partimg" src = {participant.img}/>
                    </div>   
                </div>

            ) 
        })
        return(
            <div>
                    <p>:רשימת משתתפים
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    </p>
                    {list}
                
            </div>
        )
    }

    //participant list for user that is the maneger of this class
    partiListForManager()
    {
        if(this.props.list.length <= 0)
            return <p>     
            <button className="closeParticiList" onClick={this.props.func}>
                <IconCross/>
            </button>
            אין עדיין משתתפים בקורס זה
         </p>
        const list = this.props.list.map((participant, key) => {
            let url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + participant.email + "&tf=1"
            let mailDiv = <div>{participant.email}</div>
            if(window.innerWidth >= 500)//not a mobile
                mailDiv = <div className="divSendEmail" onClick={()=>window.open(url,"_blank","toolbar=yes,menubar=no,titlebar=no,scrollbars=no,resizable=no,status=no,bottom=0,right=50,width=400,height=400")}>{participant.email}</div>
            return(
                <div key = {participant.id}>
                    <div className = "participant">
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">
                                <div>{participant.name}</div> 
                                <div>{participant.phone}</div>
                                {mailDiv}
                            </div>
                            <img  className = "partimg" src = {participant.img}/>
                        </div>
                    </div>
                </div>
            ) //links to gmail and whatsapp
        })
        return(
            <div>
                    <p>:רשימת משתתפים
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    </p>
                    {list}
            </div>
        )
    }

    render()
    {
        return(
            <div className = "particiListDiv">
                {this.props.manager ? <div>{this.partiListForManager()}</div> : <div>{this.partiList()}</div>}
            </div>
        )
    }
}


export default ParticipantList