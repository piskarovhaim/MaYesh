import React from "react"
import "./Class.css"

class ParticipantList extends React.Component
{
    partiList()
    {
        const list = this.props.list.map((participant, key) => {
            return(
                <div>
                    <span><img  className = "partimg" src = {participant.img}/></span>
                    <div className = "participant" key = {participant.id}>
                        <div className = "prtiItem">{participant.name}</div>
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
        const list = this.props.list.map((participant, key) => {
            return(
                <div className = "participant" key = {participant.id}>
                    <span><img  className = "partimg" src = {participant.img}/></span>
                    <div className = "prtiItem">
                        <div>{participant.name}</div> 
                        <div>{participant.phone}</div>
                        <div>{participant.email}</div>
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