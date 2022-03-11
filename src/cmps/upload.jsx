import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinary.service.js'

export class Upload extends Component {
    state = {
        imgUrl: this.props.imgUrl,
        height: 60,
        width: 60,
        isUploading: false
    }

    componentDidMount() {
        const { userImgUrl } = this.props
        if (userImgUrl) this.setState({ imgUrl: userImgUrl })
    }

    componentDidUpdate(prevProps) {
        // if (!this.props.userImgUrl && this.state.imgUrl !== '') this.setState({ imgUrl: '' })
        if (this.props !== prevProps) this.setState({ imgUrl: this.props.userImgUrl })
    }

    resetUploads = () => {
        console.log('reset');
        this.setState({
            imgUrl: null,
            height: 60,
            width: 60,
            isUploading: false
        })
    }

    uploadImg = async (ev) => {
        this.setState({ isUploading: true })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        this.setState({ isUploading: false, imgUrl: secure_url, height, width }, () => { this.props.onUploadImg(this.state, this.props.position) })
    }

    get uploadMsg() {
        const { imgUrl, isUploading } = this.state
        if (imgUrl) return 'Upload Another?'
        return isUploading ? 'Uploading....' : 'Upload Image'
    }

    render() {
        console.log(this.props);
        const { imgUrl } = this.state
        const previewStyle = {
            backgroundImage: `url(${imgUrl})`,
        }

        return (
            <div className="upload-preview">
                <div className="img-upload-label" htmlFor="imgUpload">
                    {/* {this.uploadMsg} */}
                    <input type="file" onChange={this.uploadImg} accept="img/*" className="img-upload-btn" id="imgUpload" />
                    <div className="img-container">

                    <img src={imgUrl} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}