import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const BUCKET_NAME = "ucc-private-documents";
export const BLOG_BUCKET_NAME = "ucc-blog-images";

/**
 * Creates and returns a Supabase client using server-side service role credentials.
 * This client bypasses RLS and must ONLY be executed on the server.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://fposjlmeweggrygqblid.supabase.co";

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY environment variable is missing on the server."
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Ensures that the public bucket `ucc-blog-images` exists on Supabase Storage.
 * Attempts to create it if missing or updates its status to public.
 */
export async function ensurePublicBlogBucket(): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient();
    const { data: bucket, error } = await supabase.storage.getBucket(BLOG_BUCKET_NAME);

    if (error || !bucket) {
      const { error: createError } = await supabase.storage.createBucket(BLOG_BUCKET_NAME, {
        public: true,
        fileSizeLimit: 5242880, // 5 MB
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"],
      });

      if (createError) {
        console.error("[SUPABASE STORAGE] Error creating public blog bucket:", createError.message);
        return false;
      }
    } else if (!bucket.public) {
      await supabase.storage.updateBucket(BLOG_BUCKET_NAME, { public: true });
    }
    return true;
  } catch (err) {
    console.error("[SUPABASE STORAGE] Public blog bucket check exception:", err);
    return false;
  }
}

/**
 * Uploads a blog image buffer to Supabase Public Storage bucket `ucc-blog-images`.
 * Returns the public object URL.
 */
export async function uploadBlogImageToSupabase({
  fileBuffer,
  fileExt,
  mimeType,
}: {
  fileBuffer: Buffer;
  fileExt: string;
  mimeType: string;
}): Promise<{ publicUrl: string | null; error: string | null }> {
  try {
    const supabase = getSupabaseServerClient();
    await ensurePublicBlogBucket();

    const uniqueId = crypto.randomUUID();
    const cleanExt = fileExt.startsWith(".") ? fileExt : `.${fileExt}`;
    const storagePath = `blog/${Date.now()}-${uniqueId}${cleanExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BLOG_BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("[SUPABASE STORAGE] Blog image upload failed:", uploadError.message);
      return { publicUrl: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(BLOG_BUCKET_NAME)
      .getPublicUrl(storagePath);

    return { publicUrl: publicUrlData.publicUrl, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error during blog image upload";
    console.error("[SUPABASE STORAGE] Exception during blog image upload:", err);
    return { publicUrl: null, error: message };
  }
}

/**
 * Ensures that the private bucket `ucc-private-documents` exists on Supabase Storage.
 * Attempts to create it if missing.
 */
export async function ensurePrivateBucket(): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient();
    const { data: bucket, error } = await supabase.storage.getBucket(BUCKET_NAME);

    if (error || !bucket) {
      const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 5242880, // 5 MB
        allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
      });

      if (createError) {
        console.error("[SUPABASE STORAGE] Error creating bucket:", createError.message);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error("[SUPABASE STORAGE] Bucket check exception:", err);
    return false;
  }
}

/**
 * Uploads a customer document buffer to Supabase Private Storage.
 * Returns the object storage path (e.g. orders/UCCPVC10001/uuid-filename.pdf).
 */
export async function uploadDocumentToSupabase({
  orderId,
  fileBuffer,
  fileExt,
  mimeType,
}: {
  orderId: string;
  fileBuffer: Buffer;
  fileExt: string;
  mimeType: string;
}): Promise<{ storagePath: string | null; error: string | null }> {
  try {
    const supabase = getSupabaseServerClient();
    const uniqueId = crypto.randomUUID();
    const cleanExt = fileExt.startsWith(".") ? fileExt : `.${fileExt}`;
    const storagePath = `orders/${orderId}/${uniqueId}${cleanExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("[SUPABASE STORAGE] Upload failed:", uploadError.message);
      return { storagePath: null, error: uploadError.message };
    }

    return { storagePath, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error during storage upload";
    console.error("[SUPABASE STORAGE] Exception during upload:", err);
    return { storagePath: null, error: message };
  }
}

/**
 * Downloads a file buffer from Supabase Private Storage.
 */
export async function downloadDocumentFromSupabase(
  storagePath: string
): Promise<{ data: ArrayBuffer | null; contentType: string | null; error: string | null }> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.storage.from(BUCKET_NAME).download(storagePath);

    if (error || !data) {
      return { data: null, contentType: null, error: error?.message || "File not found in storage." };
    }

    const arrayBuffer = await data.arrayBuffer();
    const contentType = data.type || getContentTypeFromPath(storagePath);

    return { data: arrayBuffer, contentType, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error reading storage object";
    return { data: null, contentType: null, error: message };
  }
}

/**
 * Deletes a file from Supabase Private Storage (used for cleanup on DB error).
 */
export async function removeDocumentFromSupabase(storagePath: string): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
  } catch (err) {
    console.error("[SUPABASE STORAGE] Cleanup removal failed:", err);
  }
}

function getContentTypeFromPath(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}
