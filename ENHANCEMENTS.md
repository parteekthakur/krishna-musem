# Krishna Museum - Enhanced Features & Animations

## ✨ NEW ANIMATION FEATURES

### 1. **Page Load Animations**
   - Fade-in effects for hero, cards, and text
   - Smooth transitions on page load
   - Staggered card appearance with delay

### 2. **Staggered Card Animations**
   - Each card animates with a cascading delay
   - Smooth scale-in effect
   - Sequential appearance for better UX

### 3. **Parallax Scrolling**
   - Background layers move at different speeds
   - Hero section has pulsing glow effect
   - Smooth scroll animations

### 4. **Smooth Modals**
   - Scale + fade animations for detail overlays
   - Backdrop blur effect
   - Smooth entrance and exit

### 5. **Hover Animations**
   - Card hover: scale up + glow effect + shadow expansion
   - Image brightness increase on hover
   - Gradient shift on buttons
   - Shimmer effect on images

### 6. **Loading States**
   - Skeleton loaders for content
   - Spinner animations
   - Smooth transitions

### 7. **Scroll Animations**
   - Elements fade in as user scrolls
   - Intersection observer for performance
   - Smooth reveal effects

### 8. **Button Animations**
   - Ripple effect on click
   - Scale transform on hover
   - Color gradient transitions
   - Smooth state changes

---

## ⭐ NEW FEATURE IMPLEMENTATIONS

### 1. **Wishlist System** ❤️
   - **Location**: `/api/wishlist` endpoints
   - **Features**:
     - Add/remove artefacts to wishlist
     - View all wishlist items
     - Check if artefact is in wishlist
     - Heart button on each card
   - **Frontend**: `wishlist.js`
   - **Database**: `wishlist` table

### 2. **Ratings & Reviews** ⭐⭐⭐⭐⭐
   - **Location**: `/api/ratings` endpoints
   - **Features**:
     - 5-star rating system
     - Add reviews with comments
     - View all ratings for artefact
     - Calculate average rating
     - Show rating count
   - **Frontend**: `ratings.js`
   - **Database**: `rating` table

### 3. **Advanced Filters** 🔍
   - **Filter By**:
     - Dynasty (Maurya, Gupta, Mughal, Rajput)
     - Material (Stone, Bronze, Terracotta, Gold)
     - Deity (Krishna, Vishnu, Shiva, Brahma)
     - Floor (1, 2, 3)
     - Minimum Rating
   - **Frontend**: `advanced-filters.js`
   - **Page**: `/artefacts`

### 4. **User Dashboard** 👤
   - **Location**: `/dashboard`
   - **Features**:
     - User profile section
     - Activity statistics
     - Wishlist management
     - Recent ratings
     - Profile image
   - **Frontend**: `dashboard.js`

### 5. **Events Calendar** 🎫
   - **Location**: `/events` & `/api/events`
   - **Features**:
     - View all museum events
     - Filter by category
     - Event details modal
     - Register for events
     - Upcoming events list
   - **Frontend**: `events.js`
   - **Database**: `event` table

### 6. **Historical Timeline** 📜
   - **Location**: `/timeline`
   - **Features**:
     - Visual timeline of artefacts
     - Filter by dynasty
     - Filter by period
     - Year range filtering
     - Timeline visualization
   - **Frontend**: `timeline.js`
   - **Database**: `artefact_timeline` table

### 7. **Related Items** (in detail view)
   - Shows similar artefacts
   - Same dynasty items
   - Same material items
   - Link in modal detail view

### 8. **Dark/Light Theme Toggle** 🌙☀️
   - **Location**: Bottom-right floating button
   - **Features**:
     - Smooth theme transition
     - Persistent theme setting (localStorage)
     - Keyboard shortcut: Ctrl+T
     - Rotation animation on toggle
   - **Frontend**: `theme-toggle.js`

### 9. **Improved Modal Details** 
   - Wishlist button in modal
   - Rating section
   - Reviews section
   - Better layout
   - Smooth animations

### 10. **Keyboard Shortcuts**
   - `Ctrl+K` or `Cmd+K` - Focus search
   - `Ctrl+T` or `Cmd+T` - Toggle theme
   - `Escape` - Close modals

---

## 📁 NEW FILES CREATED

### Backend Models
- `Wishlist.java` - Wishlist model
- `Rating.java` - Rating/review model
- `Event.java` - Event model
- `UserProfile.java` - User profile model
- `ArtefactTimeline.java` - Timeline model

### Backend Repositories
- `WishlistRepository.java` - Wishlist queries
- `RatingRepository.java` - Rating queries
- `EventRepository.java` - Event queries
- `ArtefactTimelineRepository.java` - Timeline queries

