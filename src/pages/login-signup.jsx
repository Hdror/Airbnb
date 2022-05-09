import { Component } from 'react'
import GoogleLogin from 'react-google-login';

// STORE
import { connect } from 'react-redux'
import { login, signup, update } from '../store/user.actions.js'
import { changePage } from '../store/page.action.js'
import { loadOrders } from '../store/order/order.actions.js'

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
        if (ev) {
            var isGoogleLogIn = true
            ev.preventDefault()
        } else isGoogleLogIn = true
        try {
            let user = await this.props.login(this.state.credentials);
            if (user) {
                this.props.loadOrders({ buyerId: user._id })
                this.clearState()
                this.props.history.push('/')
            }
        } catch (err) {
            console.log('error:', err)
        }
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
    
    responseGoogle = (response) => {
        this.setState({ credentials: { ...this.state.credentials, email: response.profileObj.email, fullname: response.profileObj.name } }, () => this.onLogin())
    }

    render() {
        const { fullname, phonenumber, email, isSignup } = this.state
        return (
            <section className='main-container page login-page'>
                <div className='login-page-container'>
                    {this.props.modalState.googlePhoneNumber && <div className="phone-number-modal">
                        <p>Please enter your phone number to complete the sign up process</p>
                        <div className="input-submit-container">
                            <form onSubmit={this.onSignup}>
                                <input
                                    className='login-form-input'
                                    type='tel'
                                    name='phonenumber'
                                    placeholder='Phone number'
                                    value={phonenumber}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button className="submit-btn" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>}
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

                                <GoogleLogin clientId="788195606858-1cfjtluvtl6bgs3h2khemue184a7hs27.apps.googleusercontent.com"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'} />
                                <div className='login-form-actions'>
                                    <small>We’ll call or text you to confirm your number. Standard message and data rates apply. <span>Privacy Policy</span></small>
                                    <div className="signin-btn-container">
                                        <button type='submit' className='login-btn'>Login</button>
                                        <button className='login-btn' onClick={this.toggleSignup}>New User?</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {isSignup && (
                        <div className='login-form-container'>
                            <div className="login-page-header"><h2>Log in or sign up</h2></div>
                            <div><h3>Welcome to flairbnb</h3></div>
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
        modalState: state.pageModule.modalState
    }
}
const mapDispatchToProps = {
    login,
    signup,
    changePage,
    update,
    loadOrders
}

export const LoginSignup = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LoginSignup)
