import React from "react"
import "./Class.css"

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
                        <span><img  className = "partimg" src = {participant.img}/></span>
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">{participant.name}</div>
                        </div>
                    </div>
                    <hr/>
                </div>

            ) 
        })
        return(
            <div>
                <ul className="list-group-flush">
                    <p>:רשימת משתתפים</p>
                    {list}
                </ul>
                
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
                        <span><img  className = "partimg" src = {participant.img}/></span>
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">
                                <div>{participant.name}</div> 
                                <div>{participant.phone}</div>
                                <div>{participant.email}</div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            ) 
        })
        return(
            <div>
                <ul className="list-group-flush">
                    <p>:רשימת משתתפים</p>
                    <hr/>
                    <div>{list}</div>
                </ul>
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