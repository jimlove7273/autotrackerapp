import React, {useState} from 'react'
import firebase from '../firebase'

//const Form = ({dataupdated, setDataupdated}) => {
const Form = props => {

    const { dataupdated, setDataupdated } = props;

    const [date, setDate] = useState('')
    const [service, setService] = useState('')
    const [mileage, setMileage] = useState('')
    const [cost, setCost] = useState('')
    const [notes, setNotes] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        
        firebase
            .firestore()
            .collection('autotrack')
            .add({
                date,
                service,
                mileage,
                cost,
                notes
            })
            .then(() => {
                setDataupdated(!dataupdated)
                setDate('')
                setService('')
                setMileage('')
                setCost('')
                setNotes('')
            })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Date" value={date} onChange={(e)=>setDate(e.target.value)} name="date" />
                <input type="text" placeholder="Service" value={service} onChange={(e)=>setService(e.target.value)} name="service" />
                <input type="text" placeholder="Mileage" value={mileage} onChange={(e)=>setMileage(e.target.value)} name="mileage" />
                <input type="text" placeholder="Cost" value={cost} onChange={(e)=>setCost(e.target.value)} name="cost" />
                <input type="text" placeholder="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)} name="notes" />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}



export default Form
