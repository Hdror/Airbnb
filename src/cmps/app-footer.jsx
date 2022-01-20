import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStays } from '../store/stay.action.js'

class _AppFooter extends React.Component {
    componentDidMount() {
        const stays = this.props.loadStays()
        console.log(stays)
    }

    render() {
        const { stays } = this.props
        console.log(stays)
        const cities = ['Akranes', 'Muang Pattaya', 'Amsterdam', 'London', 'New York',]
        const countries = ['Iceland', 'Thailand', 'Netherlands', 'UK', 'US']
        return (
            <footer>
                <section className="main-container">
                    <div>
                        <div>Inspiration for future getaways</div>
                        <div className="">
                            {stays.map((stay, idx) => (
                                <div className=" flex" key={idx}>
                                    <a className="clean-link" href="">
                                        <div>
                                            <div>{stay.loc.city}</div>
                                            <div>{stay.loc.country}</div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <section>
                            <h3>Support</h3>
                            <ul className="clean-list">
                                <li><a className="clean-link" href="#">Help Center</a></li>
                                <li><a className="clean-link" href="#">Safety information</a></li>
                                <li><a className="clean-link" href="#">Cancellation options</a></li>
                                <li><a className="clean-link" href="#">Our COVID-19 Response</a></li>
                                <li><a className="clean-link" href="#">Supporting people with disabilities</a></li>
                                <li><a className="clean-link" href="#">Report a neighborhood concern</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3>Community</h3>
                            <ul className="clean-list">
                                <li><a className="clean-link" href="#">Airbnb.org: disaster relief housing</a></li>
                                <li><a className="clean-link" href="#">Support Afghan refugees</a></li>
                                <li><a className="clean-link" href="#">Celebrating diversity & belonging</a></li>
                                <li><a className="clean-link" href="#">Combating discrimination</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3>Hosting</h3>
                            <ul className="clean-list">
                                <li><a className="clean-link" href="#">Try hosting</a></li>
                                <li><a className="clean-link" href="#">AirCover: protection for Hosts</a></li>
                                <li><a className="clean-link" href="#">Explore hosting resources</a></li>
                                <li><a className="clean-link" href="#">Visit our community forum</a></li>
                                <li><a className="clean-link" href="#">How to host responsiblys</a></li>
                            </ul>
                        </section>
                        <section>
                            <h3>About</h3>
                            <ul className="clean-list">
                                <li><a className="clean-link" href="#">Newsroom</a></li>
                                <li><a className="clean-link" href="#">Learn about new features</a></li>
                                <li><a className="clean-link" href="#">Letter from our founders</a></li>
                                <li><a className="clean-link" href="#">Careers</a></li>
                                <li><a className="clean-link" href="#">Investors</a></li>
                                <li><a className="clean-link" href="#">Airbnb Luxe</a></li>
                            </ul>
                        </section>
                    </div>
                    <div>
                        <div className='footer-bottom'>
                            <div>
                                <p>© 2022 SomthingBnb, Inc.</p>
                                <span>·</span>
                                <Link to='#' className="link"><p>Privacy</p></Link>
                                <span>·</span>
                                <Link to='#' className="link"><p>Terms</p></Link>
                                <span>·</span>
                                <Link to='#' className="link"><p>Settings</p></Link>
                            </div>
                            <div className='media-container'>
                                <div>
                                    <span><h6>globe icon</h6></span>
                                    <span>English (US)</span>
                                    <span>$ USD</span>
                                </div>
                                <div>
                                    <span className='social-media-icon'><h6>facebook icon</h6></span>
                                    <span className='social-media-icon'><h6>twitter icon</h6></span>
                                    <span className='social-media-icon'><h6>insta icon</h6></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        )
    }

}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
    }
}

const mapDispatchToProps = {
    loadStays,
}

export const AppFooter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppFooter);