import React from 'react'

export default function category() {
    return (
        <section class="categories-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Browse Categories</h2>
                    <a href="/" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
                </div>

                <div class="categories-grid">
                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-paint-brush"></i></div>
                        <h3 class="category-title">Art</h3>
                        <div class="category-count">1,245 Items</div>
                    </div>

                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-music"></i></div>
                        <h3 class="category-title">Music</h3>
                        <div class="category-count">892 Items</div>
                    </div>

                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-gamepad"></i></div>
                        <h3 class="category-title">Games</h3>
                        <div class="category-count">1,567 Items</div>
                    </div>

                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-image"></i></div>
                        <h3 class="category-title">Photography</h3>
                        <div class="category-count">743 Items</div>
                    </div>

                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-film"></i></div>
                        <h3 class="category-title">Video</h3>
                        <div class="category-count">621 Items</div>
                    </div>

                    <div class="category-card">
                        <div class="category-icon"><i class="fas fa-globe"></i></div>
                        <h3 class="category-title">Virtual Worlds</h3>
                        <div class="category-count">432 Items</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
