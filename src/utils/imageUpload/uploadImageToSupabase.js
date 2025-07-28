import imageCompression from "browser-image-compression";
import { supabase } from "../../api/supabaseClient"; // Fixed path

// Configuration
const SUPABASE_BUCKET_NAME = "harukcal"; // Your actual bucket name from Supabase dashboard

// Format date like YYMMDDHHMM (2-digit year, month, day, hour, minute)
const getTimestampPrefix = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Get last 2 digits
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}`;
};

// Create thumbnail from original image
const createThumbnail = async (file, maxWidth = 150, maxHeight = 150) => {
  const options = {
    maxSizeMB: 0.05, // 50KB max for thumbnails
    maxWidthOrHeight: Math.min(maxWidth, maxHeight),
    useWebWorker: true,
    fileType: "image/jpeg", // Convert to JPEG for smaller size
  };

  return await imageCompression(file, options);
};

// Create optimized main image
const createOptimizedImage = async (file, maxWidth = 800, maxHeight = 800) => {
  const options = {
    maxSizeMB: 0.1, // 100KB max for main images
    maxWidthOrHeight: Math.min(maxWidth, maxHeight),
    useWebWorker: true,
    fileType: "image/jpeg", // Convert to JPEG for smaller size
  };

  return await imageCompression(file, options);
};

// Generate filename with YYMMDDHHMM + original filename
const generateFileName = (originalFileName) => {
  const timestamp = getTimestampPrefix();
  const extension = originalFileName.split(".").pop().toLowerCase();
  const nameWithoutExt = originalFileName.replace(/\.[^/.]+$/, "");

  // Clean the original filename (remove special characters, limit length)
  const cleanName = nameWithoutExt
    .replace(/[^a-zA-Z0-9가-힣]/g, "_") // Replace special chars with underscore
    .substring(0, 20); // Limit to 20 characters

  return `${timestamp}_${cleanName}.${extension}`;
};

export async function compressAndUploadImage(
  file,
  folder = "meal",
  createThumbnailFlag = true
) {
  if (!file || !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
    throw new Error("Only PNG or JPG files are supported.");
  }

  try {
    console.log("🖼️ Starting image optimization...");
    console.log("📁 Original file size:", (file.size / 1024).toFixed(2), "KB");

    // Generate optimized filename
    const optimizedFileName = generateFileName(file.name);
    console.log("📝 Generated filename:", optimizedFileName);

    // Create optimized main image
    const optimizedImage = await createOptimizedImage(file);
    console.log(
      "📦 Optimized image size:",
      (optimizedImage.size / 1024).toFixed(2),
      "KB"
    );

    // Upload main image to meal folder
    const mainImagePath = `${folder}/${optimizedFileName}`;
    const { data: mainData, error: mainError } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .upload(mainImagePath, optimizedImage, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });

    if (mainError) throw mainError;

    // Get main image URL
    const { data: mainImageURL } = supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .getPublicUrl(mainImagePath);

    let thumbnailURL = null;

    // Create and upload thumbnail if requested
    if (createThumbnailFlag) {
      console.log("🖼️ Creating thumbnail...");
      const thumbnail = await createThumbnail(file);
      console.log(
        "📦 Thumbnail size:",
        (thumbnail.size / 1024).toFixed(2),
        "KB"
      );

      const thumbnailPath = `${folder}/thumbnails/${optimizedFileName}`;
      const { data: thumbData, error: thumbError } = await supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .upload(thumbnailPath, thumbnail, {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/jpeg",
        });

      if (thumbError) throw thumbError;

      const { data: thumbURL } = supabase.storage
        .from(SUPABASE_BUCKET_NAME)
        .getPublicUrl(thumbnailPath);

      thumbnailURL = thumbURL.publicUrl;
    }

    console.log("✅ Image upload completed successfully");
    console.log(
      "📊 Compression ratio:",
      ((1 - optimizedImage.size / file.size) * 100).toFixed(1) + "%"
    );

    return {
      mainImageUrl: mainImageURL.publicUrl,
      thumbnailUrl: thumbnailURL,
      fileName: optimizedFileName,
      originalSize: file.size,
      optimizedSize: optimizedImage.size,
    };
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    throw err;
  }
}

// Upload profile image with specific optimizations
export async function uploadProfileImage(file) {
  if (!file || !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
    throw new Error("Only PNG or JPG files are supported.");
  }

  try {
    console.log("👤 Starting profile image optimization...");
    console.log("📁 Original file size:", (file.size / 1024).toFixed(2), "KB");

    // Generate optimized filename
    const optimizedFileName = generateFileName(file.name);
    console.log("📝 Generated filename:", optimizedFileName);

    // Create optimized profile image (smaller for profile pics)
    const optimizedImage = await createOptimizedImage(file, 400, 400);
    console.log(
      "📦 Optimized profile image size:",
      (optimizedImage.size / 1024).toFixed(2),
      "KB"
    );

    // Upload profile image to member folder
    const profileImagePath = `member/${optimizedFileName}`;
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .upload(profileImagePath, optimizedImage, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });

    if (error) throw error;

    const { data: publicURL } = supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .getPublicUrl(profileImagePath);

    console.log("✅ Profile image upload completed successfully");
    console.log(
      "📊 Compression ratio:",
      ((1 - optimizedImage.size / file.size) * 100).toFixed(1) + "%"
    );

    return {
      imageUrl: publicURL.publicUrl,
      fileName: optimizedFileName,
      originalSize: file.size,
      optimizedSize: optimizedImage.size,
    };
  } catch (err) {
    console.error("❌ Profile image upload failed:", err);
    throw err;
  }
}

// Utility function to get thumbnail URL from main image URL
export const getThumbnailUrl = (mainImageUrl) => {
  if (!mainImageUrl) return null;

  // For meal images: replace 'meal' with 'meal/thumbnails'
  if (mainImageUrl.includes("/meal/")) {
    return mainImageUrl.replace("/meal/", "/meal/thumbnails/");
  }

  // For member images: replace 'member' with 'member/thumbnails'
  if (mainImageUrl.includes("/member/")) {
    return mainImageUrl.replace("/member/", "/member/thumbnails/");
  }

  return mainImageUrl;
};

// Utility function to get main image URL from thumbnail URL
export const getMainImageUrl = (thumbnailUrl) => {
  if (!thumbnailUrl) return null;

  // For meal thumbnails: replace 'meal/thumbnails' with 'meal'
  if (thumbnailUrl.includes("/meal/thumbnails/")) {
    return thumbnailUrl.replace("/meal/thumbnails/", "/meal/");
  }

  // For member thumbnails: replace 'member/thumbnails' with 'member'
  if (thumbnailUrl.includes("/member/thumbnails/")) {
    return thumbnailUrl.replace("/member/thumbnails/", "/member/");
  }

  return thumbnailUrl;
};