### Backend Controllers
- `WishlistController.java` - Wishlist API
- `RatingController.java` - Rating API
- `EventController.java` - Event API
- Routes added to `HomeController.java`

### Frontend CSS
- Enhanced `style.css` with all animations
- New component styles for dashboard, timeline, events
- Theme toggle styles
- Responsive design improvements

### Frontend JavaScript
- `wishlist.js` - Wishlist functionality
- `ratings.js` - Ratings & reviews
- `events.js` - Event management
- `timeline.js` - Timeline view
- `dashboard.js` - Dashboard logic
- `theme-toggle.js` - Dark/light theme
- `advanced-filters.js` - Advanced filtering
- `animations.js` - General animations & utilities

### Frontend HTML
- `dashboard.html` - User dashboard
- `events.html` - Events page
- `timeline.html` - Timeline page
- Updated: `index.html`, `artefacts.html`

---

## 🔧 HOW TO USE

### 1. **View Collections**
```
/ - Home page (see first 6 artefacts)
/artefacts - Full artefact browser with filters
/timeline - Historical timeline view
```

### 2. **Create Wishlist**
- Click heart icon (🤍) on any artefact card
- View wishlist in Dashboard (❤️)
- Remove items from wishlist

### 3. **Rate & Review**
- Click any artefact card
- Scroll to rating section
- Select stars and write review
- Submit rating

### 4. **Use Filters**
- Go to `/artefacts`
- Use quick filter buttons
- Open advanced filters
- Select multiple criteria
- Reset to clear filters

### 5. **Manage Profile**
- Login to access `/dashboard`
- View activity stats
- Manage wishlist
- View your ratings

### 6. **Browse Events**
- Visit `/events`
- Filter by category
- View event details
- Register for events

### 7. **Explore Timeline**
- Visit `/timeline`
- Filter by dynasty
- See artefacts by period
- Click to view details

### 8. **Toggle Theme**
- Click floating button (bottom-right)
- Or press `Ctrl+T` / `Cmd+T`
- Theme preference saved

---

## 🎨 ANIMATION HIGHLIGHTS

- **Fade In**: 0.8s ease-in on page load
- **Stagger**: Cards appear with 0.1s delay between each
- **Scale**: Cards scale from 0.9 to 1.0 on load
- **Glow**: Pulsing glow effect on elements
- **Float**: Subtle floating animation
- **Shimmer**: Loading skeleton shimmer effect
- **Ripple**: Button click ripple effect
- **Spin**: Loader spinner rotation

---

## 📊 DATABASE TABLES

New tables needed (run these SQL queries):

```sql
-- Wishlist Table
CREATE TABLE wishlist (
    wishlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    artefact_id INT NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (artefact_id) REFERENCES artefact(artefact_id)
);

-- Rating Table
CREATE TABLE rating (
    rating_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    artefact_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (artefact_id) REFERENCES artefact(artefact_id)
);

-- Event Table
CREATE TABLE event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    category VARCHAR(100),
    image_url VARCHAR(500),
    capacity INT,
    registered INT DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Artefact Timeline Table
CREATE TABLE artefact_timeline (
    timeline_id INT PRIMARY KEY AUTO_INCREMENT,
    artefact_id INT NOT NULL,
    period VARCHAR(100),
    start_year INT,
    end_year INT,
    historical_context TEXT,
    significance TEXT,
    FOREIGN KEY (artefact_id) REFERENCES artefact(artefact_id)
);
```

---

## 🚀 PERFORMANCE OPTIMIZATIONS

- Lazy loading for images
- Intersection Observer for scroll animations
- CSS animations instead of JavaScript
- Font loading optimized
- Image optimization recommended

---

## 🎯 KEYBOARD SHORTCUTS

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Focus search box |
| `Ctrl+T` | Toggle dark/light theme |
| `Escape` | Close open modal |

---

## 📱 RESPONSIVE DESIGN

- Mobile-first approach
- Breakpoints at 768px
- Touch-friendly buttons
- Optimized for all devices

---

## 🔒 SECURITY

- User authentication required for dashboard
- Admin-only endpoints for event management
- CSRF protection recommended
- Input validation on all forms

---

## 🎉 CONCLUSION

Your Krishna Museum project now has:
- ✅ 8+ Animation effects
- ✅ Wishlist system
- ✅ Rating & review system
- ✅ Advanced filters
- ✅ User dashboard
- ✅ Event management
- ✅ Historical timeline
- ✅ Dark/Light theme
- ✅ Smooth modern UI
- ✅ Full responsive design

Enjoy your enhanced museum experience! 🏛️✨
