import React from 'react'

export class TypeOfPlaceModal extends React.Component {


    render() {
        return <section className="modal-container flex">
            <form className="flex" action="">
                <div className="check-box-section flex">
                    <input className="check-box" type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Entire place</p>
                        <p>Have a place to yourself</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Private room</p>
                        <p>Have your own room and share some common spaces</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Hotel room</p>
                        <p>Have a private or shared room in a boutique hotel, hostel, and more</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" type="checkbox" />
                    <div className="checkbox-desc">
                        <p>Shared room</p>
                        <p>Stay in a shared space, like a common room</p>
                    </div>
                </div>
            </form>
            <div className="save-clear flex">
                <div className="clear" >
                    <p >Clear</p>
                    </div>
                <div className="save">Save</div>
            </div>
        </section>
    }
}