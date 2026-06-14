import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    author_commission: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0
    },

    image: {
      type: String,
      required: true
    },

    image_2: {
      type: String
    },

    image_3: {
      type: String
    },

    featured: {
      type: Number,
      default: 0   // 0 = not featured, 1 = featured
    },

    seo_content: {
      type: String
    },

    status: {
      type: Number,
      default: 1   // 1 = active, 0 = inactive
    }
  },
  {
    timestamps: true   // automatically adds createdAt & updatedAt
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;