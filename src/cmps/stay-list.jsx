import { StayPreview } from './stay-preview.jsx'
import { connect } from 'react-redux'

export function StayList({ stays }) {
    return (
        <section>
            <StayPreview />
        </section>
    )
}