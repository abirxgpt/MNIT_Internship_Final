import mongoose from 'mongoose';

const phdSchema = new mongoose.Schema({
  researchTopicTitle: { type: String, required: true, },
  scholarId: { type: String, required: true, },
  scholarName: { type: String, required: true, },
  phdStatus: { type: String, enum: ['Completed', 'Ongoing'], required: true, },
  year: { type: Number, required: true, },
  coSupervisor: { type: String, },
  currentDesignation: { type: String, },
  organization: { type: String, },
  currentEmail: { type: String, },
  currentMobile: { type: String, }
});

const PhD = mongoose.model('PhD', phdSchema);

export default PhD;
