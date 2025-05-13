const mongoose = require('mongoose');

// const volunteerSchema = new mongoose.Schema({
//   volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   task: { type: String, required: true },
//   experience: { type: String },
//   issueAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
//   projectAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ✅ الجديد
//   status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
//   notes: { type: String },
//   appliedAt: { type: Date, default: Date.now },
// }, { timestamps: true });
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  experience: { type: String },
  projectAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ✅ اختياري
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  notes: { type: String },
  adminResponse: { type: String }, // ✅ رد الأدمن البسيط
  messages: [ // ✅ سجل المحادثة المتكامل
    {
      sender: { type: String, enum: ['admin', 'volunteer'], required: true },
      message: { type: String, required: true },
      sentAt: { type: Date, default: Date.now },
    }
  ],
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
