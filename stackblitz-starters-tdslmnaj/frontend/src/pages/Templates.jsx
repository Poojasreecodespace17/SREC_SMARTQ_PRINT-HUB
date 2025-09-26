import React, { useState } from 'react'

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Template categories
  const categories = ['All', 'Academic', 'Business', 'Creative', 'Forms']

  // Sample templates data
  const templates = [
    {
      id: 1,
      title: 'Assignment Cover Page',
      category: 'Academic',
      description: 'Professional cover page template for assignments and projects',
      image: 'https://via.placeholder.com/300x200?text=Assignment+Cover',
      downloadCount: 1250,
      rating: 4.8,
      isPremium: false
    },
    {
      id: 2,
      title: 'Event Poster',
      category: 'Creative',
      description: 'Eye-catching poster template for events and announcements',
      image: 'https://via.placeholder.com/300x200?text=Event+Poster',
      downloadCount: 890,
      rating: 4.6,
      isPremium: true
    },
    {
      id: 3,
      title: 'Business Letter Head',
      category: 'Business',
      description: 'Professional letterhead template for business correspondence',
      image: 'https://via.placeholder.com/300x200?text=Letter+Head',
      downloadCount: 567,
      rating: 4.7,
      isPremium: false
    },
    {
      id: 4,
      title: 'Lab Report Template',
      category: 'Academic',
      description: 'Structured template for scientific lab reports and experiments',
      image: 'https://via.placeholder.com/300x200?text=Lab+Report',
      downloadCount: 2100,
      rating: 4.9,
      isPremium: false
    },
    {
      id: 5,
      title: 'Resume Template',
      category: 'Business',
      description: 'Clean and professional resume template with modern design',
      image: 'https://via.placeholder.com/300x200?text=Resume+Template',
      downloadCount: 3200,
      rating: 4.8,
      isPremium: true
    },
    {
      id: 6,
      title: 'Certificate Template',
      category: 'Academic',
      description: 'Elegant certificate template for achievements and awards',
      image: 'https://via.placeholder.com/300x200?text=Certificate',
      downloadCount: 1780,
      rating: 4.5,
      isPremium: false
    },
    {
      id: 7,
      title: 'Invoice Template',
      category: 'Business',
      description: 'Professional invoice template for billing and payments',
      image: 'https://via.placeholder.com/300x200?text=Invoice+Template',
      downloadCount: 945,
      rating: 4.6,
      isPremium: false
    },
    {
      id: 8,
      title: 'Wedding Invitation',
      category: 'Creative',
      description: 'Beautiful wedding invitation template with elegant design',
      image: 'https://via.placeholder.com/300x200?text=Wedding+Invite',
      downloadCount: 1456,
      rating: 4.9,
      isPremium: true
    },
    {
      id: 9,
      title: 'Application Form',
      category: 'Forms',
      description: 'Standard application form template for various purposes',
      image: 'https://via.placeholder.com/300x200?text=Application+Form',
      downloadCount: 678,
      rating: 4.3,
      isPremium: false
    },
    {
      id: 10,
      title: 'Presentation Template',
      category: 'Academic',
      description: 'Modern PowerPoint template for academic presentations',
      image: 'https://via.placeholder.com/300x200?text=Presentation',
      downloadCount: 2890,
      rating: 4.7,
      isPremium: true
    },
    {
      id: 11,
      title: 'Brochure Template',
      category: 'Business',
      description: 'Tri-fold brochure template for marketing and promotions',
      image: 'https://via.placeholder.com/300x200?text=Brochure',
      downloadCount: 723,
      rating: 4.4,
      isPremium: false
    },
    {
      id: 12,
      title: 'ID Card Template',
      category: 'Forms',
      description: 'Professional ID card template for organizations',
      image: 'https://via.placeholder.com/300x200?text=ID+Card',
      downloadCount: 1123,
      rating: 4.6,
      isPremium: true
    }
  ]

  // Filter templates based on selected category
  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const handleTemplateClick = (template) => {
    console.log('Template clicked:', template.title)
    // Placeholder for future functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates to create stunning documents instantly
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Click any template to preview</span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {/* Template Image */}
              <div className="relative overflow-hidden">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      Premium
                    </span>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-gray-50">
                      Preview Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{template.downloadCount.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later for new templates.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact us to create a custom template tailored to your specific needs.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Request Custom Template
          </button>
        </div>
      </div>
    </div>
  )
}

export default Templates