const volunteerSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true }, // إضافة
    email: { type: String, required: true }, // إضافة
    phone: { type: String }, // إضافة
    age: { type: Number }, // إضافة
    job: { type: String }, // إضافة
    task: { type: String, required: true },
    experience: { type: String },
    interests: { type: String }, // إضافة
    availability: { type: String }, // إضافة
    projectAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    notes: { type: String },
    adminResponse: { type: String },
    messages: [
      {
        sender: { type: String, enum: ["admin", "volunteer"], required: true },
        message: { type: String, required: true },
        sentAt: { type: Date, default: Date.now },
      },
    ],
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
