import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStays } from '../store/stay.action.js'
class _AppFooter extends React.Component {
    state = { stays: [] }

    async componentDidMount() {
        const stays = await this.props.loadStays();
        this.setState({ stays });
    }

    render() {
        const { stays } = this.state
        const cities = ['Akranes', 'Muang Pattaya', 'Amsterdam', 'London', 'New York',]
        const countries = ['Iceland', 'Thailand', 'Netherlands', 'UK', 'US']
        return (
            <footer>
                <section>
                    <div>Inspiration for future getaways</div>
                    <div>
                        <div className='footer-bottom'>
                            <div>
                                <p>© 2022 SomthingBnb, Inc.</p>
                                <span>·</span>
                                <Link className='link'><p>Privacy</p></Link>
                                <span>·</span>
                                <Link className='link'><p>Terms</p></Link>
                                <span>·</span>
                                <Link to='/host' className='link'><p>Settings</p></Link>
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