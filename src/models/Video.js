import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  hashtags: [{ type: String, trim: true }],
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
