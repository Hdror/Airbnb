import React from "react";
import { Link } from "react-router-dom";

export class StayPreview extends React.Component {
    state = {

    }

    render() {
        return <div>
            <Link to={`/stay/stayId`}> <div>Stay Preview 1</div> </Link>
            <div>Stay Preview 2</div>
            <div>Stay Preview 3</div>
            <div>Stay Preview 4</div>
        </div>

    }
}