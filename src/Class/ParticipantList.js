import React from "react"
import "./Class.css"
import IconCross from "../NetflixSlider/components/Icons/IconCross";

class ParticipantList extends React.Component
{
    partiList()
    {
        if(this.props.list.length <= 0)
            return <p>אין עדיין משתתפים בקורס זה</p>
        const list = this.props.list.map((participant, key) => {
            return(
                <div>
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


    partiListForManager()
    {
        if(this.props.list.length <= 0)
            return <p>אין עדיין משתתפים בקורס זה</p>
        const list = this.props.list.map((participant, key) => {
            return(
                <div>
                    <div className = "participant">
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">
                                <div>{participant.name}</div> 
                                <div>{participant.phone}</div>
                                <div>{participant.email}</div>
                            </div>
                            <img  className = "partimg" src = {participant.img}/>
                        </div>
                    </div>
                </div>
            ) 
        })
        return(
            <div>
                    <p>:רשימת משתתפים</p>
                    <hr/>
                    <div>{list}</div>
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