import React from "react";
import { Link } from "react-router-dom";

export class StayPreview extends React.Component {
    state = {

    }

    render() {
        return <div>
            <Link to={`/stay/stayId`}> <div>Stay Preview 1</div> </Link>
        </div>

    }
}