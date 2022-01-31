import { Component } from 'react'

// STORE
import { connect } from 'react-redux'
import { login, signup, update } from '../store/user.actions.js'
import { changePage } from '../store/page.action.js'
class _LoginSignup extends Component {
    state = {
        credentials: {
            email: '',
            fullname: '',
            phonenumber: '',
        },
        isSignup: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.changePage('login')
        if (this.props.user) this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({
            credentials: { ...this.state.credentials, [field]: value }
        })
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                email: '',
                fullname: '',
                phonenumber: '',
            },
            isSignup: false,
        }
        this.setState({ clearTemplate })
    }

    onLogin = async (ev) => {
        ev.preventDefault()
        if (!this.state.credentials.email || !this.state.credentials.phonenumber) return
        try {
            let user = await this.props.login(this.state.credentials);
            if (user) {
                this.props.history.push('/')
            }
        } catch (err) {
            console.log('error:', err)
        }
        this.clearState()
    }

    onSignup = (ev) => {
        if (
            !this.state.credentials.email ||
            !this.state.credentials.phonenumber ||
            !this.state.credentials.fullname
        ) return

        ev.preventDefault()

        try {
            this.props.signup(this.state.credentials)
            this.props.history.push('/')
        } catch (err) {
            console.log('error:', err)
        }
        this.clearState()

    }

    render() {
        const { fullname, phonenumber, email, isSignup } = this.state
        return (
            <section className='main-container page login-page'>
                <div className='login-page-container'>
                    {!isSignup && (
                        <div className='login-form-container'>
                            <div className="login-page-header"><h2>Log in or sign up</h2></div>
                            <div><h3>Welcome to flairbnb</h3></div>
                            <form className='login-form' onSubmit={this.onLogin}>
                                <div className='login-content'>
                                    <input
                                        className='login-form-input'
                                        type='email'
                                        name='email'
                                        placeholder='Email address'
                                        autoComplete='off'
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <input
                                        className='login-form-input'
                                        type='tel'
                                        name='phonenumber'
                                        placeholder='Phone number'
                                        autoComplete='off'
                                        value={phonenumber}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className='login-form-actions'>
                                    <small>We’ll call or text you to confirm your number. Standard message and data rates apply. <span>Privacy Policy</span></small>
                                    <div className="signin-btn-container">
                                        <button type='submit' className='login-btn'>Login</button>
                                        <button className='login-btn' onClick={this.toggleSignup}>New User?</button>
                                    </div>
                                </div>
                                {/* <div className="social-login-container flex">
                                    <span>or</span>
                                </div>
                                <div className="social-login-btns-container flex">
                                    <div className="social-btn">
                                        <FontAwesomeIcon className="social-media-icon facebook" icon={faFacebook} />
                                        <h4>Continue with Facebook</h4>
                                        <span></span>
                                    </div>
                                    <div className="social-btn">
                                        <FontAwesomeIcon className="social-media-icon google" icon={faGoogle} />
                                        <h4>Continue with Google</h4>
                                        <span></span>
                                    </div>
                                    <div className="social-btn">
                                        <FontAwesomeIcon className="social-media-icon apple" icon={faApple} />
                                        <h4>Continue with Apple</h4>
                                        <span></span>
                                    </div> */}
                                {/* <div className="social-btn"><FontAwesomeIcon className="social-media-icon" icon={faEmail} /></div> */}
                                {/* </div> */}
                            </form>
                        </div>
                    )}

                    {isSignup && (
                        <div className='login-form-container'>
                            <div className="login-page-header"><h2>Log in or sign up</h2></div>
                            <div><h3>Welcome to SomethingBnb</h3></div>
                            <form className='login-form' onSubmit={this.onSignup}>
                                <div className='login-content'>
                                    <input
                                        className='login-form-input'
                                        type='text'
                                        name='fullname'
                                        placeholder='Full name'
                                        autoComplete='off'
                                        value={fullname}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <input
                                        className='login-form-input'
                                        type='phonenumber'
                                        name='phonenumber'
                                        placeholder='Phone number'
                                        autoComplete='off'
                                        value={phonenumber}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <input
                                        className='login-form-input'
                                        type='email'
                                        name='email'
                                        placeholder='Email'
                                        autoComplete='off'
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className='login-form-actions'>
                                    <small>We’ll call or text you to confirm your number. Standard message and data rates apply. <span>Privacy Policy</span></small>
                                    <div className="signin-btn-container">
                                        <button type='submit' className='login-btn'>Sign up</button>
                                        <button className='login-btn' onClick={this.toggleSignup}>Log to my account</button>
                                    </div>
                                </div>
                                {/* <div className="social-login-container">
                                    <div className="login-divider"><span>or</span></div>
                                </div> */}
                            </form>
                        </div>
                    )
                    }
                </div>
            </section >
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    login,
    signup,
    changePage,
    update,
}

export const LoginSignup = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LoginSignup)
