const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  donatedAt: { type: Date, default: Date.now },

  // ✅ تبرع عام بدون مشروع أو جهة
  isGeneral: { type: Boolean, default: false },

  // ✅ تبرع لمشروع محدد
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },

  // ✅ تبرع لجهة محددة
  // organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
});

module.exports = mongoose.model('Donation', donationSchema);
