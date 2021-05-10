import React from 'react';
import { BsStar } from 'react-icons/bs';

import '../style.css';

function Lazy({subtitleHeading, subtitleFooter, offer, title, text }) {
    return (
        <section className="lazy">
            <article className="lazy-content">
                <h3 className="lazy-offer">
                    {subtitleHeading}{' '}
                    <span className="lazy-offer-btn">
                        <BsStar className="lazy-star" />
                        <span>{offer}</span>
                        <BsStar className="lazy-star" />
                    </span>{' '}
                    {subtitleFooter}
                </h3>
                <p className="lazy-text">{text}</p>
                <button className="button-lazy">
                    khám phá ngay
                </button>
            </article>
        </section>
    )
}

export default Lazy
