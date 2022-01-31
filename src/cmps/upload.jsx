import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinary.service.js'

export class Upload extends Component {
    state = {
        imgUrl: null,
        height: 60,
        width: 60,
        isUploading: false
    }

    componentDidMount() {
        const { userImgUrl } = this.props
        if (userImgUrl) this.setState({ imgUrl: userImgUrl })
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
        const { imgUrl } = this.state
        const previewStyle = {
            backgroundImage: `url(${imgUrl})`,

        }
        return (
            <div className="upload-preview" style={previewStyle} >
                <label className="img-upload-label" htmlFor="imgUpload">{this.uploadMsg}
                    <input type="file" onChange={this.uploadImg} accept="img/*" className="img-upload-btn" id="imgUpload" />
                </label>
            </div>
        )
    }
}