import './ConciergeSection.css';

const ConciergeSection = () => {
    return (
        <section className="concierge-section" id="bespoke">
            <div className="concierge-container">
                <div className="concierge-left">
                    <div className="concierge-image-block">
                        <span className="concierge-image-text">Private Atelier</span>
                    </div>
                </div>

                <div className="concierge-right">
                    <p className="section-label">Private Concierge</p>
                    <h2 className="section-title">Commission Your Vision</h2>
                    <p className="section-subtitle">
                        Our dedicated concierge team crafts a bespoke acquisition journey tailored entirely to you.
                    </p>

                    <form className="concierge-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="concierge-field">
                            <label className="concierge-label" htmlFor="concierge-name">Full Name</label>
                            <input
                                className="concierge-input"
                                type="text"
                                id="concierge-name"
                                placeholder="e.g. Alexander Sterling"
                            />
                        </div>
                        <div className="concierge-field">
                            <label className="concierge-label" htmlFor="concierge-email">Email</label>
                            <input
                                className="concierge-input"
                                type="email"
                                id="concierge-email"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="concierge-field">
                            <label className="concierge-label" htmlFor="concierge-interest">Your Interest</label>
                            <textarea
                                className="concierge-input concierge-textarea"
                                id="concierge-interest"
                                placeholder="Which marque speaks to you?"
                            />
                        </div>
                        <button type="submit" className="concierge-submit">
                            Request Private Viewing
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ConciergeSection;
