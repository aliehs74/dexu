```markdown
# Cryptocurrency Dashboard (Next.js)

A high-performance cryptocurrency dashboard built with Next.js, featuring efficient data handling and visualization of large datasets.

## Technical Approach Explanation

### API Simulation
- Used **MSW** to create a realistic paginated API
- **Faker.js** for generating random cryptocurrency data
- Enables full-featured development without a real backend

### Data Fetching
- Implemented **RTK Query** for efficient data management:
  - Automatic caching
  - Request deduplication
  - Optimistic updates
  - Built-in loading states

### Performance Optimizations
- `useMemo` for expensive chart calculations
- Debounced timeframe changes
- Controlled concurrency (5 parallel page fetches)
- Server-side data processing with Redux selectors

### Data Processing
- Memoized selectors with `createSelector`
- Sorting and filtering in Redux slice
- Only processes top N cryptocurrencies for chart display

### Visualization
- **ECharts** for high-performance rendering
- Zooming and data filtering capabilities
- Responsive design with **Tailwind CSS**

## Challenges and Trade-offs

### Data Volume (5000 items)
- Server-side data processing
- Display only top performers
- Efficient selector implementations

### Performance vs. Completeness
- Default to top 50 cryptocurrencies
- User-adjustable up to 200 items
- Zoom functionality for detailed inspection

### Network Efficiency
- Controlled concurrency (5 parallel requests)
- RTK Query caching
- Debounced user interactions

### Mobile Responsiveness
- Tailwind's responsive utilities
- ECharts responsive configuration
- Touch-friendly controls





## Bonus Implementations
- Loading indicators for data fetching
- Comprehensive error handling with error boundaries
- ECharts zoom functionality
- Fully responsive, mobile-friendly interface
- Multiple layers of performance optimization:
- - Memoization
- - Debouncing
- - Efficient data processing

### Conclusion
This solution provides a robust, performant cryptocurrency dashboard that handles large datasets efficiently while maintaining a smooth user experience. The architecture is scalable and can easily be extended with additional features.




## 🚀 Quick Start

```bash
# 1. Clone repository
git clone 

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Technical Implementation

### Core Stack
- **Frontend**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit (RTK Query)
- **Data Visualization**: ECharts
- **Styling**: Tailwind CSS
- **Mock API**: MSW + Faker.js

### Key Features
| Feature | Implementation Details |
|---------|-----------------------|
| **Mocked API** | MSW handlers with pagination (50 items/page) |
| **Data Fetching** | RTK Query with caching & request deduplication |
| **Performance** | useMemo, debouncing, concurrent requests (5 max) |
| **Visualization** | ECharts with zoom/pan and mobile touch support |
| **Responsive** | Tailwind CSS breakpoints + ECharts responsive config |

## ⚡ Performance Optimizations

1. **Data Handling**
   - Server-side sorting/filtering via Redux selectors
   - Dynamic pagination (loads 5 pages concurrently)
   - Debounced user inputs (300ms delay)

2. **Visualization**
   - Virtual rendering for large datasets
   - Canvas-based rendering in ECharts
   - On-demand data processing

## 🧩 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Rendering 5000+ items | Virtual scrolling + display top 50-200 items |
| API latency | RTK Query caching + optimistic updates |
| Mobile performance | Reduced data points on small screens |
| Chart interactivity | Debounced zoom/pan handlers |

## 📜 Scripts

```bash
npm run dev     # Start development server
npm run build   # Create production build
```