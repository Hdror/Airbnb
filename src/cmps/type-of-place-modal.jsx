import React from 'react'

export class TypeOfPlaceModal extends React.Component {


    state={
        filterBy:{
            
        }
    }
    cleanForm = () => {
        this.setState({ filterBy: {} })
    }

    render() {
        const {handleChange}= this.props
        return <section className="modal-container flex">
            <form className="flex"  action="">
                <div className="check-box-section flex">
                    <input className="check-box" name='Entire place' checked={this.props.filterBy.typeOfPlace['Entire place']} onChange={handleChange} type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Entire place</p>
                        <p>Have a place to yourself</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" name='Private room' checked={this.props.filterBy.typeOfPlace['Private room']} onChange={handleChange} type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Private room</p>
                        <p>Have your own room and share some common spaces</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" name='Hotel room' checked={this.props.filterBy.typeOfPlace['Hotel room']} onChange={handleChange} type="checkbox" />
                    <div className="checkbox-desc">
                        <p> Hotel room</p>
                        <p>Have a private or shared room in a boutique hotel, hostel, and more</p>
                    </div>
                </div>
                <div className="check-box-section flex">
                    <input className="check-box" name='Shared room' checked={this.props.filterBy.typeOfPlace['Shared room']} onChange={handleChange} type="checkbox" />
                    <div className="checkbox-desc">
                        <p>Shared room</p>
                        <p>Stay in a shared space, like a common room</p>
                    </div>
                </div>
            </form>
            <div className="save-clear flex">
                <div onClick={this.cleanForm} className="clear" >
                    <p >Clear</p>
                    </div>
                <div onClick={this.props.filterStays} className="save">Save</div>
            </div>
        </section>
    }
}