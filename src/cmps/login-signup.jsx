import { Component } from 'react'
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

    onLogin = async (ev = null) => {
        if (ev) ev.preventDefault()
        if (!this.state.credentials.email || !this.state.credentials.phonenumber) return
        try {
            let user = await this.props.login(this.state.credentials);
            if (user) {
                this.props.history.push('/');
            }
        } catch (err) {
            console.log('error:', err);
        }
        this.clearState();
    }

    onSignup = (ev = null) => {

        if (
            !this.state.credentials.email ||
            !this.state.credentials.phonenumber ||
            !this.state.credentials.fullname
        ) return

        if (ev) ev.preventDefault()

        try {
            const user = this.props.signup(this.state.credentials)
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
                            <form className='login-form' onSubmit={this.onLogin}>
                                <div className='login-header'>
                                    <h2>Log in or sign up</h2>
                                </div>
                                <div className='login-content'>
                                    <input
                                        className='login-form-input'
                                        type='email'
                                        name='email'
                                        placeholder='Email Address'
                                        autoComplete='off'
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <input
                                        className='login-form-input'
                                        type='tel'
                                        name='phonenumber'
                                        placeholder='Phone Number'
                                        autoComplete='off'
                                        value={phonenumber}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className='login-form-actions'>
                                    <small>We’ll call or text you to confirm your number. <br />Standard message and data rates apply. <span>Privacy Policy</span></small>
                                    <div>
                                        <button type='submit' className='login-btn'>Login</button>
                                        <button onClick={this.toggleSignup}>New User?</button>
                                        <button>Forgot phonenumber?</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {isSignup && (
                        <div className='login-form-container'>
                            <form className='login-form' onSubmit={this.onSignup}>
                                <div className='login-header'>
                                    <h2>Sign up</h2>
                                </div>
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
                                        placeholder='phonenumber'
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
                                    <button type='submit' className='login-btn'>
                                        sign up
                                    </button>
                                </div>
                                <div className='login-form-actions'>
                                    <button onClick={this.toggleSignup}>
                                        I already have an account
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
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
