const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  location: { type: String },
  totalDonations: { type: Number, default: 0 },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  email: { type: String, required: true, unique: true },
  contactPerson: { type: String }, // اسم مسؤول الجهة
  phone: { type: String },
  registeredAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }, // الأدمن يوافق عليهم
  
});

module.exports = mongoose.model('Organization', organizationSchema);
