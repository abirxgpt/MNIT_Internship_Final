import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  sName: { type: String, required: true },
  sDegree: { type: String, enum: ['PhD', 'PG', 'UG'], required: true, },
  sStatus: { type: String, enum: ["Ongoing", "Completed"], required: true, },
  sTitle: { type: String, required: true, },
  sInstitute: { type: String, required: false, },
  sYearFrom: { type: Number, required: true },
  sYearTo: { type: Number },
});
studentSchema.index({ sName: 1, sTitle: 1 }, { unique: true });
export default mongoose.model("Student", studentSchema);
