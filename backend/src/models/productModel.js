import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },

    assigned_to: {
      type: Number,
      default: null,
    },

    category_id: {
      type: Number,
      required: true,
    },

    subcategory_id: {
      type: Number,
      required: false,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    approved_by: {
      type: Number,
      default: null,
    },

    demo_url: {
      type: String,
      default: "",
    },

    attribute_info: {
      type: String,
      required: true,
    },

    preview_image: {
      type: String,
      default: "",
    },

    inline_preview_image: {
      type: String,
      default: "",
    },

    total_download: {
      type: Number,
      default: 0,
    },

    total_review: {
      type: Number,
      default: 0,
    },

    avg_rating: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },

    description: {
      type: String,
      default: "",
    },

    changelog: {
      type: String,
      default: "",
    },

    is_free: {
      type: Number,
      default: 0, // 0 = paid, 1 = free
    },

    comment_disable: {
      type: Number,
      default: 0,
    },

    is_featured: {
      type: Number,
      default: 0,
    },

    tags: {
      type: String,
      default: "",
    },

    status: {
      type: Number,
      default: 1, // 1 = active, 0 = inactive
    },

    file: {
      type: String,
      default: "",
    },

    temp_file: {
      type: String,
      default: "",
    },

    product_updated: {
      type: Number,
      default: 0,
    },

    published_at: {
      type: Date,
      default: Date.now,
    },

    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;