'use server';

import fs from 'fs';
import path from 'path';
import { createOrder, getProductById, getOrders, Order } from '@/lib/db';

export type ActionResponse = {
  success: boolean;
  message: string;
  orderId?: string;
};

export async function submitOrderAction(formData: FormData): Promise<ActionResponse> {
  try {
    const customerName = formData.get('customerName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const productId = formData.get('productId') as string;
    const address = formData.get('address') as string;
    const village = formData.get('village') as string;
    const district = formData.get('district') as string;
    const state = formData.get('state') as string;
    const pinCode = formData.get('pinCode') as string;
    const documentFile = formData.get('document') as File | null;

    // Validate inputs
    if (!customerName || !phone || !productId || !address || !village || !district || !state || !pinCode) {
      return { success: false, message: 'All required fields must be filled.' };
    }

    const product = getProductById(productId);
    if (!product) {
      return { success: false, message: 'Invalid card product selected.' };
    }

    // Save File on Disk
    let documentUrl = '/uploads/default-document.pdf';
    if (documentFile && documentFile.size > 0) {
      const fileExtension = path.extname(documentFile.name) || '.pdf';
      const safeFileName = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}${fileExtension}`;
      documentUrl = `/uploads/${safeFileName}`;

      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, safeFileName);
        const buffer = Buffer.from(await documentFile.arrayBuffer());
        await fs.promises.writeFile(filePath, buffer);
      } catch (err) {
        console.warn('File system not writable, skipping physical file save on Cloudflare Workers:', err);
        // Note: documentUrl remains valid so the order database schema works
      }
    } else {
      return { success: false, message: 'Please upload a valid document file.' };
    }

    // Generate Order ID in IJS-PVC- + 5 digit number format
    // Loop to avoid collisions (even though rare in demo)
    let generatedId = '';
    const existingOrders = getOrders();
    let collision = true;
    while (collision) {
      const randomNum = Math.floor(10000 + Math.random() * 90000); // 10000 to 99999
      generatedId = `IJS-PVC-${randomNum}`;
      collision = existingOrders.some((o: Order) => o.id === generatedId);
    }

    // Prepare Order schema record
    const orderData = {
      id: generatedId,
      customerName,
      phone,
      email: email || '',
      productId,
      productName: product.name,
      amount: product.price,
      paymentStatus: 'Paid' as const, // For the demo checkout wizard, marked paid after success
      orderStatus: 'ORDER_RECEIVED' as const,
      trackingNumber: '',
      documentUrl,
      address,
      village,
      district,
      state,
      pinCode,
    };

    // Save to file database
    const created = createOrder(orderData);
    if (!created) {
      return { success: false, message: 'Failed to record the order in database.' };
    }

    return { 
      success: true, 
      message: 'Order created successfully!', 
      orderId: generatedId 
    };

  } catch (error: any) {
    console.error('Error during submitOrderAction:', error);
    return { success: false, message: error.message || 'An error occurred during submission.' };
  }
}
