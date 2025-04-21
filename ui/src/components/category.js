import React from 'react'

export default function category() {
    return (
        <section className="categories-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Browse Categories</h2>
                    <a href="/" className="view-all">View All <i className="fas fa-arrow-right"></i></a>
                </div>

                <div className="categories-grid">
                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-paint-brush"></i></div>
                        <h3 className="category-title">Art</h3>
                        <div className="category-count">1,245 Items</div>
                    </div>

                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-music"></i></div>
                        <h3 className="category-title">Music</h3>
                        <div className="category-count">892 Items</div>
                    </div>

                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-gamepad"></i></div>
                        <h3 className="category-title">Games</h3>
                        <div className="category-count">1,567 Items</div>
                    </div>

                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-image"></i></div>
                        <h3 className="category-title">Photography</h3>
                        <div className="category-count">743 Items</div>
                    </div>

                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-film"></i></div>
                        <h3 className="category-title">Video</h3>
                        <div className="category-count">621 Items</div>
                    </div>

                    <div className="category-card">
                        <div className="category-icon"><i className="fas fa-globe"></i></div>
                        <h3 className="category-title">Virtual Worlds</h3>
                        <div className="category-count">432 Items</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
