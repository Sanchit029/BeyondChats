const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'BeyondChats'
  },
  sourceUrl: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date
  },
  enhancedContent: {
    type: String,
    default: null
  },
  isEnhanced: {
    type: Boolean,
    default: false
  },
  references: [{
    title: String,
    url: String
  }]
}, {
  timestamps: true
});

// Auto-generate slug from title
articleSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);
