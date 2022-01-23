import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default class ImgSlider extends React.Component {
    render() {
        const { imgUrls } = this.props.stay
        const settings = {
            dots: true,
            fade: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            // arrows:true
        }

        return (
            // <div className='container'>
                <Slider className='main-slider' {...settings}>
                    {imgUrls.map((imgUrl, idx) => {
                        return <img key={idx} src={imgUrl} alt="Not Found" />
                    })}
                </Slider>
            // </div>
        );
    }
}
