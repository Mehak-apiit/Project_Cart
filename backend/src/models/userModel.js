import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  },

  mobile: String,
  dial_code: String,
  country_code: String,

  balance: { type: mongoose.Schema.Types.Decimal128, default: 0 },

  country_name: String,
  state: String,
  city: String,
  zip: String,
  address: String,

  total_review: { type: Number, default: 0 },
  avg_rating: { type: mongoose.Schema.Types.Decimal128, default: 0 },

  total_follower: { type: Number, default: 0 },
  total_following: { type: Number, default: 0 },

  status: { type: Number, default: 1 },

  ev: { type: Number, default: 0 },
  sv: { type: Number, default: 0 },
  kv: { type: Number, default: 0 },

  avatar: String,
  bio: String,

}, { timestamps: true });

export default mongoose.model("User", userSchema);