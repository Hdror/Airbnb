import React from 'react'

// STORE
import { connect } from 'react-redux'
import { loadStays } from '../store/stay.action.js'

// SVG
import globe from '../assest/svg/app-footer/globe.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

class _AppFooter extends React.Component {

    componentDidMount() {
    }

    render() {
        const { stays, user } = this.props
        return (
            <footer>
                <section className="main-container">
                    {!user &&
                            <div className="inspiration-container">
                            <h2>Inspiration for future getaways</h2>
                            <div className="inspiration">
                                {stays.map((stay, idx) => (
                                    <div className="locations-suggestions flex" key={idx}>
                                        <a className="clean-link" href="">
                                            <div>
                                                <div className="inspiraton-cities">{stay.loc.city}</div>
                                                <div className="inspiraton-countries">{stay.loc.country}</div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    <div className="border"></div>
                    <div className="footer-bottom-section">
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
                        <div className='footer-bottom flex'>
                            <div className="flex">
                                <p>© 2022 SomthingBnb Inc .</p>
                                <span>·</span>
                                <a className="clean-link" href="#"> <p>Privacy</p></a>
                                <span>·</span>
                                <a className="clean-link" href="#"> <p>Terms</p></a>
                                <span>·</span>
                                <a className="clean-link" href="#"> <p>Settings</p></a>
                            </div>
                            <div className="media-container flex">
                                <div className="language-state flex">
                                    <img src={globe} alt="" />
                                    <span className="language"><p className="pref-language">English (US)</p></span>
                                    <span><p>$ <span className="currency">USD</span></p></span>
                                </div>
                                <div className="social-media flex">
                                    <span className='social-media-icon'><FontAwesomeIcon className="footer-social-icons" icon={faFacebookF} /></span>
                                    <span className='social-media-icon'><FontAwesomeIcon className="footer-social-icons" icon={faTwitter} /></span>
                                    <span className='social-media-icon'><FontAwesomeIcon className="footer-social-icons" icon={faInstagram} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer >
        )
    }

}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    loadStays
}

export const AppFooter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppFooter)