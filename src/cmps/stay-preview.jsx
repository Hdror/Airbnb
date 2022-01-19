import React from "react";
import { Link } from "react-router-dom";

export class StayPreview extends React.Component {
    state = {

    }

    render() {
        return <div>
            <Link to={`/stay/stayId`}> <div>Stay Preview 1</div> </Link>
            <div>Stay Preview 2 <img src='https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large' alt="" srcset="" /></div>
            <div>Stay Preview 3</div>
            <div>Stay Preview 4</div>
        </div>

    }
}